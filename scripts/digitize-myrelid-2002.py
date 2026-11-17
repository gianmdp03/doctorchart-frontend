"""Digitize the seven visible SD traces on each of the six INAN Myrelid charts."""

from bisect import bisect_right
from collections import defaultdict
from hashlib import sha256
from math import floor
import json
from pathlib import Path
import sys

import pymupdf

SOURCE_SHA256 = "31cad974af4daf9a5625f38e128b05931865b3d91f9feae6b7c740290b4534dc"
OUTPUT = (
    Path(__file__).resolve().parents[1]
    / "src/app/features/patient-record/patient-growth/myrelid-2002.json"
)
# Order: frame, -3/0/+3 DE continuous strokes, yellow and green bands, age range.
PAGES = [
    (3, 352, 353, 354, 5, 6, 0, 36),
    (1, 678, 680, 679, 3, 2, 36, 216),
    (3, 364, 533, 365, 47, 48, 0, 36),
    (3, 839, 126, 832, 4, 5, 36, 216),
    (1, 114, 113, 719, 3, 2, 0, 216),
    (1, 755, 528, 529, 22, 23, 0, 216),
]


def interpolate(x, left, right):
    a, u = left
    b, v = right
    return u + (v - u) * (x - a) / (b - a)


def lookup(nodes, x):
    index = bisect_right(nodes, x, key=lambda node: node[0])
    index = min(max(index, 1), len(nodes) - 1)
    return interpolate(x, nodes[index - 1], nodes[index])


def flatten(item):
    kind, *points = item
    if kind == "l":
        return points
    assert kind == "c"
    a, b, c, d = points
    # Dense geometric sampling of the vector, well below the source stroke width.
    count = max(4, int((abs(b-a) + abs(c-b) + abs(d-c)) * 8))
    return [
        a*(1-t)**3 + b*(3*t*(1-t)**2) + c*(3*t*t*(1-t)) + d*t**3
        for t in (k / count for k in range(count + 1))
    ]


def trace(path_items):
    vertices = [point for item in path_items for point in flatten(item)]
    if vertices[0].x > vertices[-1].x:
        vertices.reverse()
    result = []
    for point in vertices:
        if not result or point.x > result[-1][0] + 1e-6:
            result.append((point.x, point.y))
        else:
            assert point.x >= result[-1][0] - 0.03, (point, result[-1])
    return result


def grid(drawings, frame, start, end, max_y, step_y):
    # The first column contains one rectangle for each horizontal grid interval.
    cells = [
        q["rect"] for q in drawings.values()
        if q["type"] == "s" and q["items"][0][0] == "re"
        and abs(q["rect"].x0 - frame.x0) < 0.01
        and 3 < q["rect"].height < 35
        and frame.y0 - 0.01 <= q["rect"].y0 <= frame.y1
    ]
    rows = sorted({round(cell.y0, 4) for cell in cells})
    assert len(rows) == ({120: 18, 180: 22, 40: 32}[max_y])
    rows.append(max(cell.y1 for cell in cells))
    y = [(position, max_y - i * step_y) for i, position in enumerate(rows)]
    if max_y == 40:
        # The last cell is cropped; the printed major ticks are 10 through 40.
        y.pop()
    columns = sorted({
        round(q["rect"].x0, 3) for q in drawings.values()
        if q["type"] == "s" and q["items"][0][0] == "re"
        and abs(q["rect"].y0 - frame.y0) < 0.01
        and frame.x0 - .001 <= q["rect"].x0 < frame.x1
        and 3 < q["rect"].width < 45 and 3 < q["rect"].height < 35
    })
    columns[0] = frame.x0
    columns.append(frame.x1)
    if end == 36:
        # The right half groups six months per grid rectangle.
        assert len(columns) == 22
        months = [*range(19), 24, 30, 36]
    else:
        period = 12 if max_y == 40 else 6
        months = list(range(start, end + 1, period))
        assert len(columns) == len(months)
    return list(zip(months, columns)), y


def right_labels(page, frame):
    labels = {}
    for word in page.get_text("words"):
        x0, y0, _, y1, label, *_ = word
        if frame.x1 < x0 < frame.x1 + 16 and (label == "0" or label.endswith("DE")):
            labels[int(label.removesuffix("DE"))] = (y0 + y1) / 2
    assert set(labels) == set(range(-3, 4)), labels
    return labels


def band_edges(drawing):
    segments = defaultdict(list)
    for item in drawing["items"]:
        vertices = flatten(item)
        for a, b in zip(vertices, vertices[1:]):
            left, right = sorted(((a.x, a.y), (b.x, b.y)))
            if right[0] - left[0] < 1e-6:
                continue
            for column in range(floor(left[0]), floor(right[0]) + 1):
                segments[column].append((left, right))

    def crossings(x):
        return [
            interpolate(x, left, right) for left, right in segments[floor(x)]
            if left[0] <= x <= right[0]
        ]
    return crossings


def plus_two_trace(drawings, frame, label, plus_one, plus_three):
    # +2 DE is stored as individual pen strokes and has no continuous band edge.
    dashes = []
    for q in drawings.values():
        if (
            abs((q.get("width") or 0) - 1) > 0.02
            or len(q["items"]) != 1
            or q["items"][0][0] not in ("l", "c")
        ):
            continue
        vertices = flatten(q["items"][0])
        if vertices[0].x > vertices[-1].x:
            vertices.reverse()
        start, end = vertices[0], vertices[-1]
        x, y = (start + end) / 2
        if (
            frame.x0 - 1.2 <= start.x < end.x <= frame.x1 + 1.2
            and frame.x0 <= x <= frame.x1
            and lookup(plus_three, x) + 3 < y < plus_one(x) - 3
        ):
            dashes.append(vertices)

    tails = [
        dash for dash in dashes
        if dash[-1].x >= frame.x1 - 8 and abs(dash[-1].y - label) < 4
    ]
    chain = [max(tails, key=lambda dash: dash[-1].x)]
    while True:
        left = chain[-1][0]
        candidates = [
            dash for dash in dashes
            if dash[-1].x <= left.x + 0.08 and dash[0].x < left.x - 0.08
            and abs(dash[-1] - left) <= 6.5
        ]
        if not candidates:
            break
        chain.append(min(candidates, key=lambda dash: abs(dash[-1] - left)))
    assert chain[-1][0].x < frame.x0 + 8
    return [(p.x, p.y) for dash in reversed(chain) for p in dash]


