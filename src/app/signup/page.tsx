"use client";
import { Cookie } from "next/font/google";
import Link from "next/link";
import React, { useState } from "react";
import { SignIn } from "@/components/sign-in";
import { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/context/userContext";

const cookie = Cookie({
  subsets: ["latin"],
  weight: ["400"],
});

function Page() {
  const router = useRouter();
  const { setUser, user } = useUserContext();
  useEffect(() => {
    if (user) {
      router.push("/home");
    }
  }, [user]);

  const [usercredentials, setuser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const saveToContextAndCookie = (email: string, username: string) => {
    const user = { email, username };
    setUser(user);
  };
  const onsignup = async () => {
    try {
      saveToContextAndCookie(usercredentials.email, usercredentials.username);
      const response = await axios.post("/api/users/signup", usercredentials);
      console.log("signup successful", response.data);
      router.push("/login");
    } catch (error: any) {
      console.log("signup failed ", error);
    }
  };

  return (
    <div className="flex bg-gradient-to-r from-red-600 to-pink-600 items-center justify-center flex-col h-screen">
      <div className={`${cookie.className} text-white text-8xl `}>
        Fileophile
      </div>
      <section className="text-white m-2">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto  lg:py-0">
          <div className="w-full  rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl ">
                Create an account
              </h1>
              <div className="space-y-4 md:space-y-6">
                <div>
                  <input
                    type="text"
                    name="username"
                    value={usercredentials.username}
                    onChange={(e) =>
                      setuser({ ...usercredentials, username: e.target.value })
                    }
                    id="username"
                    className="border text-sm rounded block w-full p-2.5 text-black outline-none"
                    placeholder="Username"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={usercredentials.email}
                    onChange={(e) =>
                      setuser({ ...usercredentials, email: e.target.value })
                    }
                    className="border text-black text-sm rounded block w-full p-2.5 outline-none"
                    placeholder="Email"
                  />
                </div>
                <div>
                  <input
                    value={usercredentials.password}
                    onChange={(e) =>
                      setuser({ ...usercredentials, password: e.target.value })
                    }
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    className="border text-black text-sm rounded block w-full p-2.5 outline-none"
                  />
                </div>

                <button
                  onClick={onsignup}
                  className="bg-[#610404] w-full text-[#ffffff] font-medium rounded text-lg px-5 py-2 text-center"
                >
                  Sign Up
                </button>
              </div>

              <SignIn />

              <div className="flex text-sm justify-center gap-2 w-full">
                <div className="font-light">Already have an account?</div>
                <Link href="/login">
                  <div className="font-medium hover:underline">Login</div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Page;
