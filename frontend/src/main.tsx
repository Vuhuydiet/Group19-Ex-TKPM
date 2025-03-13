import { createRoot } from 'react-dom/client';
import "./styles/index.css";
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { NotificationProvider } from './contexts/NotificationProvider';
import Notify from './components/Notification/Notify';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter basename="/">
    <NotificationProvider>
      <Notify />
      <App />
    </NotificationProvider>
  </BrowserRouter>,
);
