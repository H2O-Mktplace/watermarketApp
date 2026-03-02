import React from 'react';
import { useNotification } from '../context/NotificationContext';

export default function NotificationToast() {
    const { toasts, removeToast } = useNotification();

    if (toasts.length === 0) return null;

    return (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-2 pointer-events-none w-full max-w-sm px-4">
            {toasts.map((toast) => {
                // Neon borders based on type
                const borderColors = {
                    success: 'border-[#39FF14] shadow-[0_0_10px_rgba(57,255,20,0.5)]', // Neon Green
                    error: 'border-[#FF3131] shadow-[0_0_10px_rgba(255,49,49,0.5)]',   // Neon Red
                    info: 'border-[#0EA5E9] shadow-[0_0_10px_rgba(14,165,233,0.5)]',    // Neon Cyan
                };

                const borderClass = borderColors[toast.type] || borderColors.info;

                return (
                    <div
                        key={toast.id}
                        className={`
              pointer-events-auto
              bg-slate-900/95 backdrop-blur-xl 
              border ${borderClass}
              text-white text-sm font-medium
              px-4 py-3 rounded-lg
              flex items-center justify-between
              animate-in slide-in-from-top-4 fade-in duration-300
            `}
                    >
                        <span>{toast.message}</span>
                        <button
                            onClick={() => removeToast(toast.id)}
                            className="ml-4 text-slate-400 hover:text-white transition-colors"
                        >
                            &times;
                        </button>
                    </div>
                );
            })}
        </div>
    );
}
