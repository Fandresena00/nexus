export default function page() {
  return (
    <div className="relative overflow-hidden flex h-screen bg-linear-120 from-red-50 to-red-100">
      {/** Animated Background */}
      <div className="absolute rounded-full blur-[80px] opacity-50 w-96 h-96 bg-red-600 top-28 left-28 animate-pulse"></div>
      <div className="absolute rounded-full blur-[80px] opacity-50 w-72 h-72 bg-red-600 bottom-28 right-28 animate-bounce"></div>
      <div className="absolute rounded-full blur-[80px] opacity-50 w-52 h-52 bg-red-600 top-1/2 left-1/2 translate-1/2 animate-bounce"></div>

      {/** main container */}
      <div className="relative flex w-full max-w-7xl m-auto z-10">
        {/**  Left Side - Brand & Features */}
        <div className="flex flex-1 flex-col justify-center p-16">
          <div className="flex items-center gap-4 mb-12">
            <div className="flex w-16 h-16 bg-linear-120 from-red-300 to-red-600 rounded-lg items-center justify-center shadow-xl shadow-red-600/50">
              <svg
                fill="none"
                stroke="currentColor"
                className="w-9 h-9 stroke-white"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                ></path>
              </svg>
            </div>
            <span className="text-3xl font-extrabold text-red-800">Nexus</span>
          </div>

          <h1 className="text-4xl font-extrabold leading-tight mb-6 text-red-950">
            Gérez vos tâches <br />
            comme un pro
          </h1>

          <p className="text-lg leading-normal text-red-900 mb-10">
            La plateforme moderne de gestion de tâches qui booste votre
            productivité et vous aide à atteindre vos objectifs plus rapidement.
          </p>

          {/** feature presentation */}
          <ul className="list-none">
            {/** interface */}
            <li className="flex items-center gap-4 mb-5 text-sm text-red-700">
              <div className=" flex  w-12 h-12 bg-white rounded-lg items-center justify-center shrink-0 shadow-lg shadow-red-700/60">
                <svg
                  fill="none"
                  stroke="currentColor"
                  className="w-7 h-7"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  ></path>
                </svg>
              </div>
              <span>
                <strong>Interface ultra-rapide</strong> et intuitive
              </span>
            </li>
            {/** analyse and productivity */}
            <li className="flex items-center gap-4 mb-5 text-sm text-red-700">
              <div className="flex  w-12 h-12 bg-white rounded-lg items-center justify-center shrink-0 shadow-lg shadow-red-700/60">
                <svg
                  fill="none"
                  stroke="currentColor"
                  className="w-7 h-7"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  ></path>
                </svg>
              </div>
              <span>
                <strong>Analytics en temps réel</strong> de votre productivité
              </span>
            </li>
            {/** security */}
            <li className="flex items-center gap-4 mb-5 text-sm text-red-700">
              <div className="flex  w-12 h-12 bg-white rounded-lg items-center justify-center shrink-0 shadow-lg shadow-red-700/60">
                <svg
                  fill="none"
                  stroke="currentColor"
                  className="w-7 h-7"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  ></path>
                </svg>
              </div>
              <span>
                <strong>Sécurité maximale</strong> de vos données
              </span>
            </li>
          </ul>
        </div>

        {/**  Right Side - Login Form */}
        <div className="flex flex-1 items-center justify-center p-16">
          <div className="bg-gray-50 rounded-xl p-12 w-full max-w-[440] shadow-2xl shadow-red-950/60">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Bon retour !
              </h2>
              <p className="text-sm text-gray-600">
                Connectez-vous pour accéder à votre espace
              </p>
            </div>

            <form>
              {/** Social Login */}
              <div className="mb-8">
                <button
                  type="button"
                  className="flex w-full py-3 px-6 bg-gray-50 border border-gray-400 rounded-xl text-sm font-semibold text-gray-700 cursor-pointer items-center justify-center gap-3 transition-all mb-3 hover:border-red-500 hover:bg-gray-200"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
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
                <button
                  type="button"
                  className="flex w-full py-3 px-6 bg-gray-50 border border-gray-400 rounded-xl text-sm font-semibold text-gray-700 cursor-pointer items-center justify-center gap-3 transition-all mb-3 hover:border-red-500 hover:bg-gray-200"
                >
                  <svg viewBox="0 0 24 24" fill="#1877F2" className="w-5 h-5">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Continuer avec Facebook
                </button>
              </div>

              <div className="flex items-center my-7 text-gray-600 text-sm before:content-[''] before:flex-1 before:h-0.5 before:bg-gray-500 after:content-[''] after:flex-1 after:h-0.5 after:bg-gray-500 ">
                <span className="px-3.5">ou avec votre email</span>
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
                  className="w-full py-2 px-4 border border-gray-500 rounded-xl text-sm transition focus:outline-none focus:border-red-500 focus:shadow focus:shadow-red-900/50 placeholder:text-gray-400 "
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
                  Mot de passe
                </label>
                <div className="relative">
                  <input
                    type="password"
                    id="password"
                    className="w-full py-2 px-4 pr-12 border border-gray-500 rounded-xl text-sm transition focus:outline-none focus:border-red-500 focus:shadow focus:shadow-red-900/50 placeholder:text-gray-400 "
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
                    className="w-4 h-4 cursor-pointer accent-red-600"
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
                  className="text-xs text-red-600 font-semibold hover:text-red-800 transition"
                >
                  Mot de passe oublié ?
                </a>
              </div>

              {/** Submit Button */}
              <button
                type="submit"
                className="w-full py-3 px-6 bg-linear-120 from-red-800 to-red-600 text-gray-50 rounded-xl text-sm font-semibold cursor-pointer transition-all shadow-lg shadow-red-900/60 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
              >
                Se connecter
              </button>

              {/** Signup Link */}
              <p className="text-center mt-6 text-xs text-gray-700">
                Pas encore de compte ?
                <a
                  href="#"
                  className="text-red-700 font-semibold px-1 hover:text-red-800 hover:underline "
                >
                  Créer un compte
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
