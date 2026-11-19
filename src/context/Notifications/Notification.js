import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
} from "react";
import styles from "./Notification.module.css";

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [notification, setNotification] = useState(null);
  const timerRef = useRef(null);

  const showNotification = useCallback((message, type = "success") => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    setNotification({ message, type });

    timerRef.current = setTimeout(() => {
      setNotification(null);
    }, 10000);
  }, []);

  const closeNotification = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setNotification(null);
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {notification && (
        <div
          className={`${styles.notification} ${styles[notification.type]}`}
          role="status"
          aria-live="polite"
        >
          <span>{notification.message}</span>
          <button
            type="button"
            onClick={closeNotification}
            className={styles.closeBtn}
            aria-label="Fechar notificação"
          >
            &times;
          </button>
        </div>
      )}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  return useContext(NotificationContext);
}
