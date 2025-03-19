import { createRoot } from 'react-dom/client';
import "./styles/index.css";
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { NotificationProvider } from './contexts/NotificationProvider';
import Notify from './components/Notification/Notify';
import { CategoryProvider } from './contexts/CategoryProvider';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter basename="/">
    <CategoryProvider>
      <NotificationProvider>
        <Notify />
        <App />
      </NotificationProvider>
    </CategoryProvider>
  </BrowserRouter>,
);
