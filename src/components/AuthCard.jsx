export default function AuthCard({
  user,
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onLogin,
  onLogout,
  status,
  loading,
}) {
  if (user) {
    return (
      <div className="auth-card">
        <div>
          <h4>Bienvenido, {user.name}</h4>
          <p>Sesión activa en ChimpX.</p>
        </div>
        <button className="ghost" onClick={onLogout}>
          Cerrar sesión
        </button>
        <span className="auth-status">{status}</span>
      </div>
    );
  }

  return (
    <div className="auth-card">
      <div>
        <h4>Inicia sesión</h4>
        <p>Accede para publicar y seguir conversaciones.</p>
      </div>
      <div className="auth-form">
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={onEmailChange}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={onPasswordChange}
        />
      </div>
      <button className="primary" onClick={onLogin} disabled={loading}>
        {loading ? 'Ingresando...' : 'Ingresar'}
      </button>
      <span className="auth-status">{status}</span>
    </div>
  );
}
