export interface HelpStep {
  id: string;
  title: string;
  instructions: string[];
  tip?: string;
  figure?: { file: string; width: number; height: number; description: string };
  action?: { path: string; label: string; external?: boolean };
}

export interface HelpGuide {
  id: string;
  title: string;
  description: string;
  icon: string;
  cover: string;
  steps: HelpStep[];
}

export const HELP_GUIDES: HelpGuide[] = [
  {
    id: 'appointments', title: 'Turnos', icon: 'lucideCalendarClock', cover: 'schedule',
    description: 'Prepará tus consultorios y teleconsultas, cargá horarios y empezá a recibir reservas.',
    steps: [
      {
        id: 'choose-specialty', title: 'Elegí la especialidad',
        instructions: [
          'DoctorChart abre con una de tus especialidades seleccionada. Para cambiarla, abrí Especialidad actual en el menú lateral. En el celular, primero abrí Menú. Si buscás una especialidad que todavía no agregaste, entrá en Mis especialidades.',
          'Abrí Consultorios y teleconsulta. Ahí vas a ver las sedes asignadas y la teleconsulta de la especialidad que elegiste.',
        ],
        figure: { file: 'specialties', width: 241, height: 310, description: 'Selector Especialidad actual abierto, con Medicina General elegida y las otras especialidades disponibles.' },
        action: { path: '/specialties', label: 'Abrir Mis especialidades' },
      },
      {
        id: 'create-office', title: 'Creá un consultorio presencial',
        instructions: [
          'En Consultorios y teleconsulta, elegí Nuevo consultorio. Escribí el nombre de la sede y completá la provincia, la localidad y la dirección.',
          'En Especialidades que atendés acá, marcá todas las que correspondan. Podés usar la misma sede para varias. Guardá con Crear consultorio.',
          'Para cambiar los datos o las especialidades más adelante, elegí Editar en la fila de la sede.',
        ],
        tip: 'Si querés quitar una especialidad que ya tiene horarios, primero ajustá sus bloques desde la agenda del consultorio.',
        figure: { file: 'clinic-form', width: 1040, height: 774, description: 'Formulario Nuevo Consultorio con datos de la sede, especialidades asignadas y el botón Crear consultorio.' },
        action: { path: '/clinics/new', label: 'Abrir Nuevo consultorio' },
      },
      {
        id: 'manage-office', title: 'Desactivá o recuperá un consultorio',
        instructions: [
          'En Consultorios y teleconsulta, elegí Desactivar en la sede que querés dejar de ofrecer. Revisá los turnos futuros en Agenda de turnos antes de cambiar el estado.',
          'Para volver a ofrecer una sede desactivada, elegí Activar. Para liberar su cupo, usá Retirar del cupo mientras está desactivada. Si querés recuperarla después, elegí el filtro Fuera del cupo, elegí Incorporar al cupo y después Activar.',
        ],
      },
      {
        id: 'enable-teleconsultation', title: 'Activá la teleconsulta',
        instructions: [
          'Elegí en Especialidad actual la especialidad que querés atender a distancia. En Consultorios y teleconsulta, activá el interruptor de Teleconsulta.',
          'Entrá en Horarios para definir cuándo atendés. Repetí el proceso desde el selector lateral si también ofrecés teleconsulta en otra especialidad.',
        ],
        tip: 'Cada especialidad tiene su propio interruptor. Al desactivarlo, se conservan sus horarios y turnos ya reservados.',
        figure: { file: 'clinic-list', width: 1135, height: 505, description: 'Tarjeta de teleconsulta con su interruptor y el acceso a Horarios.' },
        action: { path: '/clinics', label: 'Abrir Consultorios y teleconsulta' },
      },
      {
        id: 'add-hours', title: 'Cargá los horarios y guardalos',
        instructions: [
          'Para una sede presencial, elegí Ver horarios y agenda en su fila. En Especialidad del nuevo bloque vas a ver cuáles tienen horarios y cuáles faltan configurar. En teleconsulta se usa la especialidad del menú lateral.',
          'Marcá los días de atención. Completá Desde, Hasta y Minutos por turno. Por ejemplo, de 09:00 a 11:00 con turnos de 30 minutos.',
          'Elegí Agregar a los días seleccionados. Revisá los bloques en Semana habitual y, cuando estén bien, pulsá Guardar agenda.',
        ],
        figure: { file: 'schedule', width: 700, height: 503, description: 'Formulario Agregar un horario con especialidad, días seleccionados, horas y minutos por turno.' },
        action: { path: '/schedules', label: 'Abrir Mis horarios' },
      },
      {
        id: 'avoid-overlap', title: 'Revisá cruces, feriados y disponibilidad',
        instructions: [
          'Si un horario se cruza con otra agenda, el aviso indica qué sede o especialidad lo ocupa y qué parte coincide. Cambiá el horario o el día y volvé a agregarlo.',
          'En Otras agendas, elegí una semana y tocá un día para ver sus tramos ocupados.',
          'Después de guardar, abrí Ver disponibilidad. Elegí una fecha inicial y la vista Día o Semana, y pulsá Ver disponibilidad para calcular los horarios de la agenda guardada.',
        ],
        figure: { file: 'occupied', width: 412, height: 416, description: 'Panel Otras agendas, con selector de semana y el tramo ocupado del día elegido.' },
      },
      {
        id: 'schedule-exceptions', title: 'Configurá feriados y reglas de reserva',
        instructions: [
          'En la agenda de un consultorio presencial, entrá en Excepciones y elegí Añadir excepción. Indicá el motivo y la fecha inicial. Completá la fecha final si la excepción dura varios días.',
          'Dejá la excepción sin bloques para cerrar la atención. Para atender con otro horario, usá Añadir horario especial y completá el bloque. La excepción reemplaza el horario habitual en esas fechas.',
          'En Reglas de los turnos, podés ajustar la anticipación mínima en minutos y el horizonte máximo en días. Cuando termines, pulsá Guardar agenda.',
        ],
      },
      {
        id: 'publish', title: 'Publicá las reservas online',
        instructions: [
          'Entrá en Reservas online y elegí Preparar publicación. Marcá las agendas y especialidades que querés ofrecer y pulsá Revisar.',
          'En Editar página pública podés cambiar el nombre visible y la dirección. Desde Preguntas al paciente podés ver qué datos se piden siempre y agregar preguntas administrativas, como la obra social.',
          'Elegí Publicar reservas. Una vez activas, usá Copiar enlace o Ver como paciente. En Compartir por especialidad podés copiar un enlace directo.',
        ],
        tip: 'Usá Pausar reservas para dejar de aceptar turnos por la web. Los turnos ya reservados se conservan.',
      },
      {
        id: 'check-public-offer', title: 'Revisá qué puede reservar un paciente',
        instructions: [
          'En Reservas online, buscá la sección Qué pueden reservar para revisar la oferta. Si falta una opción, verificá que la agenda esté activa, tenga horarios guardados y figure entre las agendas y especialidades publicadas.',
          'Para cambiar la oferta, elegí Editar qué se puede reservar, ajustá las agendas o especialidades y revisá antes de guardar.',
        ],
        figure: { file: 'publication', width: 1050, height: 890, description: 'Panel de reservas con el enlace, las agendas ofrecidas y los datos de la reserva.' },
        action: { path: '/booking-publication', label: 'Abrir Reservas online' },
      },
      {
        id: 'book-online', title: 'Probá el recorrido de una reserva online',
        instructions: [
          'Desde el enlace público, elegí la especialidad, el consultorio o la teleconsulta, la fecha y uno de los horarios disponibles.',
          'Completá los datos de quien solicita el turno. Si es para otra persona, completá también el nombre de quien se va a atender. Aceptá el envío de los datos administrativos y elegí Confirmar turno.',
          'Revisá en Turno confirmado la sede, la fecha y el horario. Desde ahí podés ir a Mis turnos. Si reservaste para probar tu agenda, cancelá el turno de prueba después.',
        ],
        figure: { file: 'public-booking', width: 408, height: 1083, description: 'Formulario público de reserva con horario elegido y campos para los datos del solicitante.' },
      },
      {
        id: 'manual-booking', title: 'Cargá un turno que te pidieron por fuera de la web',
        instructions: [
          'Entrá en Agenda de turnos, elegí el día y seleccioná un horario disponible para la sede y la especialidad correctas.',
          'Completá nombre, DNI, teléfono y correo del solicitante. Si el turno es para otra persona, marcá esa opción y escribí el nombre de quien se atenderá. Contestá las preguntas administrativas que se muestren.',
          'Confirmá el turno. El solicitante puede verlo en Mis turnos con su DNI y verificando el correo de la reserva.',
        ],
        figure: { file: 'manual-booking', width: 928, height: 671, description: 'Formulario de turno manual con horario, datos del solicitante, nombre de quien se atenderá y botón Confirmar turno.' },
        action: { path: '/calendar', label: 'Abrir Agenda de turnos' },
      },
      {
        id: 'manage-booking', title: 'Gestioná los turnos del día',
        instructions: [
          'En Agenda de turnos, elegí el día y abrí la reserva. Usá el selector de consultorio o Filtros para encontrar turnos por modalidad, especialidad o estado.',
          'Cuando llegue la persona a un turno presencial, elegí Marcar: En consultorio. El detalle muestra las acciones disponibles para ese estado, los datos administrativos y el Historial de modificaciones.',
        ],
        figure: { file: 'calendar', width: 614, height: 510, description: 'Detalle de un turno confirmado con acciones para marcar al paciente en consultorio o ausente, cancelar o reprogramar.' },
      },
      {
        id: 'change-booking', title: 'Reprogramá o cancelá una reserva',
        instructions: [
          'Abrí el detalle y elegí Reprogramar. Seleccioná consultorio, fecha y horario libre, escribí el motivo y pulsá Confirmar reprogramación. Si la reserva tiene correo registrado, DoctorChart le pide al paciente que confirme el cambio.',
          'Para cancelar, elegí Cancelar turno, escribí el motivo y pulsá Confirmar cancelación. Usá un motivo administrativo, porque el paciente puede verlo.',
        ],
        figure: { file: 'booking-change', width: 564, height: 510, description: 'Formulario para elegir otro horario e indicar el motivo de la reprogramación.' },
      },
      {
        id: 'patient-portal', title: 'Mostrale al paciente cómo consultar su turno',
        instructions: [
          'Compartile el enlace de reservas que aparece en Reservas online. Desde ahí, la persona puede entrar en Mis turnos.',
          'Indicale que ingrese el DNI del solicitante y, cuando se lo pida la pantalla, el código de 6 dígitos que llega al correo de la reserva. También sirve para los turnos que cargaste a mano.',
          'Antes de la hora de inicio, la persona puede elegir Reprogramar o Cancelar turno desde Mis turnos. Tiene que indicar un motivo, verificar su correo si se le pide y confirmar la acción.',
          'Si el profesional propone un nuevo horario, la persona puede abrir el enlace que recibió y verificar su correo. En Mis turnos, puede pulsar Confirmar turno para aceptar la propuesta o Elegir otra fecha para buscar otro horario.',
        ],
        figure: { file: 'my-bookings', width: 408, height: 160, description: 'Pantalla Mis turnos con el campo DNI de la reserva y el botón Ver mis turnos.' },
      },
    ],
  },
  {
    id: 'secretaries', title: 'Secretaría', icon: 'lucideContact', cover: 'staff-calendar',
    description: 'Invitá a una persona, elegí qué puede hacer y mostrale cómo usar su agenda.',
    steps: [
      {
        id: 'prepare-office', title: 'Prepará las agendas que vas a delegar',
        instructions: [
          'Creá la sede o activá la teleconsulta que querés delegar. Cargá y guardá sus horarios para que Secretaría tenga turnos disponibles.',
          'Entrá en Secretaría desde el menú del profesional. Si todavía no hay una agenda disponible para asignar, volvé a Consultorios y teleconsulta.',
        ],
        action: { path: '/help/appointments', label: 'Ver la guía de Turnos' },
      },
      {
        id: 'invite', title: 'Creá la invitación y elegí los permisos',
        instructions: [
          'Elegí Invitar a Secretaría y completá el nombre y el correo de la persona. Si agregás un teléfono, también podés compartir el enlace por WhatsApp.',
          'Marcá las agendas que va a usar y elegí Solo ver agenda o Gestionar turnos. Usá Personalizar permisos si querés habilitar solo algunas acciones.',
          'Elegí Crear invitación. Si vas a compartirla por tu cuenta, usá Copiar enlace y enviala en privado. El enlace vence a las 6 horas. Si vence antes de activar el acceso, usá Nuevo enlace.',
        ],
        tip: 'Secretaría trabaja con las agendas asignadas. Su cuenta da acceso a la gestión de turnos, mientras las historias clínicas se abren desde la cuenta profesional.',
        figure: { file: 'secretaries', width: 608, height: 948, description: 'Formulario de invitación con el teléfono opcional visible, la selección de agendas y las opciones de permisos.' },
        action: { path: '/secretaries', label: 'Abrir Secretaría' },
      },
      {
        id: 'accept', title: 'Aceptá la invitación',
        instructions: [
          'La persona abre el enlace, revisa el correo y las agendas de la invitación y elige Entrar a la agenda después de completar su contraseña.',
          'Si ya tiene una cuenta de Secretaría, usa su contraseña actual. Si es la primera vez, crea una contraseña.',
          'Después de activar el acceso, puede entrar desde el inicio de sesión de Secretaría.',
        ],
        figure: { file: 'staff-activate', width: 1440, height: 930, description: 'Pantalla de aceptación con el nombre del profesional, la agenda asignada y un campo de contraseña.' },
        action: { path: '/staff/login', label: 'Abrir acceso de Secretaría', external: true },
      },
      {
        id: 'use-calendar', title: 'Usá la agenda asignada',
        instructions: [
          'En Médico activo, elegí para quién vas a trabajar si tenés más de un profesional asignado. Después elegí un Consultorio asignado. Si hay uno solo, la agenda se abre automáticamente. Usá el calendario para cambiar de día.',
          'Para crear un turno, elegí un horario disponible y completá nombre, DNI, teléfono y correo. Indicá si el turno es para otra persona y completá las preguntas que aparezcan.',
          'Para gestionar una reserva, abrila y usá las acciones que estén habilitadas para tu cuenta.',
        ],
        figure: { file: 'staff-calendar', width: 1440, height: 980, description: 'Agenda de Secretaría con el médico activo, el consultorio asignado y los turnos de la semana.' },
      },
      {
        id: 'manage-access', title: 'Cambiá el acceso o recuperá la cuenta',
        instructions: [
          'Como profesional, volvé a Secretaría. En Personas asignadas usá Editar acceso para cambiar agendas y permisos. En Más opciones podés revocar el acceso.',
          'Si falta una agenda, revisá la asignación y pedile a la persona que use Actualizar calendario. Si olvidó su contraseña, puede recuperarla desde el acceso de Secretaría con el código que recibe por correo.',
        ],
        figure: { file: 'secretary-access', width: 1100, height: 370, description: 'Panel Personas asignadas con el estado, las agendas y el botón Editar acceso.' },
        action: { path: '/secretaries', label: 'Revisar personas asignadas' },
      },
    ],
  },
  {
    id: 'clinical', title: 'Clínica', icon: 'lucideStethoscope', cover: 'record',
    description: 'Prepará tu espacio clínico, registrá pacientes y seguí sus consultas y documentos.',
    steps: [
      {
        id: 'workspace-home', title: 'Revisá el inicio de tu especialidad',
        instructions: [
          'Desde Inicio, revisá las tarjetas de la especialidad activa y los accesos para seguir trabajando. Usá Próximas consultas para consultar los seguimientos registrados, si está disponible.',
          'Escribí un recordatorio en Notas rápidas y pulsá Guardar. Las notas se guardan para la especialidad activa.',
        ],
        figure: { file: 'dashboard', width: 1440, height: 980, description: 'Pantalla Inicio de una especialidad con su resumen y las notas rápidas.' },
        action: { path: '/dashboard', label: 'Abrir Inicio' },
      },
      {
        id: 'setup-specialty', title: 'Prepará cada especialidad',
        instructions: [
          'Si recién empezás, elegí tu especialidad en la pantalla de configuración inicial y pulsá Continuar. Para sumar otra más adelante, entrá en Mis especialidades.',
          'En Mis especialidades, usá Agregar especialidad para sumar otra. Podés usar la configuración inicial o ajustar los campos de la ficha y la consulta. Elegí Finalizar configuración para habilitarla.',
          'Elegila arriba a la izquierda antes de empezar. El directorio y los registros se muestran para esa especialidad.',
          'Para cambiar los campos después, elegí Personalizar ficha en Mis especialidades. Usá Guardar borrador para continuar otro día o Aplicar cambios para activar la configuración.',
        ],
        figure: { file: 'wizard', width: 1440, height: 980, description: 'Editor de la especialidad con los pasos de configuración y los campos de datos personales.' },
        action: { path: '/specialties', label: 'Abrir Mis especialidades' },
      },
      {
        id: 'find-patient', title: 'Buscá al paciente antes de crear una ficha',
        instructions: [
          'En Pacientes, buscá por DNI, nombre o teléfono. Si encontrás a la persona, elegí Ver Ficha.',
          'Si esperabas ver a un paciente y no aparece, revisá la especialidad seleccionada y limpiá los filtros antes de volver a buscar.',
        ],
        figure: { file: 'patients', width: 1440, height: 980, description: 'Directorio con buscador, filtros, resultados y botones para abrir una ficha o crear un paciente.' },
        action: { path: '/patients', label: 'Abrir Pacientes' },
      },
      {
        id: 'create-patient', title: 'Registrá un paciente',
        instructions: [
          'Elegí Nuevo paciente y completá los datos de identificación y contacto. Los campos disponibles dependen de la especialidad y de cómo esté configurada la ficha.',
          'Completá los campos obligatorios y elegí Crear Paciente. Si aparece un aviso, corregí los datos indicados antes de reintentar.',
        ],
        figure: { file: 'patient-form', width: 1440, height: 980, description: 'Pantalla Registrar Nuevo Paciente con campos de identificación y contacto.' },
        action: { path: '/patients/new', label: 'Abrir Nuevo paciente' },
      },
      {
        id: 'read-chart', title: 'Abrí la ficha y revisá el seguimiento',
        instructions: [
          'En la ficha, revisá el resumen para ubicarte. Usá las pestañas que estén disponibles para entrar a consultas, recetas, estudios u otros registros.',
          'Para actualizar los datos del paciente, usá la opción de edición de la ficha. Revisá que arriba figuren el paciente y la especialidad correctos antes de guardar.',
        ],
        figure: { file: 'record', width: 1135, height: 440, description: 'Encabezado de una ficha con los datos del paciente, acciones y accesos a sus secciones clínicas.' },
      },
      {
        id: 'record-encounter', title: 'Registrá una consulta',
        instructions: [
          'Desde la ficha del paciente, elegí Nueva historia clínica. Revisá el nombre del paciente antes de empezar la consulta.',
          'Completá los campos de la atención según corresponda y elegí Guardar historia clínica. Después podés encontrarla en la ficha o en el historial de consultas disponible para tu especialidad.',
        ],
        figure: { file: 'encounter', width: 1440, height: 980, description: 'Inicio de Nueva Historia Clínica con el nombre del paciente y las opciones de tipo de atención.' },
      },
      {
        id: 'documents', title: 'Cargá estudios, recetas y otros documentos',
        instructions: [
          'Desde la ficha, entrá en Estudios realizados para adjuntar un archivo e identificarlo. En Recetas y Órdenes, elegí el tipo de documento, completá sus datos y usá la opción de emitir e imprimir.',
          'En Más opciones de la ficha, abrí Documentos y exportación para descargar un PDF original, anular una emisión con motivo o descargar una copia en ZIP de la ficha de esa especialidad. La copia contiene datos clínicos, revisiones y adjuntos.',
        ],
        figure: { file: 'record-tools', width: 704, height: 536, description: 'Menú de gestión de la ficha con revisiones, accesos, documentos y anulación.' },
      },
      {
        id: 'pediatric-follow-up', title: 'Consultá las curvas y registrá vacunas en Pediatría',
        instructions: [
          'Abrí la ficha en Pediatría. En Evolución y Curvas, revisá las mediciones registradas a lo largo del tiempo. Si se te pide confirmar la referencia de la curva, revisá el dato de la ficha antes de confirmarla.',
          'En Vacunas, elegí la dosis y usá Registrar aplicación. Podés completar o corregir la fecha de una dosis registrada desde esa misma sección.',
          'Para consultar el esquema general, abrí Calendario de vacunación en la navegación de la especialidad.',
        ],
        figure: { file: 'growth', width: 1135, height: 874, description: 'Curva de crecimiento con el gráfico y la medición de ejemplo de una ficha de Pediatría.' },
      },
      {
        id: 'review-and-audit', title: 'Encontrá revisiones, fichas anuladas y auditoría',
        instructions: [
          'En Más opciones de la ficha, abrí Revisiones de la ficha para revisar cambios y anulaciones. En Accesos a la ficha podés consultar quién abrió ese registro.',
          'Para ver fichas anuladas o la auditoría de toda la especialidad, entrá en Pacientes y abrí Más opciones. Cada herramienta tiene su propia página.',
          'Si una consulta necesita una corrección, abrila desde Historia Clínica y elegí Editar consulta. Para anular una consulta o una ficha creada por error, usá su acción de anulación e indicá el motivo. Las fichas anuladas se consultan desde Fichas anuladas.',
        ],
        tip: 'Antes de abrir una herramienta administrativa, revisá la especialidad activa para consultar el contexto correcto.',
        figure: { file: 'patient-tools', width: 1440, height: 980, description: 'Menú Más opciones con accesos a Auditoría de accesos y Fichas anuladas.' },
        action: { path: '/patients', label: 'Volver al directorio' },
      },
    ],
  },
  {
    id: 'account', title: 'Cuenta, planes y soporte', icon: 'lucideCircleHelp', cover: 'profile',
    description: 'Revisá tu perfil profesional, administrá tu cuenta Bycode y seguí tus consultas de soporte.',
    steps: [
      {
        id: 'professional-profile', title: 'Consultá tu perfil profesional',
        instructions: [
          'Abrí el menú de tu avatar y elegí Perfil Profesional. Ahí podés consultar tus datos de la práctica y la especialidad activa.',
        ],
        figure: { file: 'profile', width: 1135, height: 533, description: 'Perfil profesional con datos de ejemplo, especialidad activa y opción para cerrar la sesión.' },
        action: { path: '/profile', label: 'Abrir Perfil Profesional' },
      },
      {
        id: 'bycode-account', title: 'Actualizá tus datos y la seguridad de tu cuenta',
        instructions: [
          'Entrá en Mi cuenta para editar tu nombre, teléfono y foto. Tu cuenta es compartida entre las aplicaciones de Bycode.',
          'Desde Seguridad podés solicitar un cambio de correo o actualizar la contraseña. Si olvidaste tu contraseña, usá el enlace de recuperación en Ingresar.',
        ],
        figure: { file: 'account', width: 1152, height: 755, description: 'Mi cuenta con datos personales, foto y accesos a Seguridad y Soporte.' },
        action: { path: '/account', label: 'Abrir Mi cuenta' },
      },
      {
        id: 'subscription', title: 'Revisá tu suscripción o el estado de una transferencia',
        instructions: [
          'Abrí Planes y suscripción desde Mi cuenta. Revisá tu plan, el importe y el período. Si elegís Pagar por transferencia, seguí los pasos de Raya Cash y volvé a DoctorChart para consultar el estado.',
          'Si sigue pendiente, usá Retomar transferencia. Para revisar un pago anterior, abrí Historial de transferencias y elegí Consultar.',
        ],
        action: { path: '/pricing', label: 'Abrir Planes y suscripción' },
      },
      {
        id: 'support-ticket', title: 'Consultá a soporte',
        instructions: [
          'Abrí Soporte desde Mi cuenta y elegí Nuevo ticket. Incluí el problema y los pasos para verlo. Si se trata de un pago, indicá la referencia de la operación. Podés adjuntar hasta tres capturas. Omití contraseñas y datos personales o clínicos.',
          'En Mis tickets, elegí Ver ticket para consultar el estado, el historial y la respuesta. Si el envío quedó pendiente, reintentá desde el mismo formulario.',
        ],
        figure: { file: 'support', width: 1152, height: 728, description: 'Formulario de soporte con asunto, descripción y opción para adjuntar capturas.' },
        action: { path: '/support', label: 'Abrir Soporte' },
      },
    ],
  },
];
