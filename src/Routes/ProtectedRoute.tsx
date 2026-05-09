function isLoggedIn() {
  const token = localStorage.getItem("token");
  return !!token;
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  if (!isLoggedIn()) {
    window.location.href = "/login";
  }
  return <>{children}</>;
}

export default ProtectedRoute;
