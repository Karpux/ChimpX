import { useMemo, useState } from 'react';
import { supabase } from './supabaseClient';

const demoPosts = [
  {
    id: 1,
    author: 'Luna Martínez',
    handle: '@luna.codes',
    time: 'Hace 2 min',
    content:
      'Probando ChimpX Threads ✨. Hoy configuramos Supabase y un feed en tiempo real.',
    likes: 128,
    replies: 24,
    tags: ['build', 'supabase'],
  },
  {
    id: 2,
    author: 'Mateo Reyes',
    handle: '@mateo',
    time: 'Hace 12 min',
    content:
      'Idea: hilo sobre cómo organizar tu contenido en micro-posts para mantenerlo fresco.',
    likes: 74,
    replies: 11,
    tags: ['tips'],
  },
  {
    id: 3,
    author: 'Sofía Vega',
    handle: '@sofia.vega',
    time: 'Hace 35 min',
    content:
      'Diseño minimal + typography bold = UI limpia. ¿Qué tipografías usan ustedes?',
    likes: 201,
    replies: 39,
    tags: ['design', 'ux'],
  },
];

const topics = [
  { label: 'Tendencias', metric: '12.4k posts' },
  { label: 'Productividad', metric: '8.1k posts' },
  { label: 'Diseño UI', metric: '5.3k posts' },
  { label: 'IA Creativa', metric: '4.9k posts' },
];

const sessions = [
  { name: 'Chess & Code', time: '17:00', attendees: '312' },
  { name: 'Taller de Supabase', time: '19:30', attendees: '528' },
];

const maxCharacters = 240;

export default function App() {
  const [posts, setPosts] = useState(demoPosts);
  const [composerText, setComposerText] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('Modo demo activo');

  const remainingCharacters = useMemo(
    () => maxCharacters - composerText.length,
    [composerText]
  );

  const handlePublish = async () => {
    if (!composerText.trim()) {
      return;
    }

    const newPost = {
      id: Date.now(),
      author: 'Tú',
      handle: '@tu.perfil',
      time: 'Ahora',
      content: composerText,
      likes: 0,
      replies: 0,
      tags: ['nuevo'],
    };

    setLoading(true);

    if (import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY) {
      const { error } = await supabase
        .from('posts')
        .insert([{ content: composerText, author: 'Tú', handle: '@tu.perfil' }]);

      if (error) {
        setStatus('No se pudo publicar en Supabase. Mostrando en local.');
      } else {
        setStatus('Publicado en Supabase ✨');
      }
    } else {
      setStatus('Sin credenciales de Supabase. Publicado en local.');
    }

    setPosts((prev) => [newPost, ...prev]);
    setComposerText('');
    setLoading(false);
  };

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <span className="brand-icon">◎</span>
          <div>
            <p className="brand-name">ChimpX Threads</p>
            <p className="brand-subtitle">Comparte ideas en hilos cortos</p>
          </div>
        </div>
        <div className="actions">
          <button className="ghost">Explorar</button>
          <button className="primary">Nuevo hilo</button>
        </div>
      </header>

      <main className="layout">
        <section className="feed">
          <div className="composer">
            <div className="composer-header">
              <div>
                <h2>¿Qué estás pensando?</h2>
                <p>Escribe un hilo y compártelo con la comunidad.</p>
              </div>
              <span className="badge">{status}</span>
            </div>
            <textarea
              placeholder="Cuenta algo en menos de 240 caracteres..."
              value={composerText}
              onChange={(event) => setComposerText(event.target.value)}
              maxLength={maxCharacters}
            />
            <div className="composer-footer">
              <span className={remainingCharacters < 20 ? 'warn' : ''}>
                {remainingCharacters} caracteres restantes
              </span>
              <button
                className="primary"
                onClick={handlePublish}
                disabled={loading || !composerText.trim()}
              >
                {loading ? 'Publicando...' : 'Publicar'}
              </button>
            </div>
          </div>

          <div className="feed-header">
            <h3>Tu feed</h3>
            <button className="ghost">Ver todo</button>
          </div>

          <div className="posts">
            {posts.map((post) => (
              <article key={post.id} className="post-card">
                <div className="post-avatar">{post.author[0]}</div>
                <div className="post-body">
                  <div className="post-meta">
                    <div>
                      <span className="post-author">{post.author}</span>
                      <span className="post-handle">{post.handle}</span>
                    </div>
                    <span className="post-time">{post.time}</span>
                  </div>
                  <p className="post-content">{post.content}</p>
                  <div className="post-tags">
                    {post.tags.map((tag) => (
                      <span key={tag} className="tag">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <div className="post-actions">
                    <span>❤ {post.likes}</span>
                    <span>💬 {post.replies}</span>
                    <span>↗ Compartir</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <aside className="sidebar">
          <div className="profile-card">
            <div className="profile-avatar">CX</div>
            <h4>ChimpX Studio</h4>
            <p>
              Construye, conversa y conecta con creadores que piensan en grande.
            </p>
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

          <div className="panel">
            <h4>Tendencias</h4>
            <ul>
              {topics.map((topic) => (
                <li key={topic.label}>
                  <span>{topic.label}</span>
                  <strong>{topic.metric}</strong>
                </li>
              ))}
            </ul>
          </div>

          <div className="panel">
            <h4>Próximos directos</h4>
            <ul>
              {sessions.map((session) => (
                <li key={session.name}>
                  <span>{session.name}</span>
                  <strong>
                    {session.time} · {session.attendees} asistentes
                  </strong>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </main>
    </div>
  );
}
