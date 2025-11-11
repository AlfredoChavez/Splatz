import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './main.css';
import App from './App.tsx';
import { HashRouter } from 'react-router';
//* Use HashRouter instead of BrowserRouter (prevents 404s on refresh/direct links)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
);
