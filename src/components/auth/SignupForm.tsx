'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuthStore } from '@/lib/store';
import type { SignupRequest } from '@/types';

const signupSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SignupFormData = z.infer<typeof signupSchema>;

interface SignupFormProps {
  onSuccess?: () => void;
  onSwitchToLogin?: () => void;
}

export const SignupForm: React.FC<SignupFormProps> = ({
  onSuccess,
  onSwitchToLogin,
}) => {
  const [error, setError] = useState<string>('');
  const { setLoading, isLoading } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
    try {
      setError('');
      setLoading(true);
      
      const signupData: SignupRequest = {
        email: data.email,
        password: data.password,
      };

      // TODO: Replace with actual API call
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signupData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Signup failed');
      }

      const result = await response.json();
      
      // Update auth store
      useAuthStore.getState().setAuth(
        result.data.user,
        result.data.accessToken,
        result.data.refreshToken
      );

      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="text-center space-y-2">
        <div className="mx-auto h-16 w-16 rounded-full bg-green-500/10 backdrop-blur flex items-center justify-center border border-green-400/30 mb-4">
          <div className="h-8 w-8 rounded-full bg-green-400/20 backdrop-blur flex items-center justify-center">
            <div className="h-3 w-3 rounded-full bg-green-400"></div>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-white">Create Account</h2>
        <p className="text-gray-300 text-sm">
          Join Principle to start deconstructing knowledge
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-gray-200 font-medium">Email</Label>
          <Input
            id="email"
            {...register('email')}
            type="email"
            placeholder="Enter your email"
            className="bg-black/30 backdrop-blur border-green-400/30 text-white placeholder:text-gray-400 focus:border-green-400/60 focus:ring-green-400/20 transition-all duration-300 hover:border-green-400/50"
          />
          {errors.email && (
            <p className="text-sm text-red-400">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-gray-200 font-medium">Password</Label>
          <Input
            id="password"
            {...register('password')}
            type="password"
            placeholder="Create a strong password"
            className="bg-black/30 backdrop-blur border-green-400/30 text-white placeholder:text-gray-400 focus:border-green-400/60 focus:ring-green-400/20 transition-all duration-300 hover:border-green-400/50"
          />
          <p className="text-xs text-gray-400">
            Must contain uppercase, lowercase, and number
          </p>
          {errors.password && (
            <p className="text-sm text-red-400">{errors.password.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-gray-200 font-medium">Confirm Password</Label>
          <Input
            id="confirmPassword"
            {...register('confirmPassword')}
            type="password"
            placeholder="Confirm your password"
            className="bg-black/30 backdrop-blur border-green-400/30 text-white placeholder:text-gray-400 focus:border-green-400/60 focus:ring-green-400/20 transition-all duration-300 hover:border-green-400/50"
          />
          {errors.confirmPassword && (
            <p className="text-sm text-red-400">{errors.confirmPassword.message}</p>
          )}
        </div>

        {error && (
          <div className="rounded-lg bg-red-500/10 border border-red-400/30 p-3 text-sm text-red-300 backdrop-blur shadow-lg">
            {error}
          </div>
        )}

        <Button
          type="submit"
          className="w-full bg-green-500/20 hover:bg-green-500/30 text-green-300 border border-green-400/50 backdrop-blur font-semibold hover:text-green-200 hover:border-green-400/70 transition-all duration-300 shadow-lg hover:shadow-green-500/20 transform hover:scale-[1.02]"
          disabled={isLoading}
        >
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </Button>
      </form>

      <div className="text-center text-sm">
        <span className="text-gray-400">
          Already have an account?{' '}
        </span>
        <button
          onClick={onSwitchToLogin}
          className="font-medium text-green-400 hover:text-green-300 hover:underline transition-colors"
        >
          Sign in
        </button>
      </div>
    </div>
  );
};