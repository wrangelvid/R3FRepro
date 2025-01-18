import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Object3D, Vector3 } from 'three';

Object3D.DEFAULT_UP = new Vector3(0, 0, 1);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
