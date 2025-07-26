'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Lightbulb, Brain, Users, Sparkles, ArrowRight, Code2, Zap, Target, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AuthModal } from '@/components/auth';
import { useAuthStore } from '@/lib/store';
import FaultyTerminal from '@/components/ui/FaultyTerminal';

// Custom hook for scroll animations
const useScrollAnimation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return [ref, isVisible] as const;
};

export default function Home() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');
  const { isAuthenticated, user } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  // Animation refs
  const [heroRef, heroVisible] = useScrollAnimation();
  const [featuresRef, featuresVisible] = useScrollAnimation();
  const [canvasRef, canvasVisible] = useScrollAnimation();
  const [ctaRef, ctaVisible] = useScrollAnimation();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleGetStarted = () => {
    if (isAuthenticated) {
      // Redirect to dashboard
      window.location.href = '/dashboard';
    } else {
      setAuthMode('signup');
      setShowAuthModal(true);
    }
  };

  const handleSignIn = () => {
    setAuthMode('login');
    setShowAuthModal(true);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background FaultyTerminal */}
      <div className="fixed inset-0 w-full h-full z-0">
        <FaultyTerminal
          scale={1.5}
          gridMul={[2, 1]}
          digitSize={1.2}
          timeScale={1}
          pause={false}
          scanlineIntensity={0.3}
          glitchAmount={1}
          flickerAmount={0.8}
          noiseAmp={1}
          chromaticAberration={0}
          dither={0}
          curvature={0}
          tint="#00ff00"
          mouseReact={true}
          mouseStrength={0.5}
          pageLoadAnimation={true}
          brightness={0.3}
        />
      </div>
      
      {/* Header - Floating Transparent */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/20 backdrop-blur-md">
        <div className="container mx-auto flex h-20 items-center justify-between px-8 max-w-7xl">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 backdrop-blur border border-white/20">
              <Brain className="h-6 w-6 text-green-400" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-white drop-shadow-lg">Principle</span>
          </div>
          
          <div className="flex items-center gap-6">
            {isAuthenticated ? (
              <div className="flex items-center gap-6">
                <span className="text-sm text-white/80 font-medium bg-white/10 backdrop-blur px-4 py-2 rounded-full border border-white/20">
                  {user?.email}
                </span>
                <Button
                  onClick={() => window.location.href = '/dashboard'}
                  size="lg"
                  className="rounded-full bg-green-500/20 hover:bg-green-500/30 text-green-100 border border-green-400/30 backdrop-blur px-8 py-3 font-semibold shadow-lg hover:shadow-green-500/20 transition-all duration-200"
                >
                  Dashboard
                </Button>
              </div>
            ) : (
              <>
                <Button
                  onClick={handleSignIn}
                  variant="ghost"
                  size="lg"
                  className="rounded-full font-semibold text-white/80 hover:text-green-300 hover:bg-white/10 backdrop-blur px-6 py-3 border border-white/20"
                >
                  Sign In
                </Button>
                <Button
                  onClick={handleGetStarted}
                  size="lg"
                  className="rounded-full bg-green-500/20 hover:bg-green-500/30 text-green-100 border border-green-400/30 backdrop-blur px-8 py-3 font-semibold shadow-lg hover:shadow-green-500/20 transition-all duration-200"
                >
                  Get Started
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-20">
        <section className="container mx-auto px-8 py-32 max-w-7xl mt-20">
          <div className="mx-auto max-w-6xl">
            {/* Hero Content */}
            <div 
              ref={heroRef}
              className={`text-center mb-24 transition-all duration-1000 ease-out ${
                mounted || heroVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-12'
              }`}
            >
              <div className={`mb-10 inline-flex items-center gap-3 rounded-full border border-green-400/30 bg-black/20 backdrop-blur px-8 py-4 text-base font-semibold text-green-300 shadow-lg transition-all duration-700 ease-out ${
                mounted || heroVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}>
                <Sparkles className="h-5 w-5" />
                AI-Powered Learning Platform
              </div>
              
              <h1 className={`mb-12 text-6xl font-bold tracking-tight lg:text-8xl text-white leading-tight drop-shadow-2xl transition-all duration-1000 ease-out delay-200 ${
                mounted || heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                The Deconstruction
                <br />
                <span className="bg-gradient-to-r from-green-400 via-green-300 to-green-500 bg-clip-text text-transparent">
                  Canvas
                </span>
              </h1>
              
              <p className={`mb-16 text-2xl text-gray-300 lg:text-3xl leading-relaxed max-w-4xl mx-auto font-light drop-shadow-lg transition-all duration-1000 ease-out delay-400 ${
                mounted || heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                Transform complex topics into visual, interactive knowledge maps.
                <br />
                Learn deeper through AI-powered deconstruction.
              </p>

              <div className={`flex flex-col items-center gap-6 sm:flex-row sm:justify-center mb-20 transition-all duration-1000 ease-out delay-600 ${
                mounted || heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                <Button
                  onClick={handleGetStarted}
                  size="lg"
                  className="w-full sm:w-auto h-16 px-12 rounded-full font-bold text-lg bg-green-500/20 hover:bg-green-500/30 text-green-100 border border-green-400/30 backdrop-blur shadow-2xl hover:shadow-green-500/20 transition-all duration-300 transform hover:scale-105"
                >
                  Start Learning
                  <ArrowRight className="ml-3 h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto h-16 px-12 rounded-full font-bold text-lg border border-white/30 text-white/80 hover:bg-white/10 hover:border-green-400/30 hover:text-green-300 backdrop-blur transition-all duration-300"
                  onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Learn More
                </Button>
              </div>
            </div>

            {/* Symmetric Feature Grid */}
            <div 
              ref={featuresRef}
              id="features" 
              className={`grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24 transition-all duration-1000 ease-out ${
                featuresVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-12'
              }`}
            >
              <Card className={`border border-green-400/20 bg-black/20 backdrop-blur hover:bg-black/30 shadow-lg hover:shadow-green-500/20 transition-all duration-500 text-center group hover:border-green-400/40 transform hover:scale-105 ${
                featuresVisible ? 'opacity-100 translate-y-0 delay-100' : 'opacity-0 translate-y-8'
              }`}>
                <CardContent className="p-12">
                  <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-green-500/10 backdrop-blur border border-green-400/30 group-hover:border-green-400/50 transition-all duration-300">
                    <Brain className="h-10 w-10 text-green-400" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-green-300 transition-colors">AI Analysis</h3>
                  <p className="text-lg text-gray-300 leading-relaxed group-hover:text-gray-200">
                    Intelligent breakdown of complex concepts into digestible insights
                  </p>
                </CardContent>
              </Card>

              <Card className={`border border-purple-400/20 bg-black/20 backdrop-blur hover:bg-black/30 shadow-lg hover:shadow-purple-500/20 transition-all duration-500 text-center group hover:border-purple-400/40 transform hover:scale-105 ${
                featuresVisible ? 'opacity-100 translate-y-0 delay-200' : 'opacity-0 translate-y-8'
              }`}>
                <CardContent className="p-12">
                  <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-purple-500/10 backdrop-blur border border-purple-400/30 group-hover:border-purple-400/50 transition-all duration-300">
                    <Target className="h-10 w-10 text-purple-400" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-purple-300 transition-colors">Visual Mapping</h3>
                  <p className="text-lg text-gray-300 leading-relaxed group-hover:text-gray-200">
                    Interactive node-based learning experience with visual connections
                  </p>
                </CardContent>
              </Card>

              <Card className={`border border-blue-400/20 bg-black/20 backdrop-blur hover:bg-black/30 shadow-lg hover:shadow-blue-500/20 transition-all duration-500 text-center group hover:border-blue-400/40 transform hover:scale-105 ${
                featuresVisible ? 'opacity-100 translate-y-0 delay-300' : 'opacity-0 translate-y-8'
              }`}>
                <CardContent className="p-12">
                  <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-500/10 backdrop-blur border border-blue-400/30 group-hover:border-blue-400/50 transition-all duration-300">
                    <Zap className="h-10 w-10 text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-blue-300 transition-colors">Real-time Sync</h3>
                  <p className="text-lg text-gray-300 leading-relaxed group-hover:text-gray-200">
                    Collaborative learning in real-time with synchronized updates
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Interactive Canvas Preview */}
            <div 
              ref={canvasRef}
              className={`relative max-w-5xl mx-auto mb-24 transition-all duration-1000 ease-out ${
                canvasVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-12'
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-blue-500/10 to-purple-500/10 rounded-3xl blur-3xl"></div>
              <Card className="relative border border-green-400/20 shadow-2xl bg-black/20 backdrop-blur hover:border-green-400/40 transition-all duration-500">
                <CardContent className="p-16">
                  <div className="flex h-96 items-center justify-center rounded-2xl bg-black/30 backdrop-blur border border-green-400/20">
                    <div className={`text-center space-y-6 transition-all duration-1000 ease-out delay-200 ${
                      canvasVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                    }`}>
                      <div className="mx-auto h-24 w-24 rounded-full bg-green-500/10 backdrop-blur flex items-center justify-center border border-green-400/30">
                        <Layers className="h-12 w-12 text-green-400" />
                      </div>
                      <h3 className="text-3xl font-bold text-white">Interactive Canvas</h3>
                      <p className="text-xl text-gray-300 max-w-md leading-relaxed">
                        See how complex concepts break down into connected principles
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 relative bg-black/20 backdrop-blur border-t border-green-400/20 z-20">
          <div className="container mx-auto px-8 max-w-7xl">
            <div className="max-w-5xl mx-auto">
              <Card 
                ref={ctaRef}
                className={`border border-green-400/20 bg-black/20 backdrop-blur shadow-2xl hover:border-green-400/40 transition-all duration-1000 ${
                  ctaVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-12'
                }`}
              >
                <CardContent className="p-20 text-center">
                  <h2 className={`mb-8 text-5xl font-bold tracking-tight text-white transition-all duration-1000 ease-out delay-200 ${
                    ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}>
                    Ready to Transform Your Learning?
                  </h2>
                  <p className={`mb-12 text-2xl text-gray-300 font-light max-w-3xl mx-auto leading-relaxed transition-all duration-1000 ease-out delay-400 ${
                    ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}>
                    Join learners who are deconstructing complex topics with AI-powered insights.
                  </p>
                  <Button
                    onClick={handleGetStarted}
                    size="lg"
                    className={`h-16 px-12 rounded-full font-bold text-lg bg-green-500/20 backdrop-blur border border-green-400/50 text-green-300 hover:bg-green-500/30 hover:text-green-200 hover:border-green-400/70 shadow-2xl hover:shadow-green-500/20 transition-all duration-300 transform hover:scale-105 ${
                      ctaVisible ? 'opacity-100 translate-y-0 delay-600' : 'opacity-0 translate-y-8'
                    }`}
                  >
                    Get Started Free
                    <ArrowRight className="ml-3 h-5 w-5" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-green-400/20 py-16 bg-black/20 backdrop-blur relative z-20">
        <div className="container mx-auto px-8 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="flex items-center gap-4 mb-6 lg:mb-0">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10 backdrop-blur border border-green-400/30">
                <Brain className="h-5 w-5 text-green-400" />
              </div>
              <span className="text-xl font-bold text-white">Principle</span>
            </div>
            <p className="text-lg text-gray-400 text-center lg:text-right font-medium">
              © 2025 Principle. Making knowledge visual.
            </p>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        defaultMode={authMode}
        onClose={() => setShowAuthModal(false)}
      />
    </div>
  );
}