def digitize(page, index, spec):
    frame_id, minus_three, middle, plus_three, yellow_id, green_id, start, end = spec
    drawings = {q["seqno"]: q for q in page.get_drawings()}
    frame = drawings[frame_id]["rect"]
    max_y, step_y = (40, 1) if index >= 5 else (120 if start == 0 else 180, 5)
    age_map, y_map = grid(drawings, frame, start, end, max_y, step_y)
    labels = right_labels(page, frame)
    yellow = band_edges(drawings[yellow_id])
    green = band_edges(drawings[green_id])

    def band_reference(score, x):
        # Sample just inside the frame to avoid counting the polygon closing edge.
        x = min(max(x, frame.x0 + 0.002), frame.x1 - 0.002)
        if score == -2:
            return max(yellow(x))
        if score == -1:
            return max(green(x))
        if index == 6 and x < 132.7105:
            # The green polygon closes diagonally at birth. Use the actual +1 DE dash.
            return lookup(female_bmi_first_dash, x)
        return min(green(x))

    female_bmi_first_dash = trace(drawings[635]["items"]) if index == 6 else None
    paths = {
        score: trace(drawings[seq]["items"])
        for score, seq in [(-3, minus_three), (0, middle), (3, plus_three)]
    }
    paths[2] = plus_two_trace(
        drawings, frame, labels[2], lambda x: band_reference(1, x), paths[3]
    )
    for score, nodes in paths.items():
        assert abs(nodes[-1][1] - labels[score]) < 4, (index, score, nodes[-1], labels)
        assert all(a[0] <= b[0] for a, b in zip(nodes, nodes[1:])), (index, score)
    for score in (-2, -1, 1):
        y = band_reference(score, frame.x1)
        assert abs(y - labels[score]) < 4, (index, score, y, labels)

    def reference_at(age, score):
        position = lookup(age_map, age)
        if score in paths:
            points = paths[score]
            # A difference under 0.002 pt is PDF coordinate rounding at the frame.
            if not points[0][0] - 0.002 <= position <= points[-1][0] + 0.002:
                return None
            y = lookup(points, min(max(position, points[0][0]), points[-1][0]))
        else:
            y = band_reference(score, position)
        assert frame.y0 <= y <= frame.y1, (index, age, score, y)
        return lookup(y_map, y)

    # Include each visible start/end in addition to the regular samples. Use finer
    # sampling in infancy where the curves change fastest.
    inverse_age_map = [(pos, age) for age, pos in age_map]
    ages = {quarter / 4 for quarter in range(start * 4, min(end, 36) * 4 + 1)}
    ages.update(range(max(start, 36), end + 1))
    for nodes in paths.values():
        first = lookup(inverse_age_map, nodes[0][0])
        last = lookup(inverse_age_map, nodes[-1][0])
        if start < first < end:
            ages.add(first)
        if start < last < end:
            ages.add(last)
    rows = []
    for age in sorted(ages):
        values = [reference_at(age, score) for score in range(-3, 4)]
        present = [value for value in values if value is not None]
        assert all(a < b for a, b in zip(present, present[1:])), (index, age, values)
        assert present, (index, age)
        rows.append({"x": round(age, 5), "values": [round(v, 1) if v is not None else v for v in values]})

    # Check interpolation in the shipped series between sampled ages.
    error = 0
    for left, right in zip(rows, rows[1:]):
        for i, (a, b) in enumerate(zip(left["values"], right["values"])):
            if a is None or b is None:
                continue
            for fraction in (0.25, 0.5, 0.75):
                age = left["x"] + (right["x"] - left["x"]) * fraction
                expected = reference_at(age, i - 3)
                assert expected is not None
                error = max(error, abs(a + (b - a) * fraction - expected))
    assert error <= (0.16 if max_y == 40 else 0.21), (index, error)
    print(f"Page {index}: {len(rows)} rows, max sampled interpolation error {error:.3f}")
    for i in range(7):
        ages_with_data = [row["x"] for row in rows if row["values"][i] is not None]
        print(f"  {i-3:+d} DE: {ages_with_data[0]:.5f}–{ages_with_data[-1]:.5f} months")
    return rows


def main():
    source = Path(sys.argv[1]).read_bytes()
    if sha256(source).hexdigest() != SOURCE_SHA256:
        raise SystemExit("This script requires the verified six-page INAN PDF.")
    with pymupdf.open(stream=source, filetype="pdf") as pdf:
        assert len(pdf) == len(PAGES)
        series = [digitize(pdf[i], i + 1, spec) for i, spec in enumerate(PAGES)]
    lines = ["["]
    for i, rows in enumerate(series):
        lines.append("  [")
        lines.extend(
            "    " + json.dumps(row, separators=(", ", ": ")) + ("," if j < len(rows)-1 else "")
            for j, row in enumerate(rows)
        )
        lines.append("  ]" + ("," if i < len(series)-1 else ""))
    lines.append("]")
    OUTPUT.write_text("\n".join(lines) + "\n", encoding="utf-8")


if __name__ == "__main__":
    main()
