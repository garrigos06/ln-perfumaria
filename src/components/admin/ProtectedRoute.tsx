import type { ReactNode } from "react"
import { Navigate } from "react-router-dom"
import { useAuth } from "../../lib/AuthContext"

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { session, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-cream text-ink-soft">
        Carregando...
      </div>
    )
  }

  if (!session) {
    return <Navigate to="/admin/login" replace />
  }

  return <>{children}</>
}
