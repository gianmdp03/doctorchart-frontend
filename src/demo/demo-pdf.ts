import { ClinicalPrintDocument } from '../app/core/models/clinical-print-document.model';

function winAnsi(text: string): string {
  return text
    .replaceAll('\\', '\\\\')
    .replaceAll('(', '\\(')
    .replaceAll(')', '\\)')
    .replace(/[^\x20-\xFF]/g, '?');
}

function wrapLines(text: string, maxChars = 84): string[] {
  const out: string[] = [];
  for (const rawLine of text.split(/\r?\n/)) {
    const words = rawLine.trim().split(/\s+/).filter(Boolean);
    if (!words.length) {
      out.push('');
      continue;
    }
    let current = '';
    for (const word of words) {
      if (current.length + word.length + 1 <= maxChars) {
        current = current ? `${current} ${word}` : word;
      } else {
        if (current) out.push(current);
        current = word.length > maxChars ? word.slice(0, maxChars - 1) + '-' : word;
      }
    }
    if (current) out.push(current);
  }
  return out;
}

export interface DemoPdfSignature {
  name: string;
  stampText?: string;
}

export interface DemoPdfOptions {
  license?: string;
  hasLogo?: boolean;
}

export function generateDemoPdfBlob(
  doc: ClinicalPrintDocument,
  signature?: DemoPdfSignature | null,
  options?: DemoPdfOptions,
): Blob {
  const lines: Array<{ text: string; bold?: boolean; size?: number; gap?: number }> = [];
  lines.push({
    text: options?.hasLogo ? 'DEMOCHART [LOGO CONSULTORIO] — DOCUMENTO DE DEMOSTRACIÓN' : 'DEMOCHART — DOCUMENTO DE DEMOSTRACIÓN',
    bold: true,
    size: 13,
    gap: 18,
  });
  lines.push({ text: 'Sin validez clínica ni legal. Uso exclusivo para demostración.', size: 9, gap: 18 });
  lines.push({ text: '--------------------------------------------------------------------------------', size: 10, gap: 14 });
  lines.push({
    text: doc.type === 'STUDY_ORDERS' ? 'ORDEN DE ESTUDIOS COMPLEMENTARIOS' : 'RECETA MÉDICA (DEMO)',
    bold: true,
    size: 14,
    gap: 20,
  });
  lines.push({ text: `Código: ${doc.code}   |   Fecha: ${doc.issuedAt.slice(0, 10).split('-').reverse().join('/')}`, size: 10, gap: 14 });
  const licenseSuffix = options?.license?.trim() ? ` · ${options.license.trim()}` : '';
  lines.push({ text: `Profesional: Dra. Valentina Gómez${licenseSuffix} (${doc.author.specialtyName || 'Clínica'})`, size: 10, gap: 18 });

  lines.push({ text: 'DATOS DEL PACIENTE', bold: true, size: 11, gap: 14 });
  lines.push({ text: `Nombre y apellido: ${doc.patient.fullName}`, size: 10, gap: 13 });
  lines.push({
    text: `DNI: ${doc.patient.nationalId || 'No registrado'}   |   F. Nac.: ${doc.patient.birthDate.split('-').reverse().join('/')}${doc.patient.ageAtIssue ? ` (${doc.patient.ageAtIssue})` : ''}`,
    size: 10,
    gap: 13,
  });
  if (doc.patient.insuranceInfo?.providerName) {
    lines.push({
      text: `Cobertura: ${doc.patient.insuranceInfo.providerName}${doc.patient.insuranceInfo.affiliateNumber ? ` · Afiliado: ${doc.patient.insuranceInfo.affiliateNumber}` : ''}`,
      size: 10,
      gap: 16,
    });
  } else {
    lines.push({ text: 'Cobertura: Particular', size: 10, gap: 16 });
  }

  if (doc.primaryDiagnosisDescription) {
    lines.push({ text: 'DIAGNÓSTICO', bold: true, size: 11, gap: 14 });
    for (const l of wrapLines(doc.primaryDiagnosisDescription)) {
      lines.push({ text: l, size: 10, gap: 13 });
    }
    lines.push({ text: '', size: 8, gap: 8 });
  }

  if (doc.prescriptions.length > 0) {
    lines.push({ text: 'Rp / MEDICAMENTOS INDICADOS', bold: true, size: 11, gap: 15 });
    doc.prescriptions.forEach((item, index) => {
      lines.push({ text: `${index + 1}. ${item.medicationName} — ${item.dosage}`, bold: true, size: 10, gap: 13 });
      const detail = [
        item.administrationRoute,
        item.frequency,
        item.durationDays ? `durante ${item.durationDays} días` : null,
      ]
        .filter(Boolean)
        .join(' · ');
      lines.push({ text: `   ${detail}`, size: 10, gap: 13 });
      if (item.instructions) {
        for (const l of wrapLines(`   Indicaciones: ${item.instructions}`)) {
          lines.push({ text: l, size: 9, gap: 12 });
        }
      }
    });
    lines.push({ text: '', size: 8, gap: 8 });
  }

  if (doc.diagnosticOrders.length > 0) {
    lines.push({ text: 'ESTUDIOS SOLICITADOS', bold: true, size: 11, gap: 15 });
    doc.diagnosticOrders.forEach((order, index) => {
      for (const l of wrapLines(`${index + 1}. ${order}`)) {
        lines.push({ text: l, size: 10, gap: 13 });
      }
    });
    lines.push({ text: '', size: 8, gap: 8 });
  }

  if (doc.patientInstructions) {
    lines.push({ text: 'INDICACIONES GENERALES', bold: true, size: 11, gap: 14 });
    for (const l of wrapLines(doc.patientInstructions)) {
      lines.push({ text: l, size: 10, gap: 13 });
    }
  }

  lines.push({ text: '', size: 10, gap: 16 });
  if (signature) {
    lines.push({ text: '', size: 10, gap: 28 });
    lines.push({ text: '________________________________________', size: 10, gap: 13 });
    lines.push({ text: 'Firma y sello del profesional', bold: true, size: 9, gap: 12 });
    if (signature.stampText?.trim()) {
      lines.push({ text: signature.stampText.trim(), size: 8.5, gap: 12 });
    }
  } else {
    lines.push({ text: '--------------------------------------------------------------------------------', size: 10, gap: 12 });
    lines.push({ text: 'Firma y sello del profesional — Emitido sin firma digital', bold: true, size: 9, gap: 12 });
  }
  lines.push({ text: 'DOCUMENTO DE DEMOSTRACIÓN — GENERADO LOCALMENTE EN DEMOCHART', bold: true, size: 8, gap: 12 });

  const streamOps: string[] = ['BT'];
  let y = 795;
  let signatureLineY: number | null = null;
  for (const line of lines) {
    if (y < 52) break;
    if (line.text === '________________________________________') {
      signatureLineY = y;
    }
    if (line.text) {
      const font = line.bold ? '/F2' : '/F1';
      const size = line.size ?? 10;
      streamOps.push(`${font} ${size} Tf 1 0 0 1 48 ${y} Tm (${winAnsi(line.text)}) Tj`);
    }
    y -= line.gap ?? 14;
  }
  streamOps.push('ET');
  if (signature && signatureLineY !== null) {
    const base = signatureLineY + 8;
    streamOps.push(
      'q 0.1 0.14 0.25 RG 1.6 w',
      `58 ${base + 4} m 76 ${base + 24} 90 ${base + 22} 96 ${base + 6} c`,
      `104 ${base - 2} 118 ${base + 22} 136 ${base + 12} c`,
      `152 ${base + 4} 174 ${base + 18} 198 ${base + 10} c S Q`,
    );
  }
  const stream = streamOps.join('\n');

  const objects = [
    '1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n',
    '2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n',
    '3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>\nendobj\n',
    '4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>\nendobj\n',
    '5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>\nendobj\n',
    `6 0 obj\n<< /Length ${stream.length} >>\nstream\n${stream}\nendstream\nendobj\n`,
  ];

  let pdf = '%PDF-1.4\n';
  const offsets: number[] = [0];
  for (const obj of objects) {
    offsets.push(pdf.length);
    pdf += obj;
  }
  const xrefPos = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (let i = 1; i < offsets.length; i++) {
    pdf += `${String(offsets[i]).padStart(10, '0')} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefPos}\n%%EOF`;

  const bytes = new Uint8Array(pdf.length);
  for (let i = 0; i < pdf.length; i++) {
    bytes[i] = pdf.charCodeAt(i) & 0xff;
  }
  return new Blob([bytes], { type: 'application/pdf' });
}
