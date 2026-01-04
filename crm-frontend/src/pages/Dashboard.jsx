import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { clientsAPI, interactionsAPI } from "../services/api";
import { useAuth } from "../contexts/AuthContext";

const Dashboard = () => {
  const [clients, setClients] = useState([]);
  const [interactions, setInteractions] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { logout } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Charger les clients
        const clientsResponse = await clientsAPI.getAll();
        setClients(clientsResponse.data);

        // Charger les interactions pour tous les clients
        const allInteractions = [];
        for (const client of clientsResponse.data) {
          try {
            const interactionsResponse = await interactionsAPI.getByClient(
              client.id
            );
            allInteractions.push(...interactionsResponse.data);
          } catch (error) {
            console.error(
              `Erreur lors de la récupération des interactions du client ${client.id}:`,
              error
            );
          }
        }
        setInteractions(allInteractions);

        // Extraire les tâches en attente (interactions sans date de fin ou en cours)
        const pendingTasks = allInteractions.filter(
          (interaction) =>
            !interaction.dateClôture || interaction.statut === "en_cours"
        );
        setTasks(pendingTasks);
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Rafraîchir les données toutes les 30 secondes
    const interval = setInterval(fetchData, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">
                CRM Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/clients" className="btn-primary text-sm">
                Gérer les Clients
              </Link>
              <Link to="/interactions" className="btn-secondary text-sm">
                Voir les Interactions
              </Link>
              <button
                onClick={logout}
                className="text-gray-600 hover:text-gray-900"
              >
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="card p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Total Clients
              </h3>
              <p className="text-3xl font-bold text-indigo-600">
                {clients.length}
              </p>
            </div>
            <div className="card p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Interactions Récentes
              </h3>
              <p className="text-3xl font-bold text-green-600">
                {interactions.length}
              </p>
            </div>
            <div className="card p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Tâches en Attente
              </h3>
              <p className="text-3xl font-bold text-yellow-600">
                {tasks.length}
              </p>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Clients Récents
            </h2>
            {loading ? (
              <p>Chargement...</p>
            ) : (
              <div className="card overflow-hidden">
                <ul className="divide-y divide-gray-200">
                  {clients.slice(0, 5).map((client) => (
                    <li key={client.id} className="px-6 py-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {client.nom}
                          </p>
                          <p className="text-sm text-gray-500">
                            {client.email}
                          </p>
                        </div>
                        <div className="text-sm text-gray-500">
                          {client.entreprise || "N/A"}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
