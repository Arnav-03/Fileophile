"use client";

import React from 'react';
import {
  Users,
  FileText,
  Share2,
  Shield,
  ArrowRight,
} from 'lucide-react';

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from '@/components/Navigation';
import { useRouter } from 'next/navigation';
import AnimatedBackground from '@/components/AnimatedBackground';

interface Position {
  x: number;
  y: number;
}

interface FileIconProps {
  IconComponent: React.ComponentType<any>;
  delay: number;
  duration: number;
  initialPos: Position;
}

const FileIcon: React.FC<FileIconProps> = ({ IconComponent, delay, duration, initialPos }) => {
  return (
    <div
      className="absolute animate-float"
      style={{
        left: `${initialPos.x}%`,
        top: `${initialPos.y}%`,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
      }}
    >
      {React.createElement(IconComponent, {
        className: "text-white/10 w-8 h-8 md:w-12 md:h-12"
      })}
    </div>
  );
};

interface Feature {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
}



const features: Feature[] = [
  {
    icon: FileText,
    title: "File Management",
    description: "Organize and access your files from anywhere, anytime."
  },
  {
    icon: Share2,
    title: "Easy Sharing",
    description: "Share files and folders with anyone, with just a few clicks."
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "Work together in real-time with your team members."
  },
  {
    icon: Shield,
    title: "Security",
    description: "Enterprise-grade security to protect your sensitive data."
  },
];


export default function HomePage() {
  const router = useRouter();
  
  return (
    <div className="relative min-h-screen bg-gradient-to-r from-red-900 via-red-600 to-black text-white overflow-hidden">
      <AnimatedBackground />
      <Navigation />
      
      <main className="relative z-10">
        <section className="min-h-[70vh] flex flex-col items-center justify-center max-w-[1200px] mx-auto text-center px-4 pt-20">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Effortlessly Share Files
            <br />
            <span className="text-primary-foreground">
              and Collaborate Anywhere
            </span>
          </h1>
          
          <p className="mt-6 max-w-[750px] text-lg md:text-xl text-gray-200">
            The secure platform for teams to share files via links, store them, 
            and collaborate on projects seamlessly.
          </p>
         
          <Button 
            size="lg" 
            className="mt-8 bg-white text-black hover:bg-gray-200"
            onClick={() => router.push('/login')}
          >
            Get Started <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </section>


        <section className="py-20 px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1200px] mx-auto">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="bg-white/10 backdrop-blur-sm border-none text-white hover:bg-white/15 transition-colors"
              >
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="rounded-full bg-white/20 p-4">
                      {React.createElement(feature.icon, {
                        className: "h-6 w-6 text-white"
                      })}
                    </div>
                    <h3 className="text-xl font-semibold">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-200">
                      {feature.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}