export default function ProfileCard() {
  return (
    <div className="profile-card">
      <div className="profile-avatar">CX</div>
      <h4>ChimpX Studio</h4>
      <p>Construye, conversa y conecta con creadores que piensan en grande.</p>
      <div className="profile-stats">
        <div>
          <strong>3.8k</strong>
          <span>Seguidores</span>
        </div>
        <div>
          <strong>142</strong>
          <span>Siguiendo</span>
        </div>
      </div>
      <button className="primary">Completar perfil</button>
    </div>
  );
}
