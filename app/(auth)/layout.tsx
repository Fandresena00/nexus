import React from "react";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative overflow-hidden flex h-screen bg-linear-120 from-blue-50 to-blue-100">
      {/** Animated Background */}
      <div className="absolute rounded-full blur-[80px] opacity-50 w-96 h-96 bg-blue-600 top-28 left-28 animate-pulse"></div>
      <div className="absolute rounded-full blur-[80px] opacity-50 w-72 h-72 bg-blue-600 bottom-28 right-28 animate-bounce"></div>
      <div className="absolute rounded-full blur-[80px] opacity-50 w-52 h-52 bg-blue-600 top-1/2 right-1/2 translate-1/2 animate-ping"></div>

      {/** main container */}
      <div className="relative flex w-full max-w-7xl m-auto z-10">
        {/**  Left Side - Brand & Features */}
        <div className="flex flex-1 flex-col justify-center p-16">
          <div className="flex items-center gap-4 mb-12">
            <div className="flex w-16 h-16 bg-linear-120 from-blue-300 to-blue-600 rounded-lg items-center justify-center shadow-xl shadow-blue-600/50">
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
            <span className="text-3xl font-extrabold text-blue-800">Nexus</span>
          </div>

          <h1 className="text-4xl font-extrabold leading-tight mb-6 text-blue-950">
            Gérez vos tâches <br />
            comme un pro
          </h1>

          <p className="text-lg leading-normal text-blue-900 mb-10">
            La plateforme moderne de gestion de tâches qui booste votre
            productivité et vous aide à atteindre vos objectifs plus rapidement.
          </p>

          {/** feature presentation */}
          <ul className="list-none">
            {/** interface */}
            <li className="flex items-center gap-4 mb-5 text-sm text-blue-700">
              <div className=" flex  w-12 h-12 bg-white rounded-lg items-center justify-center shrink-0 shadow-lg shadow-blue-700/60">
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
            <li className="flex items-center gap-4 mb-5 text-sm text-blue-700">
              <div className="flex  w-12 h-12 bg-white rounded-lg items-center justify-center shrink-0 shadow-lg shadow-blue-700/60">
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
            <li className="flex items-center gap-4 mb-5 text-sm text-blue-700">
              <div className="flex  w-12 h-12 bg-white rounded-lg items-center justify-center shrink-0 shadow-lg shadow-blue-700/60">
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
          {children}
        </div>
      </div>
    </div>
  );
}
