import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import ErrorFallback from './components/ErrorFallback.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { QRHistoryProvider } from './context/QRHistoryContext.jsx';
import { initSentry, Sentry } from './lib/sentry.js';
import './styles/index.css';

initSentry();
Sentry.captureException(new Error("Sentry Test"));
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Sentry.ErrorBoundary fallback={<ErrorFallback />}>
      <BrowserRouter>
        <ThemeProvider>
          <QRHistoryProvider>
            <App />
          </QRHistoryProvider>
        </ThemeProvider>
      </BrowserRouter>
    </Sentry.ErrorBoundary>
  </StrictMode>
);
