
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function SignUp({ onSwitchToLogin }) {
    const { signUp } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const { error } = await signUp({ email, password });
        if (error) {
            console.error("SignUp Error:", error);
            setError(error.message || JSON.stringify(error) || "Errore sconosciuto durante la registrazione.");
        } else {
            setSuccess(true);
        }
        setLoading(false);
    };

    if (success) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
                <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl text-center">
                    <h2 className="text-2xl font-bold text-slate-800 mb-4">Controlla la tua email</h2>
                    <p className="text-slate-600 mb-6">
                        Ti abbiamo inviato un link di conferma a <span className="font-bold">{email}</span>.
                    </p>
                    <button onClick={onSwitchToLogin} className="text-[#0EA5E9] font-bold hover:underline">
                        Torna al Login
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl flex flex-col items-center">
                <img src={logo} alt="WaterMarket" className="h-16 w-auto mb-6 bg-slate-900 rounded-xl p-2" />
                <h2 className="text-3xl font-bold text-center mb-6 text-gradient-light">Registrati</h2>

                {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm font-medium">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Email</label>
                        <input
                            type="email"
                            required
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Password</label>
                        <input
                            type="password"
                            required
                            minLength={6}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#0F172A] text-white font-bold py-3 rounded-lg hover:bg-slate-800 transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Registrazione in corso...' : 'Crea Account'}
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-slate-600">
                    Hai già un account?{' '}
                    <button onClick={onSwitchToLogin} className="text-[#0EA5E9] font-bold hover:underline">
                        Accedi
                    </button>
                </div>

                {/* DEBUG INFO - Temp */}
                <div className="mt-8 p-4 bg-black/5 rounded text-xs text-left font-mono text-gray-500 break-all border border-red-200">
                    <p className="mb-2 font-bold text-red-500">DEBUG INFO (Mandami uno screenshot):</p>
                    <p>URL: {import.meta.env.VITE_SUPABASE_URL || 'MANCANTE'}</p>
                    <p>KEY: {import.meta.env.VITE_SUPABASE_ANON_KEY ? import.meta.env.VITE_SUPABASE_ANON_KEY.substring(0, 15) + '...' : 'MANCANTE'}</p>
                </div>
            </div>
        </div>
    );
}
