import { useState } from "react";
import { Edit3, Lock, LogOut, User } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "../ui/Button";
import { AuthForm } from "../auth/AuthForm";
import { useNavigate } from "react-router";

export const Header = () => {
  const { user, signOut } = useAuth();
  const [showAuthForm, setShowAuthForm] = useState(false);
  let navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleAuthClick = () => {
    setShowAuthForm(true);
  };

  const handleAuthClose = () => {
    setShowAuthForm(false);
  };

  return (
    <header className="border-b bg-background px-4 py-4">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div
          className="flex items-center space-x-2"
          onClick={() => navigate("/")}
        >
          <Edit3 className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold">Scribl</h1>
        </div>

        <div className="flex items-center space-x-3">
          {user ? (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate("/dashboard")}
              >
                <User className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate("/private")}
              >
                <Lock className="h-4 w-4 mr-2" />
                Private Journal
              </Button>
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </>
          ) : (
            <Button onClick={handleAuthClick}>Get Started</Button>
          )}
        </div>
        {showAuthForm && <AuthForm onClose={handleAuthClose} />}
      </div>
    </header>
  );
};
