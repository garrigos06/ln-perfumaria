import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./lib/AuthContext"
import ProtectedRoute from "./components/admin/ProtectedRoute"
import Home from "./pages/Home"
import Login from "./pages/admin/Login"
import Dashboard from "./pages/admin/Dashboard"

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin/login" element={<Login />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
