import { Metadata } from "next";
import { Cookie } from "next/font/google";
import Link from "next/link";
import React from "react";
import Loading from "../loading";

const metadata: Metadata = {
  title: "Login | Fileophile",
  description:
    "The easiest way to share files and create collaborative workspaces",
};

const cookie = Cookie({
  subsets: ["latin"],
  weight: ["400"],
});

function Page() {
  return (
    <div className="flex bg-[#c5242a] items-center justify-center flex-col h-screen">
      <div className={`${cookie.className} text-white text-8xl `}>
        Fileophile
      </div>
      <section className="text-white m-2">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto  lg:py-0">
          <div className="w-full  rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <form className="space-y-4 md:space-y-6 m-4  " action="#">
                <div>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className=" border text-black  text-sm rounded   block w-full p-2.5  outline-none   "
                    placeholder="Email"
                  />
                </div>
                <div>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    className=" border text-black  text-sm rounded  block w-full p-2.5   outline-none "
                  />
                </div>

                <button
                  type="submit"
                  className="bg-[#610404] w-full text-[#ffffff] font-medium rounded text-lg px-5 py-2 text-center "
                >
                  Login
                </button>
                <button
                  type="button"
                  className="login-with-google-btn w-full outline-none"
                >
                  Sign in with Google
                </button>

                <div className="flex text-sm text-center items-center justify-center gap-2 w-full">
                  <div className="font-light  ">Don't have an account?</div>
                  <Link href="/signup">
                    <div className="font-medium  hover:underline ">Sign up</div>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Page;
