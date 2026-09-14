import { useState, type FormEvent } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import logo from "../../assets/media/logo.png"
import { useAuth } from "../../lib/AuthContext"

export default function Login() {
  const { signIn, session, loading } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  if (!loading && session) {
    return <Navigate to="/admin" replace />
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    const { error } = await signIn(email, password)
    setSubmitting(false)
    if (error) {
      setError(error)
      return
    }
    navigate("/admin")
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-5">
      <div className="w-full max-w-sm rounded-sm bg-cream p-8 shadow-xl">
        <div className="flex flex-col items-center">
          <img src={logo} alt="Perfumaria LN" className="h-16 w-16 rounded-full object-cover" />
          <h1 className="mt-4 font-display text-2xl text-ink">Painel Administrativo</h1>
          <p className="mt-1 text-xs uppercase tracking-widest text-ink-soft/60">Perfumaria LN</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
          <div>
            <label className="mb-1 block text-xs uppercase tracking-wide text-ink-soft">E-mail</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-black/10 bg-white px-3 py-2.5 text-sm outline-none focus:border-gold"
              autoComplete="username"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs uppercase tracking-wide text-ink-soft">Senha</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-black/10 bg-white px-3 py-2.5 text-sm outline-none focus:border-gold"
              autoComplete="current-password"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="mt-2 bg-ink py-3 text-xs uppercase tracking-widest text-cream transition-colors hover:bg-gold-dark disabled:opacity-50"
          >
            {submitting ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  )
}
