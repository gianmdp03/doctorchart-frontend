export function cropSquare(width: number, height: number, zoom: number, x: number, y: number) {
  const size = Math.min(width, height) / zoom;
  return { size, x: ((width - size) * x) / 100, y: ((height - size) * y) / 100 };
}
