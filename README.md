CRM Voluntarios Teletón (Ducotin)
📖 Descripción del Proyecto
El Sistema CRM de Voluntarios es una plataforma web tipo Single Page Application (SPA) diseñada para la gestión integral del talento humano de la Fundación Teletón. Este sistema permite administrar todo el ciclo de vida de los voluntarios, desde su inscripción y seguimiento hasta la emisión de sus credenciales digitales (Pasaporte Teletón), proporcionando además visualización de datos en tiempo real.





🛠 Stack Tecnológico
El proyecto está construido utilizando tecnologías modernas del ecosistema JavaScript para asegurar rendimiento y mantenibilidad.

Core:


Framework: React v19.2.0.


Build Tool: Vite v7.2.4.


Lenguaje: JavaScript (ES6+ / JSX).

Librerías Principales:


Enrutamiento: react-router-dom (v7.9.6).


Gráficos: recharts (v3.5.1) para visualización estadística.


Iconografía: lucide-react (v0.469.0).


Datos: xlsx (v0.18.5) para manejo de hojas de cálculo.

🚀 Instalación y Despliegue
Prerrequisitos

Node.js: v18 o superior recomendado.


Gestor de paquetes: npm.

Pasos de Instalación

Clonar el repositorio o descargar el código fuente.

Instalar dependencias:

Bash

npm install
.

Iniciar servidor de desarrollo:

Bash

npm run dev
. La aplicación estará disponible por defecto en http://localhost:5173.


Construcción para Producción
Para generar los archivos estáticos optimizados para despliegue (carpeta dist):

Bash

npm run build
.

📂 Arquitectura del Proyecto
El proyecto sigue la estructura modular estándar de Vite.

Estructura de Directorios

/public: Activos estáticos públicos (ej. vite.svg).


/src: Código fuente.


/components: Componentes reutilizables (Dashboard, Formularios, Mapas).


App.jsx: Componente raíz que maneja enrutamiento y estado global.


main.jsx: Punto de entrada al DOM.

Gestión de Estado y Persistencia

Lifting State Up: El estado principal voluntarios reside en App.jsx y se propaga vía props.

Persistencia: Se utiliza localStorage para simular una base de datos. Al iniciar, un useEffect carga datos persistentes o inicializa datos mock si no existen.

wb Guía de Usuario (Funcionalidades)
1. Acceso y Navegación

Login: Autenticación mediante RUT o correo electrónico.


Barra Superior (NavBar): Acceso rápido a Dashboard, Registro, Buscador y Ficha de Voluntario.

2. Dashboard (Panel de Control)
Ofrece una visión panorámica del estado de la fundación.


Cobertura Nacional: Mapa interactivo de Chile que muestra voluntarios activos por región al pasar el cursor.


Métricas: Gráficos de distribución, crecimiento mensual y KPIs (Activos, Permanentes, Campaña, Bajas).



Últimos Inscritos: Lista actualizada en tiempo real.

3. Registro de Voluntarios
Formulario de "Ficha Única de Voluntario" con validación de datos.


Datos: Identificación, Contacto, Perfil (Instituto Teletón), y Salud.




Validación: Verifica campos obligatorios y formato de RUT.

4. Búsqueda Avanzada
Permite localizar voluntarios o analizar grupos.


Filtros: Por Área (Salud, Logística), Estado (Activo/Pendiente) y Región.


Búsqueda Rápida: Por nombre, RUT o email.

5. Pasaporte Digital (Credencial)
Ubicado dentro de la ficha del voluntario.


Gestión: Permite subir una foto de perfil desde el dispositivo.


Imprimir: Genera una vista de impresión limpia (sin botones) de la credencial.


Enviar: Simulación de envío de la credencial por correo electrónico.

⚙️ Desarrollo y Mantenibilidad
Estilos
Se utiliza una estrategia híbrida:


CSS Global: Variables para la paleta institucional (ej. --teleton-red) en index.css.


Estilos en Línea: Objetos JS para estilos encapsulados y dinámicos en componentes.

Extensibilidad

Agregar Campos: Para añadir datos (ej. Grupo Sanguíneo), se debe actualizar el estado inicial en RegistroVoluntario.jsx, la función de validación y la vista en voluntario.jsx.


Backend Real: Para conectar una API, se debe reemplazar el useEffect inicial en App.jsx por una llamada fetch/axios y modificar la función handleRegistroVoluntario para enviar peticiones POST.

© 2025 Botathon Duoc UC & Fundación Teletón
