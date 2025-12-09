import React, { useState } from 'react';

interface Props {
  onLogin: (email: string) => void;
}

const Login: React.FC<Props> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setIsLoading(true);
    // Simulate network delay for realism
    setTimeout(() => {
      onLogin(email);
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-agri-50 to-green-100 dark:from-dark-bg dark:to-dark-card p-4 transition-colors duration-200">
      <div className="bg-white dark:bg-dark-card w-full max-w-md p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-dark-border animate-fade-in">
        <div className="text-center mb-8">
           <div className="bg-agri-100 dark:bg-agri-900/30 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-agri-600 dark:text-agri-400 transform rotate-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.77 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>
           </div>
           <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">AGAPAi</h1>
           <p className="text-gray-500 dark:text-gray-400 mt-2">Smart Farming Dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-agri-500 focus:border-transparent outline-none transition-all text-gray-900 dark:text-white"
              placeholder="farmer@agrasmart.ph"
              required
            />
          </div>

          <div>
             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-agri-500 focus:border-transparent outline-none transition-all text-gray-900 dark:text-white"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-agri-600 hover:bg-agri-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                 <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                 Signing in...
              </>
            ) : (
              "Sign In to Dashboard"
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800 text-center">
           <p className="text-xs text-gray-400">
             Protected by AGAPAi Security Systems • v1.0.0
           </p>
        </div>
      </div>
    </div>
  );
};

export default Login;