import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* 🔥 THIS WAS MISSING */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
