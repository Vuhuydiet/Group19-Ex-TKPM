import { createContext, useState, useContext, PropsWithChildren } from 'react';

type NotificationContextType = {
    notification: { type: string; msg: string } | null;
    notify: ({ type, msg }: { type: string; msg: string }) => void;
    setNotification: (notification: { type: string; msg: string } | null) => void;
};
type NotificationProviderProps = PropsWithChildren;
type NotificationState = { type: string; msg: string } | null;

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: NotificationProviderProps) => {
    const [notification, setNotification] = useState<NotificationState>(null);

    const notify = ({ type, msg }: { type: string, msg: string }) => {
        if (notification !== null) return;

        setNotification({ type, msg });
        setTimeout(() => setNotification(null), 3500);
    };


    return (
        <NotificationContext.Provider value={{ notification, notify, setNotification }}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error("useNotification must be used within a NotificationProvider");
    }
    return context;
};
