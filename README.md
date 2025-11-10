# 🫟 Splatz

![alt text](https://github.com/AlfredoChavez/Splatz/raw/main/resources/Splatz_Logo.png)

**Interactive Gaussian Splats in React**

## Overview

**Splatz** makes **3D Gaussian Splats** easy and accessible to everyone.
Upload your splats, captured from your phone, scanner, or other sources, and **explore them interactively right in your browser**.

Built with **React**, **Three.js**, and **React Three Fiber**, Splatz offers a lightweight way to **embed interactive 3D scenes** into any React app or website.

## Features

- **Upload & View Splats:** Instantly load `.ply` or compatible Gaussian Splat files in the browser.
- **Interactive 3D Navigation:** Pan, zoom, and rotate your splats with smooth rendering.
- **Embed Anywhere:** Easily embed the 3D Splat viewer in any React project.
- **Powered by Sparkjs.dev & React Three Fiber:** Declarative, fast, and extensible.

## Tech Stack

- ⚛️ React
- 🎲 Three.js
- 🧩 React Three Fiber (Three.js for React)
- 💥 Sparkjs.dev for Gaussian Splat loading & utilities
- 🎨 Tailwind CSS, Shadcn UI and React Bits for styling

## Installation & First Steps

### 1. Clone the repository

```bash
git clone https://github.com/AlfredoChavez/Splatz.git
cd Splatz
```

### 2. Install dependencies

Make sure you have [Node.js](https://nodejs.org/) and npm installed.
Then run:

```bash
npm install
```

This will install the necessary dependencies.

### 3. Start the development server

```bash
npm run dev
```

Open your browser and navigate to the address shown in the console (e.g., `http://localhost:5173`) to view the project.

### 4. Explore the project

* The source code is located under `src/`.
* Since this uses TypeScript, you’ll find `.ts` / `.tsx` files.
* To test changes: modify components, save, and Vite’s hot‑reload will update the browser.
* To view how the Gaussian splats upload/viewer works, check the relevant components under the `client` folder.
* For styling the UI, the project uses Tailwind CSS, Shadcn UI and ReactBits.

### 5. Build for production

```bash
npm run build
```

This bundles the app for production.

## Linting & Code Style

This project uses ESLint for linting and code‑style enforcement.