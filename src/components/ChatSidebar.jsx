import React, { useEffect } from 'react';
import { X, MessageSquare, ChevronRight } from 'lucide-react';
import { useChat } from '../context/ChatContext';
import { useNavigate } from 'react-router-dom';

export default function ChatSidebar() {
    const { isChatSidebarOpen, setIsChatSidebarOpen, chats, markAsRead } = useChat();
    const navigate = useNavigate();

    // Prevent background scrolling when sidebar is open
    useEffect(() => {
        if (isChatSidebarOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isChatSidebarOpen]);

    const handleChatClick = (chatId) => {
        markAsRead(chatId);
        // Future: navigate to individual chat page
        // navigate(`/messages/${chatId}`);
        setIsChatSidebarOpen(false);
    };

    if (!isChatSidebarOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex justify-end">
            {/* Dark Overlay with subtle blur */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={() => setIsChatSidebarOpen(false)}
            ></div>

            {/* Sidebar Content (Drawer from Right) */}
            {/* 
        Width: 90% on mobile, max 400px (approx 30-35% on desktop).
        Dark background with Glassmorphism, Neon left border.
      */}
            <div
                className="
          relative h-full w-[90%] md:w-[35%] max-w-[400px]
          bg-[#0B1121]/70 backdrop-blur-[15px]
          border-l border-white/20 shadow-[-5px_0_30px_rgba(0,0,0,0.5)]
          flex flex-col
          animate-in slide-in-from-right duration-300
        "
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 pb-8 border-b border-white/10">
                    <div className="flex items-center gap-3">
                        <MessageSquare className="text-[#0EA5E9]" size={28} />
                        <h2 className="text-2xl font-extrabold text-white tracking-wide">I tuoi Messaggi</h2>
                    </div>
                    <button
                        onClick={() => setIsChatSidebarOpen(false)}
                        className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Chat List */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
                    {chats.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-slate-400 p-6 text-center">
                            <MessageSquare size={48} className="mb-4 opacity-20" />
                            <p>Non hai ancora messaggi attivi.</p>
                            <p className="text-sm mt-2 opacity-60">I tuoi messaggi appariranno qui.</p>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {chats.map((chat) => (
                                <div
                                    key={chat.id}
                                    onClick={() => handleChatClick(chat.id)}
                                    className={`
                    relative flex items-center gap-4 p-4 rounded-2xl cursor-pointer
                    transition-all duration-300
                    hover:bg-white/[0.08] group
                    ${chat.unread ? 'bg-white/[0.04] border border-[#0EA5E9]/20' : 'border border-transparent hover:border-white/10'}
                  `}
                                >
                                    {/* Sender Avatar */}
                                    <div className="relative flex-shrink-0">
                                        <div className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-white border border-white/20 ${chat.unread ? 'bg-[#0EA5E9]' : 'bg-slate-700'} `}>
                                            {chat.senderAvatar}
                                        </div>
                                    </div>

                                    {/* Message Info */}
                                    <div className="flex-1 min-w-0 pr-2">
                                        <div className="flex justify-between items-center mb-1">
                                            <h3 className="font-extrabold text-white truncate text-[15px]">
                                                {chat.senderName}
                                            </h3>
                                            <div className="flex items-center gap-1.5 flex-shrink-0 ml-2">
                                                {chat.unread && (
                                                    <span className="h-2 w-2 rounded-full bg-[#0EA5E9]"></span>
                                                )}
                                                <span className="text-[11px] text-slate-400 font-medium">
                                                    {chat.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                            </div>
                                        </div>
                                        <p className={`text-sm truncate ${chat.unread ? 'text-blue-100/90 font-medium' : 'text-slate-400'}`}>
                                            {chat.lastMessage}
                                        </p>
                                    </div>

                                    {/* Thumbnail */}
                                    <div className="flex-shrink-0 ml-2">
                                        <img
                                            src={chat.itemImage}
                                            alt="Oggetto"
                                            className="w-12 h-12 rounded-xl object-cover border border-white/10 group-hover:border-white/30 transition-colors"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
