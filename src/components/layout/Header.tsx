import React from "react";
import { Edit3, LogOut, User } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "../ui/Button";

interface HeaderProps {
  onHomeClick: () => void;
  onAuthClick: () => void;
  onDashboardClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onHomeClick,
  onAuthClick,
  onDashboardClick,
}) => {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <header className="border-b bg-background px-4 py-4">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2" onClick={onHomeClick}>
          <Edit3 className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold">Scribl</h1>
        </div>

        <div className="flex items-center space-x-3">
          {user ? (
            <>
              <Button variant="outline" size="sm" onClick={onDashboardClick}>
                <User className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </>
          ) : (
            <Button onClick={onAuthClick}>Get Started</Button>
          )}
        </div>
      </div>
    </header>
  );
};
