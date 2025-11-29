import Link from "next/link";

export default function page() {
  return (
    <div className="bg-gray-50 rounded-xl p-12 w-full max-w-2xl shadow-2xl shadow-blue-950/60">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome</h2>
        <p className="text-sm text-gray-600">
          create an account for use this app
        </p>
      </div>

      <form>
        {/** Social Login */}
        <div className="mb-8">
          <button
            type="button"
            className="flex w-full py-3 px-6 bg-gray-50 border border-gray-400 rounded-xl text-sm font-semibold text-gray-700 cursor-pointer items-center justify-center gap-3 transition-all mb-3 hover:border-blue-500 hover:bg-gray-200"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continuer avec Google
          </button>
        </div>

        <div className="flex items-center my-7 text-gray-600 text-sm before:content-[''] before:flex-1 before:h-0.5 before:bg-gray-500 after:content-[''] after:flex-1 after:h-0.5 after:bg-gray-500 ">
          <span className="px-3.5">ou avec votre email</span>
        </div>

        {/** Name  */}
        <div className="mb-6">
          <label
            className="block text-sm font-semibold text-gray-800 mb-2"
            form="email"
          >
            Name
          </label>
          <input
            type="text"
            id="Name"
            className="w-full py-2 px-4 border border-gray-500 rounded-xl text-sm transition focus:outline-none focus:border-blue-500 focus:shadow focus:shadow-blue-900/50 placeholder:text-gray-400 "
            placeholder="Your name"
            required
          />
        </div>

        {/** First Name  */}
        <div className="mb-6">
          <label
            className="block text-sm font-semibold text-gray-800 mb-2"
            form="email"
          >
            First Name
          </label>
          <input
            type="text"
            id="Name"
            className="w-full py-2 px-4 border border-gray-500 rounded-xl text-sm transition focus:outline-none focus:border-blue-500 focus:shadow focus:shadow-blue-900/50 placeholder:text-gray-400 "
            placeholder="Your name"
            required
          />
        </div>

        {/** Email  */}
        <div className="mb-6">
          <label
            className="block text-sm font-semibold text-gray-800 mb-2"
            form="email"
          >
            Adresse email
          </label>
          <input
            type="email"
            id="email"
            className="w-full py-2 px-4 border border-gray-500 rounded-xl text-sm transition focus:outline-none focus:border-blue-500 focus:shadow focus:shadow-blue-900/50 placeholder:text-gray-400 "
            placeholder="vous@exemple.com"
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
              type="password"
              id="password"
              className="w-full py-2 px-4 pr-12 border border-gray-500 rounded-xl text-sm transition focus:outline-none focus:border-blue-500 focus:shadow focus:shadow-blue-900/50 placeholder:text-gray-400 "
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-none border-none cursor-pointer p-1"
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

        {/** Reapeat Password */}
        <div className="mb-6">
          <label
            className="block text-sm font-semibold text-gray-800 mb-2"
            form="password"
          >
            Reapeat Password
          </label>
          <div className="relative">
            <input
              type="password"
              id="password"
              className="w-full py-2 px-4 pr-12 border border-gray-500 rounded-xl text-sm transition focus:outline-none focus:border-blue-500 focus:shadow focus:shadow-blue-900/50 placeholder:text-gray-400 "
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-none border-none cursor-pointer p-1"
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
            Password oublié ?
          </a>
        </div>

        {/** Submit Button */}
        <button
          type="submit"
          className="w-full py-3 px-6 bg-linear-120 from-blue-800 to-blue-600 text-gray-50 rounded-xl text-sm font-semibold cursor-pointer transition-all shadow-lg shadow-blue-900/60 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
        >
          register
        </button>

        {/** Signup Link */}
        <p className="text-center mt-6 text-xs text-gray-700">
          you have an account ?
          <Link
            href="/login"
            className="text-blue-700 font-semibold px-1 hover:text-blue-800 hover:underline "
          >
            Login now
          </Link>
        </p>
      </form>
    </div>
  );
}
