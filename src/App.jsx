import { useMemo, useState } from 'react';
import Feed from './components/Feed';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
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
  const [user, setUser] = useState(null);
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authStatus, setAuthStatus] = useState('Ingresa para personalizar tu feed.');
  const [authLoading, setAuthLoading] = useState(false);

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
      author: user?.name || 'Tú',
      handle: user?.handle || '@tu.perfil',
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

  const handleLogin = async () => {
    if (!authEmail || !authPassword) {
      setAuthStatus('Completa correo y contraseña.');
      return;
    }

    setAuthLoading(true);

    if (import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: authEmail,
        password: authPassword,
      });

      if (error) {
        setAuthStatus('No pudimos iniciar sesión. Revisa tus datos.');
      } else {
        const name = data.user?.email?.split('@')[0] || 'Usuario';
        setUser({ name, handle: `@${name}` });
        setAuthStatus('Sesión activa en Supabase.');
      }
    } else {
      const name = authEmail.split('@')[0] || 'Usuario';
      setUser({ name, handle: `@${name}` });
      setAuthStatus('Sesión demo activa.');
    }

    setAuthLoading(false);
  };

  const handleLogout = async () => {
    if (import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY) {
      await supabase.auth.signOut();
    }

    setUser(null);
    setAuthEmail('');
    setAuthPassword('');
    setAuthStatus('Sesión cerrada.');
  };

  return (
    <div className="app">
      <Topbar user={user} onLogout={handleLogout} />

      <main className="layout">
        <Feed
          posts={posts}
          composerText={composerText}
          onComposerChange={(event) => setComposerText(event.target.value)}
          onPublish={handlePublish}
          remainingCharacters={remainingCharacters}
          loading={loading}
          status={status}
        />

        <Sidebar
          topics={topics}
          sessions={sessions}
          user={user}
          authEmail={authEmail}
          authPassword={authPassword}
          onAuthEmailChange={(event) => setAuthEmail(event.target.value)}
          onAuthPasswordChange={(event) => setAuthPassword(event.target.value)}
          onLogin={handleLogin}
          onLogout={handleLogout}
          authStatus={authStatus}
          authLoading={authLoading}
        />
      </main>
    </div>
  );
}
