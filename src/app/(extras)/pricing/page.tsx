"use client";

import React from 'react';
import {

  File,
  FileJson,
  FileImage,
  FileVideo,
  FileAudio,
  FileCode,
  FileArchive,
  Check,
} from 'lucide-react';

import { Card, CardContent } from "@/components/ui/card";
import Navigation from '@/components/Navigation';

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



export default function Pricing() {
  
  return (
    <div className="relative min-h-screen bg-gradient-to-r from-red-900 via-red-600 to-black text-white overflow-hidden">
      <AnimatedBackground />
      <Navigation />
             <section className="py-20 px-4 bg-black/30">
          <div className="max-w-[1200px] mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Choose Your Plan</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pricingTiers.map((tier, index) => (
                <Card 
                  key={index}
                  className={`backdrop-blur-sm border-none text-white ${
                    tier.highlighted 
                      ? 'bg-white/20 scale-105 transform' 
                      : 'bg-white/10'
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col space-y-4">
                      <h3 className="text-2xl font-bold">{tier.name}</h3>
                      <div className="text-3xl font-bold">{tier.price}</div>
                      <p className="text-gray-300">{tier.description}</p>
                      <ul className="space-y-3">
                        {tier.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center">
                            <Check className="h-5 w-5 text-green-400 mr-2" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                     
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
    </div>
  );
}