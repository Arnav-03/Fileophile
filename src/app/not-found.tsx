import Link from "next/link";
import { Cookie } from "next/font/google";

const cookie = Cookie({
  subsets: ["latin"],
  weight: ["400"],
});
export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-[#c5242a]">
      <section className="text-white">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-sm text-center">
            <h1 className={`${cookie.className} mb-4 text-9xl tracking-tight font-extrabold lg:text-9xl `}
            >
              404
            </h1>
            <p className={`${cookie.className} mb-4 text-6xl  tracking-tight font-bold   `}
            >
              Something's missing.
            </p>
            <p className="mb-4 text-lg font-light 0">
              Sorry, we can't find that page. You'll find lots to explore on the
              home page.{" "}
            </p>
            <Link href="/">
              <div className="inline-flex font-medium rounded-lg text-sm px-5 py-2.5 text-center  my-4 bg-[#ffe8e8] text-black">
                Back to Homepage
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
