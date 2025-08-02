import { Outlet } from "react-router-dom";
import { Header } from "@/components/layout/Header";

export default function RootLayout() {
  return (
    <div>
      <Header />
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
}
