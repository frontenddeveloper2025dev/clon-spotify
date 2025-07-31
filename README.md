🎧 Clon de Spotify con React.js
Este proyecto es un reproductor de música tipo Spotify creado con React.js. Permite listar canciones desde una API, reproducirlas, navegar entre pistas y controlar la reproducción desde una única etiqueta <audio>. Ideal para practicar manejo de APIs, useRef, y lógica de reproducción de audio en React.

🌐 Demo en vivo
🔗 clon-spotify.vercel.app

🔗 clon-spotifybootcamp.netlify.app

📁 Repositorio en GitHub

📸 Vista previa


✅ Funcionalidades principales
🔁 Carga de canciones desde API Sounds con fetch().

▶️ Reproducción inmediata al hacer clic en una canción.

⏭️ Botón Siguiente: avanza a la siguiente canción. Si está al final, vuelve al inicio.

⏮️ Botón Anterior: retrocede una canción. Si está al inicio, va a la última.

🔊 Una sola etiqueta <audio> en todo el proyecto, controlada con ref.

🔂 Cambio dinámico del src de audio para cada pista.

💚 Estilo inspirado en Spotify, con colores oscuros y diseño responsivo.

🛠️ Tecnologías utilizadas
⚛️ React 18 + Hooks

🎧 Etiqueta <audio> controlada con useRef

📡 Fetch API

🎨 CSS personalizado

⚡ Vite para desarrollo y build

🚀 Instalación local
bash
Copiar
Editar
git clone https://github.com/alejandrabarcena/clon-spotify.git
cd clon-spotify
npm install
npm run dev
