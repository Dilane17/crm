// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import {
  Users,
  MessageSquare,
  TrendingUp,
  Plus,
  Edit2,
  Trash2,
  X,
  Search,
  Filter,
  Phone,
  Mail,
  Building,
  Calendar,
  Clock,
  ChevronRight,
  Home,
  LogOut,
} from "lucide-react";

// Simulated API - Replace with your actual API calls
const mockAPI = {
  clients: [
    {
      id: 1,
      nom: "Jean Dupont",
      entreprise: "Tech Corp",
      email: "jean@tech.com",
      telephone: "0123456789",
      createdAt: new Date("2024-01-15"),
    },
    {
      id: 2,
      nom: "Marie Martin",
      entreprise: "Digital Solutions",
      email: "marie@digital.com",
      telephone: "0234567890",
      createdAt: new Date("2024-01-20"),
    },
    {
      id: 3,
      nom: "Pierre Durand",
      entreprise: "Innovation Labs",
      email: "pierre@innovation.com",
      telephone: "0345678901",
      createdAt: new Date("2024-02-01"),
    },
  ],
  interactions: [
    {
      id: 1,
      clientId: 1,
      type: "Appel",
      sujet: "Démo produit",
      contenu: "Discussion sur les fonctionnalités principales",
      createdAt: new Date("2024-01-16"),
    },
    {
      id: 2,
      clientId: 1,
      type: "Email",
      sujet: "Suivi proposition",
      contenu: "Envoi de la proposition commerciale",
      createdAt: new Date("2024-01-18"),
    },
    {
      id: 3,
      clientId: 2,
      type: "Réunion",
      sujet: "Kick-off projet",
      contenu: "Lancement du projet avec toute l'équipe",
      createdAt: new Date("2024-01-22"),
    },
  ],
};

