import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// ============================================================
// AOS IMPORTS - Add these two lines
// ============================================================
import AOS from 'aos';
import 'aos/dist/aos.css';

// Initialize AOS
AOS.init({
  duration: 800,           // Animation duration in ms
  once: true,              // Animation only happens once
  offset: 50,              // Offset from element before animation starts
  easing: 'ease-in-out',   // Easing function
  // You can add more options here
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
