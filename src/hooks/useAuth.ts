import { useState, useCallback } from 'react';
import { User, AuthState } from '../types/user';
import { sampleUsers, sampleCredentials } from '../data/sampleData';

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: false
  });

  const login = useCallback(async (email: string, password: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    try {
      // Find matching credentials
      const matchingCredential = Object.values(sampleCredentials).find(
        cred => cred.email.toLowerCase() === email.toLowerCase() && 
               cred.password === password
      );

      if (!matchingCredential) {
        throw new Error('Invalid credentials');
      }

      // Find matching user
      const matchingUser = sampleUsers.find(
        user => user.email.toLowerCase() === email.toLowerCase()
      );

      if (!matchingUser) {
        throw new Error('User not found');
      }

      setAuthState({
        user: matchingUser,
        isAuthenticated: true,
        isLoading: false
      });

      return true;
    } catch (error) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      return false;
    }
  }, []);

  const signup = useCallback(async (
    email: string,
    password: string,
    name: string,
    role: 'attendee' | 'organizer' | 'admin',
    organizationName?: string
  ) => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    try {
      // Check if email already exists
      const existingUser = sampleUsers.find(
        user => user.email.toLowerCase() === email.toLowerCase()
      );

      if (existingUser) {
        throw new Error('Email already exists');
      }

      const newUser: User = {
        id: `user${Date.now()}`,
        email,
        name,
        role,
        organizationName,
        createdAt: new Date()
      };

      setAuthState({
        user: newUser,
        isAuthenticated: true,
        isLoading: false
      });

      return true;
    } catch (error) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false
    });
  }, []);

  return {
    ...authState,
    login,
    signup,
    logout
  };
}