"use client";

import { signIn } from "@/lib/auth-client";
import { LoaderPinwheelIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SigninForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isViewPassword, setIsViewPassword] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const HandleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    await signIn.email(
      {
        email: email,
        password: password,
      },
      {
        onResponse: () => {
          setIsLoading(false);
        },
        onSuccess: () => {
          router.push("/dashboard");
        },
        onError: (error) => {
          setError(error.error.message);
          console.log(error.error.message);
        },
      },
    );
  };

  return (
    <form onSubmit={HandleEmailAuth}>
      <div className="flex items-center my-3 text-gray-600 text-sm before:content-[''] before:flex-1 before:h-0.5 before:bg-gray-500 after:content-[''] after:flex-1 after:h-0.5 after:bg-gray-500 ">
        <span className="px-3.5 text-xs">ou avec votre email</span>
      </div>

      {error.length != 0 ? (
        <div className="w-full flex items-center justify-center text-xs text-red-500 pb-3">
          <p>{error}</p>
        </div>
      ) : null}

      {/** Email  */}
      <div className="group relative mb-6 mt-1">
        <label
          className={`absolute text-sm top-[7px] left-2 font-semibold text-gray-800 transition-all group-focus-within:-top-4 group-focus-within:text-xs ${
            email.length != 0 ? "-top-4 text-xs" : ""
          }`}
          form="email"
        >
          Adresse email
        </label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          className="w-full py-1.5 px-4 text-sm bg-transparent z-50 focus:outline-none focus:bg-gray-200 border-b-2 border-b-gray-900"
          required
        />
      </div>

      {/** Password */}
      <div className="mb-6">
        <label
          className="block text-sm font-semibold text-gray-800 mb-2"
          form="password"
        >
          Password
        </label>
        <div className="relative">
          <input
            type={isViewPassword ? "text" : "password"}
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="w-full py-2 px-4 pr-12 border border-gray-500 rounded-xl text-sm transition focus:outline-none focus:border-blue-500 focus:shadow focus:shadow-blue-900/50 placeholder:text-gray-400 "
            placeholder="••••••••"
            required
          />
          <button
            type="button"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-none border-none cursor-pointer p-1"
            onClick={() => {
              setIsViewPassword(!isViewPassword);
            }}
          >
            <svg
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              className="w-5 h-5 stroke-gray-700"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              ></path>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/** Remember & Forgot */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="remember"
            className="w-4 h-4 cursor-pointer accent-blue-600"
          />
          <label
            form="remember"
            className="text-sm text-gray-700 cursor-pointer"
          >
            Se souvenir de moi
          </label>
        </div>
        <a
          href="#"
          className="text-xs text-blue-600 font-semibold hover:text-blue-800 transition"
        >
          Mot de passe oublié ?
        </a>
      </div>

      {/** Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 px-6 bg-linear-120 from-blue-800 to-blue-600 text-gray-50 rounded-xl text-sm font-semibold cursor-pointer transition-all shadow-lg shadow-blue-900/60 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 disabled:bg-black"
      >
        {isLoading ? (
          <div className="flex justify-center gap-1.5">
            <LoaderPinwheelIcon size={20} className="animate-spin text-white" />
            <p>loading</p>
          </div>
        ) : (
          "Sign In"
        )}
      </button>

      {/** Signup Link */}
      <p className="text-center mt-6 text-xs text-gray-700">
        You don&apos;t have an account ?
        <Link
          href="/signup"
          className="text-blue-700 font-semibold px-1 hover:text-blue-800 hover:underline "
        >
          Sign Up
        </Link>
      </p>
    </form>
  );
}
