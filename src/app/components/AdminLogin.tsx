import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Lock } from 'lucide-react';

interface AdminLoginProps {
  onLogin: () => void;
}

// Admin password - KEEP THIS SECURE AND PRIVATE
// To change: update this password, rebuild, and redeploy
const ADMIN_PASSWORD = 'OrV!ll3#Est@te$C0ll3ct!0n2026&Secure';

export function AdminLogin({ onLogin }: AdminLoginProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (password === ADMIN_PASSWORD) {
      // Save admin session
      sessionStorage.setItem('admin-authenticated', 'true');
      setError('');
      onLogin();
    } else {
      setError('Incorrect password');
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <Lock className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Admin Login</h2>
          <p className="text-gray-600">Enter your password to manage the catalog</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full"
              autoFocus
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <Button type="submit" className="w-full">
            Login as Admin
          </Button>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            Authorized personnel only
          </p>
          <p className="text-xs text-gray-400 text-center mt-2">
            Access to this area is restricted and monitored
          </p>
        </div>
      </div>
    </div>
  );
}
