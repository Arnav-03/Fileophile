"use client";

import React from 'react';
import {
  Users,
  FileText,
  Share2,
  Shield,
  ArrowRight,
  File,
  FileJson,
  FileImage,
  FileVideo,
  FileAudio,
  FileCode,
  FileArchive,
  Check,
  Star,
  Clock,
  Lock,
} from 'lucide-react';

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from '@/components/Navigation';
import { useRouter } from 'next/navigation';

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

interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  highlighted?: boolean;
}

const AnimatedBackground: React.FC = () => {
  const fileIcons = [
    File,
    FileJson,
    FileImage,
    FileVideo,
    FileAudio,
    FileCode,
    FileArchive,
  ];

  const icons = React.useMemo(() => {
    return Array.from({ length: 24 }).map(() => ({
      IconComponent: fileIcons[Math.floor(Math.random() * fileIcons.length)],
      delay: Math.random() * 5,
      duration: 15 + Math.random() * 15,
      initialPos: {
        x: Math.random() * 100,
        y: Math.random() * 100,
      },
    }));
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      <svg className="absolute inset-0 w-full h-full">
        {Array.from({ length: 8 }).map((_, i) => (
          <line
            key={i}
            className="animate-line"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="1"
            strokeDasharray="5,5"
            style={{
              animation: `moveLine ${20 + i * 5}s linear infinite`,
              animationDelay: `${i * 2}s`,
            }}
          >
            <animate
              attributeName="x1"
              values="0;100;0"
              dur={`${20 + i * 5}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="y1"
              values={`${i * 10};${(i + 5) * 10};${i * 10}`}
              dur={`${20 + i * 5}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="x2"
              values="100;0;100"
              dur={`${20 + i * 5}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="y2"
              values={`${(i + 5) * 10};${i * 10};${(i + 5) * 10}`}
              dur={`${20 + i * 5}s`}
              repeatCount="indefinite"
            />
          </line>
        ))}
      </svg>

      {icons.map((props, index) => (
        <FileIcon key={index} {...props} />
      ))}
    </div>
  );
};

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

const pricingTiers: PricingTier[] = [
  {
    name: "Basic",
    price: "Free",
    description: "Perfect for individuals",
    features: [
      "5GB Storage",
      "Basic File Sharing",
      "2 Team Members",
      "Email Support"
    ]
  },
  {
    name: "Pro",
    price: "$9.99/mo",
    description: "Great for small teams",
    highlighted: true,
    features: [
      "50GB Storage",
      "Advanced Sharing",
      "Unlimited Team Members",
      "Priority Support",
      "File Version History",
      "Custom Branding"
    ]
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large organizations",
    features: [
      "Unlimited Storage",
      "Enterprise Security",
      "Admin Controls",
      "24/7 Support",
      "API Access",
      "Custom Integration"
    ]
  }
];

const StatsSection: React.FC = () => (
  <section className="py-20 bg-black/30">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[1200px] mx-auto">
        {[
          { number: "1M+", label: "Active Users" },
          { number: "100TB+", label: "Files Stored" },
          { number: "99.9%", label: "Uptime" }
        ].map((stat, index) => (
          <div key={index} className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.number}</div>
            <div className="text-gray-300">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

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