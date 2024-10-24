"use client";

import React from 'react';
import {

  Globe,
  Shield,
  Heart,
  RefreshCw,
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from '@/components/Navigation';
import { useRouter } from 'next/navigation';


const values = [
  {
    icon: Shield,
    title: "Security First",
    description: "We prioritize the security and privacy of our users' data above all else."
  },
  {
    icon: Heart,
    title: "User-Centric",
    description: "Every feature we build starts with our users' needs and feedback."
  },
  {
    icon: Globe,
    title: "Global Mindset",
    description: "We build for a diverse, global community of users and teams."
  },
  {
    icon: RefreshCw,
    title: "Continuous Innovation",
    description: "We're constantly improving and evolving our platform."
  }
];

export default function AboutPage() {
  const router = useRouter();
  
  return (
    <div className="min-h-screen bg-gradient-to-r from-red-900 via-red-600 to-black text-white">
      <Navigation />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="px-4 py-20">
          <div className="max-w-[1200px] mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Our Mission
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-[800px] mx-auto">
              To empower teams worldwide with secure, seamless file sharing and collaboration tools that work as fast as they do.
            </p>
          </div>
        </section>

        {/* Values Section */}
        <section className="px-4 py-20 bg-black/30">
          <div className="max-w-[1200px] mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <Card 
                  key={index}
                  className="bg-white/10 backdrop-blur-sm border-none text-white hover:bg-white/15 transition-colors"
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center space-y-4">
                      <div className="rounded-full bg-white/20 p-4">
                        {React.createElement(value.icon, {
                          className: "h-6 w-6 text-white"
                        })}
                      </div>
                      <h3 className="text-xl font-semibold">{value.title}</h3>
                      <p className="text-gray-200">{value.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>


        {/* CTA Section */}
        <section className="px-4 py-20">
          <div className="max-w-[800px] mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Journey</h2>
            <p className="text-xl text-gray-200 mb-8">
              Be part of our mission to revolutionize file sharing and collaboration.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-white/20 hover:bg-white/30"
                onClick={() => router.push('/contact')}
              >
                Contact Us
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}