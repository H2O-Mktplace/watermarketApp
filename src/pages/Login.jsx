
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo_wm_transparent.png';

export default function Login({ onSwitchToSignup }) {
    const { signIn } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const { error } = await signIn({ email, password });
        if (error) {
            setError(error.message);
        } else {
            // Success - Redirect handled by auth state change
        }
        setLoading(false);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl flex flex-col items-center">
                <img src={logo} alt="WaterMarket" className="h-16 w-auto mb-6 bg-slate-900 rounded-xl p-2" />
                <h2 className="text-3xl font-bold text-center mb-6 text-gradient-light">Accedi</h2>

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
                        {loading ? 'Accesso in corso...' : 'Accedi'}
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-slate-600">
                    Non hai un account?{' '}
                    <button onClick={onSwitchToSignup} className="text-[#0EA5E9] font-bold hover:underline">
                        Registrati
                    </button>
                </div>
            </div>
        </div>
    );
}
