import { getRoleFromToken } from "../AuthComponents/auth";

function AdminRoute({ children }: { children: React.ReactNode }) {
  const role = getRoleFromToken();
  if (role !== "ADMIN") {
    alert("❌ Access denied (admin only)");
    window.location.href = "/home";
  }
  return <>{children}</>;
}

export default AdminRoute;
