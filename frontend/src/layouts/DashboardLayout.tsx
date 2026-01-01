import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <main className="pt-6 pb-10">
      <Outlet />
    </main>
  );
}

