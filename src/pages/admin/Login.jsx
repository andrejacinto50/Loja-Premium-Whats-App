import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import {
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const navigate = useNavigate();

  const {
    login,
    isAuthenticated
  } = useAuth();

  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setError('');
    setLoading(true);

    try {
      await login(
        form.email,
        form.password
      );

      navigate('/admin');
    } catch (error) {
      console.error(error);

      setError(
        'E-mail ou senha inválidos.'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="admin-login">
      <div className="admin-login-bg"></div>

      <form
        className="admin-card small"
        onSubmit={handleSubmit}
      >
        <div className="admin-login-top">
          <div className="admin-login-icon">
            <ShieldCheck size={24} />
          </div>

          <span>Área administrativa</span>
        </div>

        <div className="admin-login-head">
          <h1>Login Admin</h1>

          <p>
            Acesse o painel premium da loja
            para gerenciar produtos,
            banners e configurações.
          </p>
        </div>

        <div className="admin-input-group">
          <label>E-mail</label>

          <div className="admin-input">
            <Mail size={18} />

            <input
              type="email"
              placeholder="Digite seu E-mail"
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value
                })
              }
            />
          </div>
        </div>

        <div className="admin-input-group">
          <label>Senha</label>

          <div className="admin-input">
            <Lock size={18} />

            <input
              type="password"
              placeholder="Digite sua senha"
              value={form.password}
              onChange={(e) =>
                setForm({
                  ...form,
                  password: e.target.value
                })
              }
            />
          </div>
        </div>

        {error && (
          <div className="admin-error">
            {error}
          </div>
        )}

        <button
          className="btn btn-primary admin-submit"
          type="submit"
          disabled={loading}
        >
          {loading
            ? 'Entrando...'
            : 'Entrar no painel'}

          <ArrowRight size={18} />
        </button>
      </form>
    </section>
  );
}