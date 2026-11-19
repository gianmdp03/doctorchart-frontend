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
          'DoctorChart abre con una de tus especialidades seleccionada. Para cambiarla, abrí Especialidad actual arriba a la izquierda. Si buscás una especialidad que todavía no agregaste, entrá en Mis especialidades.',
          'Abrí Consultorios y teleconsulta. Ahí vas a ver las sedes asignadas y la teleconsulta de la especialidad que elegiste.',
        ],
        figure: { file: 'specialties', width: 232, height: 251, description: 'Selector Especialidad actual abierto, con Medicina General elegida y las otras especialidades disponibles.' },
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
        figure: { file: 'clinic-form', width: 899, height: 759, description: 'Formulario Nuevo Consultorio con datos de la sede, especialidades asignadas y el botón Crear consultorio.' },
        action: { path: '/clinics/new', label: 'Abrir Nuevo consultorio' },
      },
      {
        id: 'enable-teleconsultation', title: 'Activá la teleconsulta',
        instructions: [
          'Elegí arriba a la izquierda la especialidad que querés atender a distancia. En Consultorios y teleconsulta, activá el interruptor de Teleconsulta.',
          'Entrá en Horarios para definir cuándo atendés. Repetí el proceso desde el selector lateral si también ofrecés teleconsulta en otra especialidad.',
        ],
        tip: 'Cada especialidad tiene su propio interruptor. Al desactivarlo, se conservan sus horarios y turnos ya reservados.',
        figure: { file: 'clinic-list', width: 899, height: 166, description: 'Tarjeta de teleconsulta con su interruptor y el acceso a Horarios.' },
        action: { path: '/clinics', label: 'Abrir Consultorios y teleconsulta' },
      },
      {
        id: 'add-hours', title: 'Cargá los horarios y guardalos',
        instructions: [
          'Para una sede presencial, elegí Ver horarios y agenda en su fila. En Especialidad del nuevo bloque vas a ver cuáles tienen horarios y cuáles faltan configurar. En teleconsulta se usa la especialidad del menú lateral.',
          'Marcá los días de atención. Completá Desde, Hasta y Minutos por turno. Por ejemplo, de 09:00 a 11:00 con turnos de 30 minutos.',
          'Elegí Agregar a los días seleccionados. Revisá los bloques en Semana habitual y, cuando estén bien, pulsá Guardar agenda.',
        ],
        figure: { file: 'schedule', width: 553, height: 531, description: 'Formulario Agregar un horario con especialidad, días seleccionados, horas y minutos por turno.' },
        action: { path: '/schedules', label: 'Abrir Mis horarios' },
      },
      {
        id: 'avoid-overlap', title: 'Revisá cruces, feriados y disponibilidad',
        instructions: [
          'Si un horario se cruza con otra agenda, el aviso indica qué sede o especialidad lo ocupa y qué parte coincide. Cambiá el horario o el día y volvé a agregarlo.',
          'En Otras agendas, elegí una semana y tocá un día para ver sus tramos ocupados. Para una sede presencial, usá Excepciones si necesitás cerrar por feriado o atender con otro horario en fechas puntuales.',
          'Después de guardar, usá Ver disponibilidad para comprobar qué turnos puede tomar un paciente. En una agenda presencial también podés ajustar la anticipación mínima y el horizonte de reserva.',
        ],
        figure: { file: 'occupied', width: 362, height: 408, description: 'Panel Otras agendas, con selector semanal y el tramo ocupado del día elegido.' },
      },
      {
        id: 'publish', title: 'Publicá las reservas online',
        instructions: [
          'Entrá en Reservas online y elegí Preparar publicación. Marcá las agendas y especialidades que querés ofrecer y pulsá Revisar.',
          'En Editar página pública podés cambiar el nombre visible y la dirección. Desde Preguntas al paciente podés ver qué datos se piden siempre y agregar preguntas administrativas, como la obra social.',
          'Elegí Publicar reservas. Una vez activas, usá Copiar enlace para compartir tu página o Ver como paciente para abrirla.',
        ],
        tip: 'Si falta una opción al reservar, revisá que la sede o teleconsulta esté activa, que tenga horarios guardados y que su especialidad esté incluida en la publicación.',
        figure: { file: 'publication', width: 1051, height: 989, description: 'Panel de reservas con el enlace, las agendas ofrecidas y los datos de la reserva.' },
        action: { path: '/booking-publication', label: 'Abrir Reservas online' },
      },
      {
        id: 'book-online', title: 'Probá el recorrido de una reserva online',
        instructions: [
          'Desde el enlace público, elegí la especialidad, el consultorio o la teleconsulta, el día y uno de los horarios disponibles.',
          'Completá los datos de quien solicita el turno. Si es para otra persona, completá también el nombre de quien se va a atender. Aceptá el envío de los datos administrativos y elegí Confirmar turno.',
          'Revisá la confirmación que aparece en pantalla. Si pide verificar el correo, ingresá el código recibido. Cuando hagas una prueba con tu agenda real, acordate de cancelar el turno de prueba después.',
        ],
        figure: { file: 'public-booking', width: 404, height: 1002, description: 'Formulario público de reserva con horario elegido y campos para los datos del solicitante.' },
      },
      {
        id: 'manual-booking', title: 'Cargá un turno que te pidieron por fuera de la web',
        instructions: [
          'Entrá en Agenda de turnos, elegí el día y seleccioná un horario disponible para la sede y la especialidad correctas.',
          'Completá nombre, DNI, teléfono y correo del solicitante. Si el turno es para otra persona, marcá esa opción y escribí el nombre de quien se atenderá. Contestá las preguntas administrativas que se muestren.',
          'Confirmá el turno. El solicitante puede verlo en Mis turnos con su DNI y verificando el correo de la reserva.',
        ],
        figure: { file: 'manual-booking', width: 335, height: 962, description: 'Formulario de turno manual con horario, datos del solicitante, nombre de quien se atenderá y botón Confirmar turno.' },
        action: { path: '/calendar', label: 'Abrir Agenda de turnos' },
      },
      {
        id: 'manage-booking', title: 'Gestioná los turnos del día',
        instructions: [
          'En Agenda de turnos, abrí la reserva para ver su detalle. Desde ahí podés reprogramar, cancelar o actualizar el estado según corresponda.',
          'Si la persona llega, marcá el ingreso. Usá los filtros para encontrar reservas de una sede, especialidad o modalidad.',
        ],
        figure: { file: 'calendar', width: 409, height: 612, description: 'Detalle de un turno confirmado con acciones para marcar la llegada, cancelar o reprogramar.' },
      },
      {
        id: 'patient-portal', title: 'Mostrale al paciente cómo consultar su turno',
        instructions: [
          'Compartile el enlace de reservas que aparece en Reservas online. Desde ahí, la persona puede entrar en Mis turnos.',
          'Indicale que ingrese el DNI del solicitante y el código de 6 dígitos que llega al correo que se usó al reservar. Esto también sirve para los turnos que cargaste a mano.',
        ],
        figure: { file: 'my-bookings', width: 784, height: 487, description: 'Pantalla Mis turnos con el campo DNI de la reserva y el botón Ver mis turnos.' },
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
          'Elegí Invitar a Secretaría y completá el nombre y el correo de la persona.',
          'Marcá las agendas que va a usar y elegí Solo ver agenda o Gestionar turnos. Usá Personalizar permisos si querés habilitar solo algunas acciones.',
          'Elegí Crear invitación. Si vas a compartirla por tu cuenta, usá Copiar enlace y enviala en privado.',
        ],
        tip: 'Secretaría trabaja con las agendas asignadas. Su cuenta da acceso a la gestión de turnos, mientras las historias clínicas se abren desde la cuenta profesional.',
        figure: { file: 'secretaries', width: 608, height: 980, description: 'Formulario de invitación con el teléfono opcional visible, la selección de agendas y las opciones de permisos.' },
        action: { path: '/secretaries', label: 'Abrir Secretaría' },
      },
      {
        id: 'accept', title: 'Aceptá la invitación',
        instructions: [
          'La persona abre el enlace, revisa el correo y las agendas de la invitación y elige Entrar a la agenda después de completar su contraseña.',
          'Si ya tiene una cuenta de Secretaría, usa su contraseña actual. Si es la primera vez, crea una contraseña y guarda el código de recuperación si la pantalla se lo ofrece.',
          'Después de activar el acceso, puede entrar desde el inicio de sesión de Secretaría.',
        ],
        figure: { file: 'staff-activate', width: 580, height: 824, description: 'Pantalla de aceptación con el nombre del profesional, la agenda asignada y un campo de contraseña.' },
        action: { path: '/staff/login', label: 'Abrir acceso de Secretaría', external: true },
      },
      {
        id: 'use-calendar', title: 'Usá la agenda asignada',
        instructions: [
          'Al entrar, si hay un solo consultorio asignado se abre la agenda de hoy. Si hay varios, se recupera el último que usaste en ese navegador o podés elegir uno. Usá la franja semanal para cambiar de día.',
          'Para crear un turno, elegí un horario disponible y completá nombre, DNI, teléfono y correo. Indicá si el turno es para otra persona y completá las preguntas que aparezcan.',
          'Para gestionar una reserva, abrila y usá las acciones que estén habilitadas para tu cuenta.',
        ],
        figure: { file: 'staff-calendar', width: 1408, height: 832, description: 'Agenda de turnos de Secretaría con el consultorio asignado, la franja semanal, las reservas y los horarios libres.' },
      },
      {
        id: 'manage-access', title: 'Cambiá el acceso o recuperá la cuenta',
        instructions: [
          'Como profesional, volvé a Secretaría. En Personas asignadas usá Editar acceso para cambiar agendas y permisos. En Más opciones podés revocar el acceso.',
          'Si falta una agenda, revisá la asignación y pedile a la persona que pulse Actualizar agenda. Si olvidó su contraseña, puede iniciar la recuperación desde el acceso de Secretaría.',
        ],
        figure: { file: 'secretary-access', width: 1101, height: 338, description: 'Panel Personas asignadas con el estado, las agendas y el botón Editar acceso.' },
        action: { path: '/secretaries', label: 'Revisar personas asignadas' },
      },
    ],
  },
  {
    id: 'clinical', title: 'Clínica', icon: 'lucideStethoscope', cover: 'record',
    description: 'Prepará tu espacio clínico, registrá pacientes y seguí sus consultas y documentos.',
    steps: [
      {
        id: 'setup-specialty', title: 'Prepará cada especialidad',
        instructions: [
          'Si recién empezás, elegí tu especialidad en la pantalla de configuración inicial y pulsá Continuar. Para sumar otra más adelante, entrá en Mis especialidades.',
          'Revisá los campos de la ficha y del formulario de consulta. Podés avanzar por los pasos con la configuración inicial y ajustarla más adelante. Guardá y aplicá los cambios para habilitar la especialidad.',
          'Elegila arriba a la izquierda antes de empezar. El directorio y los registros se muestran para esa especialidad.',
          'Usá Personalizar Fichas si necesitás ajustar los campos de la ficha o de las consultas. Guardá la configuración cuando termines.',
        ],
        figure: { file: 'wizard', width: 1111, height: 1372, description: 'Editor de Personalizar fichas y consultas con los pasos de configuración, los campos de Hábitos y el botón Aplicar cambios.' },
        action: { path: '/specialties', label: 'Abrir Mis especialidades' },
      },
      {
        id: 'find-patient', title: 'Buscá al paciente antes de crear una ficha',
        instructions: [
          'En Pacientes, buscá por DNI, nombre o teléfono. Si encontrás a la persona, elegí Ver Ficha.',
          'Si esperabas ver a un paciente y no aparece, revisá la especialidad seleccionada y limpiá los filtros antes de volver a buscar.',
        ],
        figure: { file: 'patients', width: 1159, height: 748, description: 'Directorio con buscador, filtros, resultados y botones para abrir una ficha o crear un paciente.' },
        action: { path: '/patients', label: 'Abrir Pacientes' },
      },
      {
        id: 'create-patient', title: 'Registrá un paciente',
        instructions: [
          'Elegí Nuevo paciente y completá los datos de identificación y contacto. Los campos disponibles dependen de la especialidad y de cómo esté configurada la ficha.',
          'Completá los campos obligatorios y elegí Crear Paciente. Si aparece un aviso, corregí los datos indicados antes de reintentar.',
        ],
        figure: { file: 'patient-form', width: 899, height: 741, description: 'Pantalla Registrar Nuevo Paciente con la sección completa de datos personales y contacto.' },
        action: { path: '/patients/new', label: 'Abrir Nuevo paciente' },
      },
      {
        id: 'read-chart', title: 'Abrí la ficha y revisá el seguimiento',
        instructions: [
          'En la ficha, revisá el resumen para ubicarte. Usá las pestañas que estén disponibles para entrar a consultas, recetas, estudios u otros registros.',
          'Para actualizar los datos del paciente, usá la opción de edición de la ficha. Revisá que arriba figuren el paciente y la especialidad correctos antes de guardar.',
        ],
        figure: { file: 'record', width: 899, height: 333, description: 'Encabezado de una ficha con los datos del paciente, acciones y accesos a sus secciones clínicas.' },
      },
      {
        id: 'record-encounter', title: 'Registrá una consulta',
        instructions: [
          'Desde la ficha del paciente, elegí Nueva historia clínica. Revisá el nombre del paciente antes de empezar la consulta.',
          'Completá los campos de la atención según corresponda y elegí Guardar historia clínica. Después podés encontrarla en la ficha o en el historial de consultas disponible para tu especialidad.',
        ],
        figure: { file: 'encounter', width: 897, height: 396, description: 'Inicio de Nueva Historia Clínica con el nombre del paciente y las opciones de tipo de atención.' },
      },
      {
        id: 'documents', title: 'Cargá estudios, recetas y otros documentos',
        instructions: [
          'Desde la ficha, entrá en Estudios para adjuntar un archivo y darle un nombre que te permita encontrarlo. Si la especialidad ofrece Recetas u Órdenes, abrí esa pestaña para registrarlas.',
          'Para revisar documentos emitidos o exportar la ficha, elegí Más opciones en el encabezado del paciente y abrí Documentos y exportación.',
          'En Pediatría, usá las secciones de crecimiento y vacunación cuando estén habilitadas para revisar mediciones y dosis registradas.',
        ],
        figure: { file: 'record-tools', width: 702, height: 534, description: 'Menú de gestión de la ficha con revisiones, accesos, documentos y anulación.' },
      },
      {
        id: 'review-and-audit', title: 'Encontrá revisiones, fichas anuladas y auditoría',
        instructions: [
          'Para revisar el historial de un registro, abrí la ficha y buscá Revisiones de la ficha dentro de Gestión de la ficha.',
          'Para ver fichas anuladas o la auditoría de toda la especialidad, entrá en Pacientes y abrí Más opciones. Cada herramienta tiene su propia página.',
          'Si una ficha quedó duplicada o se creó por error, su menú de gestión ofrece Anular ficha. Revisá a qué paciente corresponde e indicá el motivo. Podés consultar el registro después desde Fichas anuladas.',
        ],
        tip: 'Antes de abrir una herramienta administrativa, revisá la especialidad activa para consultar el contexto correcto.',
        figure: { file: 'patient-tools', width: 899, height: 241, description: 'Menú Más opciones con accesos a Auditoría de accesos y Fichas anuladas.' },
        action: { path: '/patients', label: 'Volver al directorio' },
      },
    ],
  },
];
