import React, { createContext, useContext, useState, useCallback } from 'react';

const ChatContext = createContext();

export function ChatProvider({ children }) {
    const [isChatSidebarOpen, setIsChatSidebarOpen] = useState(false);

    // Mock data for chats
    const [chats, setChats] = useState([
        {
            id: '1',
            senderName: 'Mario Rossi',
            senderAvatar: 'MR',
            lastMessage: 'Ciao, è ancora disponibile la tavola?',
            itemImage: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&q=80&w=200',
            unread: true,
            timestamp: new Date(Date.now() - 1000 * 60 * 5) // 5 mins ago
        },
        {
            id: '2',
            senderName: 'Luigi Verdi',
            senderAvatar: 'LV',
            lastMessage: 'Posso offrirti 200€ se riesci a spedire.',
            itemImage: 'https://images.unsplash.com/photo-1596541656890-4e5907edff2b?auto=format&fit=crop&q=80&w=200',
            unread: true,
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2) // 2 hours ago
        },
        {
            id: '3',
            senderName: 'Giulia Bianchi',
            senderAvatar: 'GB',
            lastMessage: 'Perfetto, ci vediamo domani per lo scambio.',
            itemImage: 'https://images.unsplash.com/photo-1616089334547-495ae69ce008?auto=format&fit=crop&q=80&w=200',
            unread: false,
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24) // 1 day ago
        }
    ]);

    const markAllAsRead = useCallback(() => {
        setChats(prev => prev.map(chat => ({ ...chat, unread: false })));
    }, []);

    const markAsRead = useCallback((id) => {
        setChats(prev => prev.map(chat => chat.id === id ? { ...chat, unread: false } : chat));
    }, []);

    const totalUnreadChats = chats.filter(chat => chat.unread).length;

    return (
        <ChatContext.Provider
            value={{
                isChatSidebarOpen,
                setIsChatSidebarOpen,
                chats,
                totalUnreadChats,
                markAllAsRead,
                markAsRead
            }}
        >
            {children}
        </ChatContext.Provider>
    );
}

export function useChat() {
    const context = useContext(ChatContext);
    if (context === undefined) {
        throw new Error('useChat must be used within a ChatProvider');
    }
    return context;
}
