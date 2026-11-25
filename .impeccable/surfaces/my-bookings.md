# Mis turnos — panel del paciente

Primary target: src/app/features/appointments/confirmation-page.component.html
Mode: Operate. Implementación en Angular; sistema DoctorChart existente.

## Direction contract

THESIS: El paciente reconoce fecha, profesional, lugar y acciones posibles al escanear sus reservas. El código por correo protege los datos personales.

OWN-WORLD: Tokens DoctorChart, tipografía Google Sans existente, superficies de papel y canvas, teal para selección y próximo turno, gris para fechas pasadas, rojo para cancelaciones. Ambos temas mantienen la misma jerarquía.

STORY: DNI, resumen limitado a fechas públicas, verificación por correo, reservas completas y gestión confirmada. Nunca completar campos que el API no proporciona.

FIRST VIEWPORT: Navegación con acceso activo, título y búsqueda. Columna principal amplia con conteos de los registros cargados, próximo turno y tarjetas agrupadas; ayuda contextual a la derecha. En móvil la ayuda queda después de las reservas.

FORM: Dashboard de gestión solicitado explícitamente; seed: none (pinned). «Separá los turnos en secciones bien diferenciadas» y «Próximo turno destacado».

FINISH: Verificar compilación, contratos existentes, fechas de Buenos Aires, bloqueo de detalles en métodos y plantilla, confirmación de cancelación, teclado, responsive y ambos temas. Las capturas usan únicamente fixtures de prueba; no se agregan datos ficticios a la aplicación.
