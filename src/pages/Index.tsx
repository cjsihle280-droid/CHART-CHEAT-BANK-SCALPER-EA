import { useState } from "react";
import LicenseEntry from "@/components/ui/LicenseEntry";
import AdminLogin from "@/components/ui/AdminLogin";
import AdminDashboard from "@/components/ui/AdminDashboard";
import TradingApp from "@/components/ui/TradingApp";

export type AppView = "home" | "admin-login" | "admin-dashboard";

const Index = () => {
  const [view, setView] = useState<AppView>("home");
  const [licensed, setLicensed] = useState(false);
  const [adminSession, setAdminSession] = useState(false);

  if (licensed) {
    return <TradingApp onExit={() => setLicensed(false)} />;
  }

  if (view === "admin-dashboard" && adminSession) {
    return <AdminDashboard onBack={() => { setView("home"); setAdminSession(false); }} />;
  }

  if (view === "admin-login") {
    return (
      <AdminLogin
        onBack={() => setView("home")}
        onSuccess={() => { setAdminSession(true); setView("admin-dashboard"); }}
      />
    );
  }

  return (
    <LicenseEntry
      onLicensed={() => setLicensed(true)}
      onAdminClick={() => setView("admin-login")}
    />
  );
};

export default Index;