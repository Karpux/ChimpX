export default function Composer({
  composerText,
  onChange,
  onPublish,
  remainingCharacters,
  loading,
  status,
}) {
  return (
    <div className="composer">
      <div className="composer-header">
        <div>
          <h2>¿Qué está pasando?</h2>
          <p>Comparte una idea rápida con tu comunidad.</p>
        </div>
        <span className="badge">{status}</span>
      </div>
      <textarea
        placeholder="Escribe un hilo en menos de 240 caracteres..."
        value={composerText}
        onChange={onChange}
        maxLength={240}
      />
      <div className="composer-footer">
        <span className={remainingCharacters < 20 ? 'warn' : ''}>
          {remainingCharacters} caracteres restantes
        </span>
        <button
          className="primary"
          onClick={onPublish}
          disabled={loading || !composerText.trim()}
        >
          {loading ? 'Publicando...' : 'Publicar'}
        </button>
      </div>
    </div>
  );
}
