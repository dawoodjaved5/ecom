import React, { useState, useEffect } from "react";
import { useAdmin } from "@/contexts/AdminContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { account } from '@/lib/appwrite';

const AdminLogin = () => {
  const { login } = useAdmin();
  const [email, setEmail] = useState('dawoodjaved54@gmail.com');
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);

  // Check for existing session on component mount
  useEffect(() => {
    const checkExistingSession = async () => {
      try {
        const session = await account.get();
        if (session) {
          // User already has an active session, log them in directly
          const success = login('', true);
          if (success) {
            toast.success('Welcome back! Using existing session.');
          }
        }
      } catch (error) {
        // No active session, continue with normal login flow
  
      } finally {
        setCheckingSession(false);
      }
    };

    checkExistingSession();
  }, [login]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); 
    try {
      // First, try to delete any existing session
      try {
        await account.deleteSession('current');
      } catch (error) {
        // No existing session to delete, that's fine
      }

      // Now create a new session
      await account.createEmailPasswordSession(email, password);
      const success = login(password, true);
      if (success) {
        toast.success('Login successful!');
      } else {
        toast.error('Login failed!');
        setPassword('');
      }
    } catch (err: any) {
      toast.error('Login failed: ' + (err.message || err.toString()));
      setPassword('');
    }
    setIsLoading(false);
  };

  const handleUseExistingSession = async () => {
    setIsLoading(true);
    try {
      const session = await account.get();
      if (session) {
        const success = login('', true);
        if (success) {
          toast.success('Using existing session!');
        }
      }
    } catch (error) {
      toast.error('No valid session found');
    }
    setIsLoading(false);
  };

  const handleClearSession = async () => {
    setIsLoading(true);
    try {
      await account.deleteSession('current');
      toast.success('Session cleared! You can now login normally.');
    } catch (error) {
      toast.error('Failed to clear session');
    }
    setIsLoading(false);
  };

  if (checkingSession) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 flex items-center justify-center p-4">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Checking existing session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Access</h1>
            <p className="text-gray-600">Enter your password to access the admin dashboard</p>
          </div>

          {/* Session Management Buttons */}
          <div className="mb-6 space-y-3">
            <Button
              onClick={handleUseExistingSession}
              className="w-full bg-green-600 hover:bg-green-700"
              disabled={isLoading}
            >
              Use Existing Session
            </Button>
            <Button
              onClick={handleClearSession}
              variant="outline"
              className="w-full"
              disabled={isLoading}
            >
              Clear Session & Login Fresh
            </Button>
          </div>

          <div className="relative mb-6">
            <hr className="border-gray-300" />
            <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-sm text-gray-500">
              OR
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter admin email"
                className="pr-10"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-lg py-3"
              disabled={isLoading}
            >
              {isLoading ? "Authenticating..." : "Login"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              This is a protected admin area. Unauthorized access is prohibited.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin; 