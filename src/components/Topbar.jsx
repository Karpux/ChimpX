export default function Topbar({ user, onLogout }) {
  return (
    <header className="topbar">
      <div className="brand">
        <span className="brand-icon">◎</span>
        <div>
          <p className="brand-name">ChimpX</p>
          <p className="brand-subtitle">Conecta en tiempo real</p>
        </div>
      </div>
      <nav className="topbar-nav">
        <a className="nav-link" href="#inicio">
          Inicio
        </a>
        <a className="nav-link" href="#explorar">
          Explorar
        </a>
        <a className="nav-link" href="#mensajes">
          Mensajes
        </a>
      </nav>
      <div className="topbar-actions">
        <label className="search">
          <span>Buscar</span>
          <input placeholder="Buscar en ChimpX" />
        </label>
        <button className="primary">Nuevo hilo</button>
        <div className="user-chip">
          <span>{user ? user.name : 'Invitado'}</span>
          {user ? (
            <button className="ghost" onClick={onLogout}>
              Salir
            </button>
          ) : null}
        </div>
      </div>
    </header>
  );
}
