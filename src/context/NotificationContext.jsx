import React, { createContext, useContext, useState, useCallback } from 'react';

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
    const [notifications, setNotifications] = useState([]);
    const [toasts, setToasts] = useState([]);

    // Add a persistent notification (e.g. for the dropdown)
    const addNotification = useCallback((notification) => {
        const id = Date.now().toString() + Math.random().toString(36).substring(2, 9);
        setNotifications((prev) => [
            { id, ...notification, read: false, createdAt: new Date() },
            ...prev,
        ]);
    }, []);

    // Mark a specific notification as read
    const markAsRead = useCallback((id) => {
        setNotifications((prev) =>
            prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
        );
    }, []);

    // Mark all notifications as read
    const markAllAsRead = useCallback(() => {
        setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })));
    }, []);

    // Remove a toast
    const removeToast = useCallback((id) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, []);

    // Add a temporary toast banner
    // type can be 'success' (Neon Green) or 'error' (Neon Red) or 'info'
    const addToast = useCallback((message, type = 'success', duration = 3000) => {
        const id = Date.now().toString() + Math.random().toString(36).substring(2, 9);
        setToasts((prev) => [...prev, { id, message, type }]);

        if (duration > 0) {
            setTimeout(() => {
                removeToast(id);
            }, duration);
        }
    }, [removeToast]);

    const unreadCount = notifications.filter((n) => !n.read).length;

    return (
        <NotificationContext.Provider
            value={{
                notifications,
                addNotification,
                markAsRead,
                markAllAsRead,
                unreadCount,
                toasts,
                addToast,
                removeToast,
            }}
        >
            {children}
        </NotificationContext.Provider>
    );
}

export function useNotification() {
    const context = useContext(NotificationContext);
    if (context === undefined) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
}