// eslint-disable-next-line no-unused-vars
const NavItem = ({ icon: Icon, label, view, active, setCurrentView }) => (
  <button
    onClick={() => setCurrentView(view)}
    className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all ${
      active
        ? "bg-linear-to-r from-indigo-500 to-purple-500 text-white shadow-lg"
        : "text-gray-600 hover:bg-gray-100"
    }`}
  >
    <Icon size={20} />
    <span className="font-medium">{label}</span>
  </button>
);

const DashboardView = ({ stats, clients, formatDate, setCurrentView }) => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
    </div>

    {/* Stats Cards */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-linear-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-100 text-sm font-medium">Total Clients</p>
            <p className="text-4xl font-bold mt-2">{stats.totalClients}</p>
          </div>
          <div className="bg-white/20 p-3 rounded-xl">
            <Users size={32} />
          </div>
        </div>
      </div>

      <div className="bg-linear-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-purple-100 text-sm font-medium">Interactions</p>
            <p className="text-4xl font-bold mt-2">{stats.totalInteractions}</p>
          </div>
          <div className="bg-white/20 p-3 rounded-xl">
            <MessageSquare size={32} />
          </div>
        </div>
      </div>

      <div className="bg-linear-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-green-100 text-sm font-medium">Cette semaine</p>
            <p className="text-4xl font-bold mt-2">
              {stats.recentInteractions}
            </p>
          </div>
          <div className="bg-white/20 p-3 rounded-xl">
            <TrendingUp size={32} />
          </div>
        </div>
      </div>
    </div>

    {/* Recent Clients */}
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">Clients récents</h2>
        <button
          onClick={() => setCurrentView("clients")}
          className="text-indigo-600 hover:text-indigo-700 font-medium text-sm flex items-center gap-1"
        >
          Voir tout <ChevronRight size={16} />
        </button>
      </div>
      <div className="space-y-3">
        {clients.slice(0, 5).map((client) => (
          <div
            key={client.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-linear-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                {client.nom.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-gray-900">{client.nom}</p>
                <p className="text-sm text-gray-500">{client.entreprise}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">
                {formatDate(client.createdAt)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const InteractionsView = ({
  selectedClient,
  interactions,
  clients,
  openModal,
  setSelectedClient,
  handleDeleteInteraction,
  formatDate,
}) => {
  const filteredInteractions = selectedClient
    ? interactions.filter((i) => i.clientId === selectedClient)
    : interactions;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Interactions</h1>
          {selectedClient && (
            <p className="text-gray-500 mt-1">
              Client: {clients.find((c) => c.id === selectedClient)?.nom}
            </p>
          )}
        </div>
        <div className="flex gap-3">
          {selectedClient && (
            <button
              onClick={() => setSelectedClient(null)}
              className="px-6 py-3 rounded-xl font-medium border-2 border-gray-300 hover:border-gray-400 transition-colors"
            >
              Tous les clients
            </button>
          )}
          <button
            onClick={() => openModal("interaction")}
            className="bg-linear-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 shadow-lg hover:shadow-xl transition-all"
          >
            <Plus size={20} />
            Nouvelle interaction
          </button>
        </div>
      </div>

      {/* Interactions Timeline */}
      <div className="space-y-4">
        {filteredInteractions.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <MessageSquare size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">Aucune interaction pour le moment</p>
          </div>
        ) : (
          filteredInteractions.map((interaction) => {
            const client = clients.find((c) => c.id === interaction.clientId);
            const typeColors = {
              Appel: "from-blue-500 to-blue-600",
              Email: "from-purple-500 to-purple-600",
              Réunion: "from-green-500 to-green-600",
              Note: "from-orange-500 to-orange-600",
            };

            return (
              <div
                key={interaction.id}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div
                      className={`px-4 py-2 bg-linear-to-r ${
                        typeColors[interaction.type] ||
                        "from-gray-500 to-gray-600"
                      } text-white rounded-xl font-medium text-sm`}
                    >
                      {interaction.type}
                    </div>
                    {client && (
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-linear-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                          {client.nom.charAt(0)}
                        </div>
                        <span className="font-medium text-gray-700">
                          {client.nom}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openModal("interaction", interaction)}
                      className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteInteraction(interaction.id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {interaction.sujet}
                </h3>
                <p className="text-gray-600 mb-4">{interaction.contenu}</p>

                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock size={16} />
                  {formatDate(interaction.createdAt)}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

const ClientsView = ({
  openModal,
  searchTerm,
  setSearchTerm,
  filteredClients,
  getClientInteractions,
  setSelectedClient,
  setCurrentView,
  handleDeleteClient,
}) => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <h1 className="text-3xl font-bold text-gray-900">Gestion des clients</h1>
      <button
        onClick={() => openModal("client")}
        className="bg-linear-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 shadow-lg hover:shadow-xl transition-all"
      >
        <Plus size={20} />
        Nouveau client
      </button>
    </div>

    {/* Search Bar */}
    <div className="bg-white rounded-2xl shadow-lg p-4">
      <div className="relative">
        <Search
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={20}
        />
        <input
          type="text"
          placeholder="Rechercher un client..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
    </div>

    {/* Clients Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredClients.map((client) => (
        <div
          key={client.id}
          className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="w-14 h-14 bg-linear-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
              {client.nom.charAt(0)}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => openModal("client", client)}
                className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
              >
                <Edit2 size={18} />
              </button>
              <button
                onClick={() => handleDeleteClient(client.id)}
                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mb-1">{client.nom}</h3>
          <p className="text-gray-500 mb-4 flex items-center gap-2">
            <Building size={16} />
            {client.entreprise}
          </p>

          <div className="space-y-2 pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-600 flex items-center gap-2">
              <Mail size={16} />
              {client.email}
            </p>
            <p className="text-sm text-gray-600 flex items-center gap-2">
              <Phone size={16} />
              {client.telephone}
            </p>
            <p className="text-sm text-gray-500 flex items-center gap-2 mt-3">
              <MessageSquare size={16} />
              {getClientInteractions(client.id).length} interaction(s)
            </p>
          </div>

          <button
            onClick={() => {
              setSelectedClient(client.id);
              setCurrentView("interactions");
            }}
            className="w-full mt-4 bg-linear-to-r from-indigo-500 to-purple-500 text-white py-2 rounded-xl font-medium hover:shadow-lg transition-all"
          >
            Voir les interactions
          </button>
        </div>
      ))}
    </div>
  </div>
);

const Modal = ({
  showModal,
  closeModal,
  modalType,
  editingItem,
  clientForm,
  setClientForm,
  interactionForm,
  setInteractionForm,
  handleSaveClient,
  handleSaveInteraction,
  clients,
}) => {
  if (!showModal) return null;

  const isClient = modalType === "client";

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-2xl font-bold text-gray-900">
            {editingItem
              ? `Modifier ${isClient ? "le client" : "l'interaction"}`
              : `Nouveau ${isClient ? "client" : "interaction"}`}
          </h2>
          <button
            onClick={closeModal}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {isClient ? (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom complet *
                </label>
                <input
                  type="text"
                  value={clientForm.nom}
                  onChange={(e) =>
                    setClientForm({ ...clientForm, nom: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Jean Dupont"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Entreprise
                </label>
                <input
                  type="text"
                  value={clientForm.entreprise}
                  onChange={(e) =>
                    setClientForm({
                      ...clientForm,
                      entreprise: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Tech Corp"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  value={clientForm.email}
                  onChange={(e) =>
                    setClientForm({ ...clientForm, email: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="jean@tech.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Téléphone *
                </label>
                <input
                  type="tel"
                  value={clientForm.telephone}
                  onChange={(e) =>
                    setClientForm({
                      ...clientForm,
                      telephone: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="0123456789"
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Client *
                </label>
                <select
                  value={interactionForm.clientId}
                  onChange={(e) =>
                    setInteractionForm({
                      ...interactionForm,
                      clientId: Number(e.target.value),
                    })
                  }
                  className="w-full px-4 py-3 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Sélectionner un client</option>
                  {clients.map((client) => (
                    <option key={client.id} value={client.id}>
                      {client.nom}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type *
                </label>
                <select
                  value={interactionForm.type}
                  onChange={(e) =>
                    setInteractionForm({
                      ...interactionForm,
                      type: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Appel">Appel</option>
                  <option value="Email">Email</option>
                  <option value="Réunion">Réunion</option>
                  <option value="Note">Note</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sujet *
                </label>
                <input
                  type="text"
                  value={interactionForm.sujet}
                  onChange={(e) =>
                    setInteractionForm({
                      ...interactionForm,
                      sujet: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Démo produit"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contenu *
                </label>
                <textarea
                  value={interactionForm.contenu}
                  onChange={(e) =>
                    setInteractionForm({
                      ...interactionForm,
                      contenu: e.target.value,
                    })
                  }
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Description détaillée de l'interaction..."
                />
              </div>
            </>
          )}

          <div className="flex gap-3 pt-4">
            <button
              onClick={closeModal}
              className="flex-1 px-6 py-3 rounded-xl font-medium border-2 border-gray-300 hover:border-gray-400 transition-colors"
            >
              Annuler
            </button>
            <button
              onClick={isClient ? handleSaveClient : handleSaveInteraction}
              className="flex-1 bg-linear-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all"
            >
              {editingItem ? "Modifier" : "Créer"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ModernCRM = () => {
  const [currentView, setCurrentView] = useState("dashboard");
  const [clients, setClients] = useState(mockAPI.clients);
  const [interactions, setInteractions] = useState(mockAPI.interactions);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedClient, setSelectedClient] = useState(null);
  const [editingItem, setEditingItem] = useState(null);

  // Form states
  const [clientForm, setClientForm] = useState({
    nom: "",
    entreprise: "",
    email: "",
    telephone: "",
  });
  const [interactionForm, setInteractionForm] = useState({
    type: "Appel",
    sujet: "",
    contenu: "",
    clientId: "",
  });

  // Statistics
  const stats = {
    totalClients: clients.length,
    totalInteractions: interactions.length,
    recentInteractions: interactions.filter((i) => {
      const daysDiff = (new Date() - i.createdAt) / (1000 * 60 * 60 * 24);
      return daysDiff <= 7;
    }).length,
  };

  // Filtered clients
  const filteredClients = clients.filter(
    (c) =>
      c.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.entreprise.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openModal = (type, item = null) => {
    setModalType(type);
    setEditingItem(item);
    if (type === "client" && item) {
      setClientForm(item);
    } else if (type === "interaction" && item) {
      setInteractionForm(item);
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingItem(null);
    setClientForm({ nom: "", entreprise: "", email: "", telephone: "" });
    setInteractionForm({ type: "Appel", sujet: "", contenu: "", clientId: "" });
  };

  const handleSaveClient = () => {
    if (editingItem) {
      setClients(
        clients.map((c) =>
          c.id === editingItem.id ? { ...clientForm, id: c.id } : c
        )
      );
    } else {
      setClients([
        ...clients,
        { ...clientForm, id: Date.now(), createdAt: new Date() },
      ]);
    }
    closeModal();
  };

  const handleSaveInteraction = () => {
    if (editingItem) {
      setInteractions(
        interactions.map((i) =>
          i.id === editingItem.id ? { ...interactionForm, id: i.id } : i
        )
      );
    } else {
      setInteractions([
        ...interactions,
        { ...interactionForm, id: Date.now(), createdAt: new Date() },
      ]);
    }
    closeModal();
  };

  const handleDeleteClient = (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce client ?")) {
      setClients(clients.filter((c) => c.id !== id));
      setInteractions(interactions.filter((i) => i.clientId !== id));
    }
  };

  const handleDeleteInteraction = (id) => {
    if (
      window.confirm("Êtes-vous sûr de vouloir supprimer cette interaction ?")
    ) {
      setInteractions(interactions.filter((i) => i.id !== id));
    }
  };

  const getClientInteractions = (clientId) => {
    return interactions.filter((i) => i.clientId === clientId);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-xl p-6 flex flex-col">
        <div className="mb-8">
          <h1 className="text-2xl font-bold bg-linear-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
            CRM Moderne
          </h1>
          <p className="text-sm text-gray-500 mt-1">Gestion simplifiée</p>
        </div>

        <nav className="space-y-2 flex-1">
          <NavItem
            icon={Home}
            label="Tableau de bord"
            view="dashboard"
            active={currentView === "dashboard"}
            setCurrentView={setCurrentView}
          />
          <NavItem
            icon={Users}
            label="Clients"
            view="clients"
            active={currentView === "clients"}
            setCurrentView={setCurrentView}
          />
          <NavItem
            icon={MessageSquare}
            label="Interactions"
            view="interactions"
            active={currentView === "interactions"}
            setCurrentView={setCurrentView}
          />
        </nav>

        <button className="flex items-center gap-3 w-full px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-xl transition-all">
          <LogOut size={20} />
          <span className="font-medium">Déconnexion</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        {currentView === "dashboard" && (
          <DashboardView
            stats={stats}
            clients={clients}
            formatDate={formatDate}
            setCurrentView={setCurrentView}
          />
        )}
        {currentView === "clients" && (
          <ClientsView
            openModal={openModal}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filteredClients={filteredClients}
            formatDate={formatDate}
            getClientInteractions={getClientInteractions}
            setSelectedClient={setSelectedClient}
            setCurrentView={setCurrentView}
            handleDeleteClient={handleDeleteClient}
          />
        )}
        {currentView === "interactions" && (
          <InteractionsView
            selectedClient={selectedClient}
            interactions={interactions}
            clients={clients}
            openModal={openModal}
            setSelectedClient={setSelectedClient}
            handleDeleteInteraction={handleDeleteInteraction}
            formatDate={formatDate}
          />
        )}
      </div>

      <Modal
        showModal={showModal}
        closeModal={closeModal}
        modalType={modalType}
        editingItem={editingItem}
        clientForm={clientForm}
        setClientForm={setClientForm}
        interactionForm={interactionForm}
        setInteractionForm={setInteractionForm}
        handleSaveClient={handleSaveClient}
        handleSaveInteraction={handleSaveInteraction}
        clients={clients}
      />
    </div>
  );
};

export default ModernCRM;
