import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./AuthComponents/Login";
import OAuthSuccess from "./AuthComponents/OAuthSuccess";
import Home from "./HomeComponents/Home";
import Watch from "./VideoComponents/Watch";
import Admin from "./Admin/AdminUpload";
import AdminRoute from "./Routes/AdminRoute";
import ProtectedRoute from "./Routes/ProtectedRoute";
import ShowWatchlist from "./WatchlistComponents/ShowWatchlist";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Default route */}
          <Route path="/" element={<Navigate to="/login" />} />

          {/* Login page */}
          <Route path="/login" element={<Login />} />

          {/* OAuth redirect */}
          <Route path="/oauth-success" element={<OAuthSuccess />} />

          {/* Future pages */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/watch/:fileName"
            element={
              <ProtectedRoute>
                <Watch />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <Admin />
              </AdminRoute>
            }
          />

          <Route path="/watchlist" element={<ShowWatchlist />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
