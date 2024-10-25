"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Cookie } from "next/font/google";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useUserContext } from "@/context/userContext";
import { SignIn } from "@/components/sign-in";
import { Mail, Lock } from 'lucide-react';
import AnimatedBackground from "@/components/AnimatedBackground";
import Navigation from "@/components/Navigation";

const cookie = Cookie({
  subsets: ["latin"],
  weight: ["400"],
});


function Page() {
  const router = useRouter();
  const { setUser, user } = useUserContext();
  const [usercredentials, setuser] = useState({
    email: "",
    password: "",
  });
  const [error, seterror] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      router.push('/home');
    }
  }, [user]);

  const onlogin = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post("/api/users/login", usercredentials);
      if (response.data.message === "sign with google") {
        seterror("Please use Google Sign In as your email was registered using Google");
        return;
      }
      if (response.data.user) {
        setUser(response.data.user);
      }
      router.push("/home");
    } catch (error: any) {
      console.log("login failed ", error);
      seterror("Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-gradient-to-r from-red-900 via-red-600 to-black">
      <Navigation/>
      <AnimatedBackground />
      
      <div className="relative z-10 w-full max-w-md px-6 py-12 mt-[50px]">
        <div className="backdrop-blur-md bg-white/10 rounded-2xl p-8 shadow-2xl">
          <div className="space-y-6">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 h-5 w-5" />
              <input
                type="email"
                value={usercredentials.email}
                onChange={(e) => setuser({ ...usercredentials, email: e.target.value })}
                className="w-full bg-white/10 text-white border-0 rounded-lg py-3 px-12 outline-none focus:ring-2 focus:ring-white/20 transition-all placeholder:text-white/40"
                placeholder="Email"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 h-5 w-5" />
              <input
                type="password"
                value={usercredentials.password}
                onChange={(e) => setuser({ ...usercredentials, password: e.target.value })}
                className="w-full bg-white/10 text-white border-0 rounded-lg py-3 px-12 outline-none focus:ring-2 focus:ring-white/20 transition-all placeholder:text-white/40"
                placeholder="Password"
              />
            </div>

            <button
              onClick={onlogin}
              disabled={isLoading}
              className="w-full bg-red-700 hover:bg-red-600 text-white rounded-lg py-3 font-medium transition-colors disabled:opacity-50"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>

            <div className="relative py-3">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-transparent px-4 text-sm text-white z-10">or</span>
              </div>
            </div>

            <div className="mt-4">
              <SignIn />
            </div>
          </div>

          {error && (
            <div className="mt-4 text-center text-sm text-red-300 bg-red-900/20 py-2 px-4 rounded-lg">
              {error}
            </div>
          )}

          <div className="mt-8 text-center text-white/60 text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-white hover:underline font-medium">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;