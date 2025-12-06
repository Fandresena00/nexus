export default function Page() {
  const stats = [
    { label: "Projets tot.", value: 12 },
    { label: "En cours", value: 6 },
    { label: "Terminés", value: 3 },
    { label: "En retard", value: 2 },
  ];

  const tasksToday = [
    { id: 1, title: "Créer la page login", owner: "Toi", due: "Aujourd'hui" },
    { id: 2, title: "Corriger le header", owner: "Sarah", due: "Aujourd'hui" },
    { id: 3, title: "Relire le README", owner: "Alex", due: "Aujourd'hui" },
  ];

  const activities = [
    'Fandresena a ajouté "Créer la page login"',
    'Projet "Portfolio" → En cours',
    'Tâche "Intégrer API" terminée',
    "Nouveau membre ajouté : Sarah",
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-900 ">Dashboard</h1>
        </header>

        {/* Stats Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((s) => (
            <div key={s.label} className="bg-white  p-4 rounded-lg shadow-sm">
              <div className="text-sm text-gray-500">{s.label}</div>
              <div className="mt-2 text-2xl font-bold text-gray-900">
                {s.value}
              </div>
            </div>
          ))}
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column - Tasks & Urgent */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h2 className="text-lg font-medium text-gray-900 mb-3">
                Tâches du jour
              </h2>
              <ul className="space-y-2">
                {tasksToday.map((t) => (
                  <li key={t.id} className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-800">{t.title}</div>
                      <div className="text-sm text-gray-500">
                        {t.owner} • {t.due}
                      </div>
                    </div>
                    <div>
                      <button className="px-2 py-1 text-sm border rounded">
                        Voir
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Tâches urgentes
              </h3>
              <ul className="text-sm text-gray-700">
                <li>🔥 2 en retard</li>
                <li>⏳ 1 deadline &lt; 24h</li>
                <li>📍 Assignées à moi</li>
              </ul>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-gray-900  mb-3">
                Activité récente
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                {activities.map((a, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-indigo-500 mt-2" />
                    <div>{a}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Middle column - Charts */}
          <div className="lg:col-span-2 grid grid-rows-2 gap-6">
            <div className="bg-white p-4 rounded-lg shadow-sm h-64 flex flex-col">
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Répartition des tâches
              </h3>
              {/* Placeholder for chart - integrate Chart.js / Recharts here */}
              <div className="flex-1 flex items-center justify-center text-gray-400">
                [Graphique - répartition des tâches]
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm h-64 flex flex-col">
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Productivité (7 derniers jours)
              </h3>
              <div className="flex-1 flex items-center justify-center text-gray-400">
                [Graphique - productivité]
              </div>
            </div>
          </div>
        </div>

        {/* Bottom - Calendar + Quick Actions */}
        <div className="mt-6 gap-6">
          <div className="lg:col-span-2 bg-white p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium text-gray-900 mb-3">
              Mini Calendrier
            </h3>
            <div className="border rounded p-4 text-sm text-gray-700">
              {/* Simple static calendar example - replace with full calendar library if needed */}
              <div className="grid grid-cols-7 gap-1 text-center">
                {["L", "M", "M", "J", "V", "S", "D"].map((d) => (
                  <div key={d} className="font-medium">
                    {d}
                  </div>
                ))}
                {Array.from({ length: 35 }).map((_, i) => (
                  <div key={i} className="p-2">
                    {i + 1}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <footer className="mt-8 text-sm text-gray-500">
          Made with ❤️ — personnalise-moi pour l&apos;intégration API et le
          style.
        </footer>
      </div>
    </div>
  );
}
