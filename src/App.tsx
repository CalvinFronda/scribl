import React, { useState } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import { Header } from "./components/layout/Header";
import { LandingPage } from "./pages/LandingPage";
import { Dashboard } from "./pages/Dashboard";
import { AuthForm } from "./components/auth/AuthForm";

type View = "landing" | "dashboard";

function App() {
  const [currentView, setCurrentView] = useState<View>("landing");
  const [showAuthForm, setShowAuthForm] = useState(false);

  const handleAuthClick = () => {
    setShowAuthForm(true);
  };

  const handleAuthClose = () => {
    setShowAuthForm(false);
  };

  const handleDashboardClick = () => {
    setCurrentView("dashboard");
  };

  const handleBackToLanding = () => {
    setCurrentView("landing");
  };

  return (
    <AuthProvider>
      <div className="min-h-screen bg-background cursor-pointer">
        <Header
          onHomeClick={handleBackToLanding}
          onAuthClick={handleAuthClick}
          onDashboardClick={handleDashboardClick}
        />

        <main>
          {currentView === "landing" ? (
            <LandingPage onAuthClick={handleAuthClick} />
          ) : (
            <Dashboard onBack={handleBackToLanding} />
          )}
        </main>

        {showAuthForm && <AuthForm onClose={handleAuthClose} />}
      </div>
    </AuthProvider>
  );
}

export default App;
