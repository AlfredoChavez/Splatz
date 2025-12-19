# 🫟 Splatz

![alt text](https://github.com/AlfredoChavez/Splatz/raw/main/client/src/assets/Splatz_Logo.png)

**Interactive Gaussian Splats in React**

## Overview

**Splatz** makes **3D Gaussian Splats** easy and accessible to everyone.
Upload your splats, captured from your phone, scanner, or other sources, and **explore them interactively right in your browser**.

Built with **React**, **Three.js**, and **React Three Fiber**, Splatz offers a lightweight way to **embed interactive 3D scenes** into any React app or website.

## Features

- **Touch Controls:** Added touch controls for mobile devices.
- **Embed Anywhere:** Easily embed the 3D Splat viewer in any React project.
- **Powered by Sparkjs.dev & React Three Fiber:** Declarative, fast, and extensible.
- **Interactive 3D Navigation:** Pan, zoom, and rotate your splats with smooth rendering.
- **Upload & View Splats:** Instantly load `.ply, .sogs, .spz, .splat, .ksplat` or compatible Gaussian Splat files in the browser.

## Tech Stack

- ⚛️ React
- 🎲 Three.js
- 🧩 React Three Fiber (Three.js for React)
- 💥 Sparkjs.dev for Gaussian Splat loading & utilities
- 🎨 Tailwind CSS, Shadcn UI and React Bits for styling

## Project Structure

The Splatz project is organized as follows:

```bash
Splatz/
├── client/
│   ├── public/
│   │   └── favicon
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/
│   │   │   ├── FileUpload
│   │   │   ├── SparkComponent
│   │   │   ├── SplashScreen
│   │   │   └── SplatScene_Reveal
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── eslint.config
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
├── resources/
├── LICENSE
└── README.md
```

This structure highlights the client-side application (built with TypeScript and Vite), organized into key directories for components, configuration, and static assets, along with additional resources and documentation at the project root.

## Linting & Code Style

This project uses ESLint for linting and code‑style enforcement.

## Installation & First Steps

### 1. Clone the repository 🧬

```bash
git clone https://github.com/AlfredoChavez/Splatz.git
cd Splatz
```

### 2. Install dependencies 🧱

Make sure you have [Node.js](https://nodejs.org/) and npm installed.
Then run:

```bash
npm install
```

This will install the necessary dependencies.

### 3. Start the development server 💻

```bash
npm run dev
```

Open your browser and navigate to the address shown in the console (e.g., `http://localhost:5173`) to view the project.

### 4. Explore the project 🧭

- The source code is located under `src/`.
- Since this uses TypeScript, you’ll find `.ts` / `.tsx` files.
- To test changes: modify components, save, and Vite’s hot‑reload will update the browser.
- To view how the Gaussian splats upload/viewer works, check the relevant components under the `client` folder.
- For styling the UI, the project uses Tailwind CSS, Shadcn UI and ReactBits.

### 5. Build for production 🏗️

```bash
npm run build
```

This bundles the app for production.

## 🙏 Acknowledgments

Special thanks to:
- The open-source community
- Libraries and frameworks that power this project

## 🚀 Splatz Live: [View on GitHub Pages](https://alfredochavez.github.io/Splatz/)
Looking for a quick model to play with Splatz? Get it below:

✌️ [Sample Model](https://github.com/AlfredoChavez/Splatz/raw/main/client/sample/Wax_Hand.ply)

##

Thanks for checking out **Splatz**!

If you find it useful, consider giving it a ⭐ on GitHub, it helps more people discover the project.
