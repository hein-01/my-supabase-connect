import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Add error boundary for better error handling
class ErrorBoundary extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('App Error:', error, errorInfo);
  }

  render() {
    if ((this.state as any).hasError) {
      return (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          fontFamily: 'system-ui',
          textAlign: 'center'
        }}>
          <div>
            <h1>Something went wrong.</h1>
            <button 
              onClick={() => window.location.reload()}
              style={{ 
                padding: '8px 16px',
                marginTop: '16px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return (this.props as any).children;
  }
}

// Ensure proper error handling for mounting
const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Failed to find the root element");
}

try {
  createRoot(rootElement).render(
    <React.StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </React.StrictMode>
  );
} catch (error) {
  console.error("Failed to render app:", error);
  // Fallback content
  rootElement.innerHTML = `
    <div style="display: flex; justify-content: center; align-items: center; height: 100vh; font-family: system-ui;">
      <div style="text-align: center;">
        <h1>App Loading Error</h1>
        <p>Please refresh the page.</p>
        <button onclick="window.location.reload()" style="padding: 8px 16px; margin-top: 16px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;">
          Reload
        </button>
      </div>
    </div>
  `;
}
