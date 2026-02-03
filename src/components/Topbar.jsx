export default function Topbar() {
  return (
    <header className="topbar">
      <div className="brand">
        <span className="brand-icon">◎</span>
        <div>
          <p className="brand-name">ChimpX</p>
          <p className="brand-subtitle">Tu comunidad en hilos cortos</p>
        </div>
      </div>
      <div className="actions">
        <button className="ghost">Explorar</button>
        <button className="primary">Publicar</button>
      </div>
    </header>
  );
}
