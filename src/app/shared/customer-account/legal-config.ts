/**
 * Datos legales del titular de Bycode (fuente única para Bycode, Pointly y DoctorChart).
 * Los campos fiscales opcionales pueden quedar vacíos mientras el proyecto está en etapa inicial;
 * las vistas públicas omiten automáticamente las filas vacías hasta que se completen.
 */
export const LEGAL_CONFIG = {
  brandName: 'Bycode Software',
  legalName: '',
  cuit: '',
  taxCondition: '',
  legalAddress: '',
  jurisdiction:
    'Tribunales Ordinarios competentes de la República Argentina, sin perjuicio de las normas de orden público de defensa del consumidor cuando resulten aplicables',
  legalEmail: '',
  privacyEmail: '',
  whatsappNumber: '+54 9 223 675-3142',
  whatsappUrl: 'https://wa.me/5492236753142',
  instagramUrl: 'https://www.instagram.com/bycode.arg/',
  supportHours: 'Lunes a viernes de 9:00 a 18:00 hs (hora argentina)',
  termsVersion: '1.0',
  privacyVersion: '1.0',
  lastUpdated: '26/11/2026',
  aaipUrl: 'https://www.argentina.gob.ar/aaip',
  consumerDefenseUrl: 'https://www.argentina.gob.ar/produccion/defensadelconsumidor',
  siteUrl: 'https://bycode.com.ar',
} as const;
