# 🎧 Clon de Spotify con React.js

Este proyecto es un reproductor de música estilo Spotify desarrollado con **React.js**. Permite listar canciones desde una API, reproducirlas, navegar entre pistas y controlar todo desde una única etiqueta `<audio>`.

Ideal para practicar:

- Manejo de APIs (`fetch`)
- Control de elementos con `useRef`
- Cambios dinámicos en el DOM
- Lógica de reproducción de audio en React

---

## 🌐 Demo en vivo

🔗 [clon-spotify.vercel.app](https://clon-spotify.vercel.app)  
🔗 [clon-spotifybootcamp.netlify.app](https://clon-spotifybootcamp.netlify.app)

---

## 📁 Repositorio en GitHub

🔗 [github.com/alejandrabarcena/clon-spotify](https://github.com/alejandrabarcena/clon-spotify)

---

## 📸 Vista previa

![Vista previa del proyecto](https://github.com/alejandrabarcena/clon-spotify/blob/main/clon-spotify%20vistaprevia.png?raw=true)

---

## ✅ Funcionalidades principales

- 🔁 **Carga dinámica de canciones** desde la API Sounds con `fetch()`
- ▶️ **Reproducción inmediata** al hacer clic en una canción
- ⏭️ **Botón "Siguiente"**: avanza a la siguiente canción, vuelve al inicio si es la última
- ⏮️ **Botón "Anterior"**: retrocede a la anterior, vuelve a la última si está en la primera
- 🔊 **Una sola etiqueta `<audio>`**, controlada mediante `useRef`
- 🔂 **Cambio dinámico del `src`** para cada pista
- 💚 **Estilo oscuro responsivo** inspirado en Spotify

---

## 🛠️ Tecnologías utilizadas

- ⚛️ React 18 con Hooks
- 🎧 HTML5 Audio API + `useRef`
- 📡 Fetch API
- 🎨 CSS personalizado
- ⚡ Vite para desarrollo y build
- 🧩 *TypeScript (archivos de configuración solamente)*

---

## 📘 ¿Por qué aparece TypeScript si el código está en JavaScript?

Aunque la lógica del proyecto fue desarrollada en **JavaScript puro**, el entorno fue creado con **Vite + React**, que incluye por defecto archivos `.ts`, como:

- `vite.config.ts`
- `tsconfig.json`
- `tsconfig.node.json`
GitHub detecta estos archivos como TypeScript, por lo que muestra un alto porcentaje de uso. Sin embargo:

> ✅ *No se usaron archivos `.tsx` ni tipado estático, pero la estructura queda lista para migrar a TypeScript si se desea en el futuro.*

---

## 🚀 Instalación local

```bash
git clone https://github.com/alejandrabarcena/clon-spotify.git
cd clon-spotify
npm install
npm run dev
