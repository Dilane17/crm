import React, { useState, useEffect } from "react";
import { interactionsAPI, clientsAPI } from "../services/api";

const Interactions = () => {
  const [interactions, setInteractions] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingInteraction, setEditingInteraction] = useState(null);
  const [selectedClient, setSelectedClient] = useState("");
  const [formData, setFormData] = useState({
    type: "",
    sujet: "",
    contenu: "",
    clientId: "",
  });

  useEffect(() => {
    fetchClients();
  }, []);

  useEffect(() => {
    if (selectedClient) {
      fetchInteractions(selectedClient);
    }
  }, [selectedClient]);

  const fetchClients = async () => {
    try {
      const response = await clientsAPI.getAll();
      setClients(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des clients:", error);
    }
  };

  const fetchInteractions = async (clientId) => {
    try {
      const response = await interactionsAPI.getByClient(clientId);
      setInteractions(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des interactions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = { ...formData, clientId: parseInt(selectedClient) };
      if (editingInteraction) {
        await interactionsAPI.update(editingInteraction.id, dataToSend);
      } else {
        await interactionsAPI.create(dataToSend);
      }
      fetchInteractions(selectedClient);
      setShowForm(false);
      setEditingInteraction(null);
      setFormData({ type: "", sujet: "", contenu: "", clientId: "" });
    } catch (error) {
      console.error("Erreur lors de la sauvegarde:", error);
    }
  };

  const handleEdit = (interaction) => {
    setEditingInteraction(interaction);
    setFormData({
      type: interaction.type,
      sujet: interaction.sujet,
      contenu: interaction.contenu,
      clientId: interaction.clientId,
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (
      window.confirm("Êtes-vous sûr de vouloir supprimer cette interaction ?")
    ) {
      try {
        await interactionsAPI.delete(id);
        fetchInteractions(selectedClient);
      } catch (error) {
        console.error("Erreur lors de la suppression:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Gestion des Interactions
            </h1>
            {selectedClient && (
              <button
                onClick={() => setShowForm(!showForm)}
                className="btn-primary"
              >
                {showForm ? "Annuler" : "Ajouter une Interaction"}
              </button>
            )}
          </div>

          <div className="card p-6 mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sélectionner un Client
            </label>
            <select
              className="input-field block w-full"
              value={selectedClient}
              onChange={(e) => setSelectedClient(e.target.value)}
            >
              <option value="">Choisir un client...</option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.nom} - {client.entreprise || "N/A"}
                </option>
              ))}
            </select>
          </div>

          {showForm && selectedClient && (
            <div className="card p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">
                {editingInteraction
                  ? "Modifier l'Interaction"
                  : "Nouvelle Interaction"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Type
                  </label>
                  <select
                    required
                    className="input-field mt-1 block w-full"
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({ ...formData, type: e.target.value })
                    }
                  >
                    <option value="">Sélectionner un type</option>
                    <option value="Appel">Appel</option>
                    <option value="Email">Email</option>
                    <option value="Réunion">Réunion</option>
                    <option value="Note">Note</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Sujet
                  </label>
                  <input
                    type="text"
                    required
                    className="input-field mt-1 block w-full"
                    value={formData.sujet}
                    onChange={(e) =>
                      setFormData({ ...formData, sujet: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Contenu
                  </label>
                  <textarea
                    required
                    rows={4}
                    className="input-field mt-1 block w-full"
                    value={formData.contenu}
                    onChange={(e) =>
                      setFormData({ ...formData, contenu: e.target.value })
                    }
                  />
                </div>
                <button type="submit" className="btn-primary">
                  {editingInteraction ? "Modifier" : "Créer"}
                </button>
              </form>
            </div>
          )}

          {selectedClient && (
            <>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Interactions pour{" "}
                {clients.find((c) => c.id == selectedClient)?.nom}
              </h2>
              {loading ? (
                <p>Chargement...</p>
              ) : (
                <div className="card overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Sujet
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Contenu
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {interactions.map((interaction) => (
                        <tr key={interaction.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {interaction.type}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {interaction.sujet}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                            {interaction.contenu}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(
                              interaction.createdAt
                            ).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => handleEdit(interaction)}
                              className="text-indigo-600 hover:text-indigo-900 mr-4"
                            >
                              Modifier
                            </button>
                            <button
                              onClick={() => handleDelete(interaction.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              Supprimer
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Interactions;
