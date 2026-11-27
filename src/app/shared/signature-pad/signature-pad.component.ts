import {
  AfterViewInit,
  Component,
  ElementRef,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';

interface StrokePoint {
  x: number;
  y: number;
}

interface Stroke {
  color: string;
  width: number;
  points: StrokePoint[];
}

@Component({
  selector: 'app-signature-pad',
  templateUrl: './signature-pad.component.html',
  styleUrl: './signature-pad.component.css',
})
export class SignaturePadComponent implements AfterViewInit {
  readonly height = input(180);
  readonly dirtyChange = output<boolean>();

  readonly canvasRef = viewChild<ElementRef<HTMLCanvasElement>>('padCanvas');
  readonly penColor = signal<string>('#111827');
  readonly hasInk = signal(false);

  readonly penColors = [
    { label: 'Negro', value: '#111827' },
    { label: 'Azul tinta', value: '#1d3557' },
  ];

  private strokes: Stroke[] = [];
  private activeStroke: Stroke | null = null;
  private activePointerId: number | null = null;
  private cssWidth = 520;
  private cssHeight = 180;
  private dpr = 2;

  ngAfterViewInit(): void {
    this.setupCanvas();
  }

  private setupCanvas(): void {
    const canvas = this.canvasRef()?.nativeElement;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    this.cssWidth = Math.max(260, Math.round(rect.width || 520));
    this.cssHeight = this.height();
    this.dpr = typeof window !== 'undefined' ? Math.min(3, Math.max(2, window.devicePixelRatio || 2)) : 2;
    canvas.width = Math.round(this.cssWidth * this.dpr);
    canvas.height = Math.round(this.cssHeight * this.dpr);
    this.redraw();
  }

  onPointerDown(event: PointerEvent): void {
    if (event.button !== 0 && event.pointerType === 'mouse') return;
    const canvas = this.canvasRef()?.nativeElement;
    if (!canvas) return;
    event.preventDefault();
    try {
      canvas.setPointerCapture(event.pointerId);
    } catch {}
    this.activePointerId = event.pointerId;
    const point = this.pointFromEvent(event, canvas);
    this.activeStroke = {
      color: this.penColor(),
      width: 2.4,
      points: [point],
    };
    this.strokes.push(this.activeStroke);
    this.updateInkState();
    this.redraw();
  }

  onPointerMove(event: PointerEvent): void {
    if (!this.activeStroke || event.pointerId !== this.activePointerId) return;
    const canvas = this.canvasRef()?.nativeElement;
    if (!canvas) return;
    event.preventDefault();
    const point = this.pointFromEvent(event, canvas);
    const last = this.activeStroke.points[this.activeStroke.points.length - 1];
    if (last && Math.hypot(point.x - last.x, point.y - last.y) < 1.2) return;
    this.activeStroke.points.push(point);
    this.redraw();
  }

  onPointerUp(event: PointerEvent): void {
    if (event.pointerId !== this.activePointerId) return;
    const canvas = this.canvasRef()?.nativeElement;
    if (canvas) {
      try {
        if (canvas.hasPointerCapture(event.pointerId)) {
          canvas.releasePointerCapture(event.pointerId);
        }
      } catch {}
    }
    this.activeStroke = null;
    this.activePointerId = null;
  }

  setPenColor(color: string): void {
    this.penColor.set(color);
  }

  undo(): void {
    if (this.strokes.length === 0) return;
    this.strokes.pop();
    this.updateInkState();
    this.redraw();
  }

  clear(): void {
    this.strokes = [];
    this.activeStroke = null;
    this.activePointerId = null;
    this.updateInkState();
    this.redraw();
  }

  exportTrimmedPng(): string | null {
    const canvas = this.canvasRef()?.nativeElement;
    if (!canvas || this.strokes.length === 0) return null;

    const w = canvas.width;
    const h = canvas.height;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return null;

    const img = ctx.getImageData(0, 0, w, h);
    const data = img.data;
    let minX = w;
    let minY = h;
    let maxX = -1;
    let maxY = -1;

    for (let y = 0; y < h; y++) {
      const rowOffset = y * w * 4;
      for (let x = 0; x < w; x++) {
        if (data[rowOffset + x * 4 + 3] > 16) {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }

    if (maxX < minX || maxY < minY) return null;

    const pad = Math.round(12 * this.dpr);
    const sx = Math.max(0, minX - pad);
    const sy = Math.max(0, minY - pad);
    const sw = Math.min(w - sx, maxX - minX + 1 + pad * 2);
    const sh = Math.min(h - sy, maxY - minY + 1 + pad * 2);

    const maxOutW = 1000;
    const maxOutH = 400;
    const scale = Math.min(1, maxOutW / sw, maxOutH / sh);
    const outW = Math.max(1, Math.round(sw * scale));
    const outH = Math.max(1, Math.round(sh * scale));

    const offscreen = document.createElement('canvas');
    offscreen.width = outW;
    offscreen.height = outH;
    const outCtx = offscreen.getContext('2d');
    if (!outCtx) return null;
    outCtx.drawImage(canvas, sx, sy, sw, sh, 0, 0, outW, outH);
    return offscreen.toDataURL('image/png');
  }

  private pointFromEvent(event: PointerEvent, canvas: HTMLCanvasElement): StrokePoint {
    const rect = canvas.getBoundingClientRect();
    const scaleX = rect.width > 0 ? this.cssWidth / rect.width : 1;
    const scaleY = rect.height > 0 ? this.cssHeight / rect.height : 1;
    return {
      x: (event.clientX - rect.left) * scaleX,
      y: (event.clientY - rect.top) * scaleY,
    };
  }

  private updateInkState(): void {
    const has = this.strokes.length > 0;
    this.hasInk.set(has);
    this.dirtyChange.emit(has);
  }

  private redraw(): void {
    const canvas = this.canvasRef()?.nativeElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.scale(this.dpr, this.dpr);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    for (const stroke of this.strokes) {
      if (stroke.points.length === 0) continue;
      ctx.strokeStyle = stroke.color;
      ctx.fillStyle = stroke.color;
      ctx.lineWidth = stroke.width;

      if (stroke.points.length === 1) {
        const p = stroke.points[0];
        ctx.beginPath();
        ctx.arc(p.x, p.y, stroke.width / 2, 0, Math.PI * 2);
        ctx.fill();
        continue;
      }

      ctx.beginPath();
      ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
      for (let i = 1; i < stroke.points.length - 1; i++) {
        const midX = (stroke.points[i].x + stroke.points[i + 1].x) / 2;
        const midY = (stroke.points[i].y + stroke.points[i + 1].y) / 2;
        ctx.quadraticCurveTo(stroke.points[i].x, stroke.points[i].y, midX, midY);
      }
      const last = stroke.points[stroke.points.length - 1];
      ctx.lineTo(last.x, last.y);
      ctx.stroke();
    }
    ctx.restore();
  }
}
