import AuthCard from './AuthCard';
import Panel from './Panel';
import ProfileCard from './ProfileCard';

export default function Sidebar({
  topics,
  sessions,
  user,
  authEmail,
  authPassword,
  onAuthEmailChange,
  onAuthPasswordChange,
  onLogin,
  onLogout,
  authStatus,
  authLoading,
}) {
  const sessionItems = sessions.map((session) => ({
    name: session.name,
    detail: `${session.time} · ${session.attendees} asistentes`,
  }));

  return (
    <aside className="sidebar">
      <AuthCard
        user={user}
        email={authEmail}
        password={authPassword}
        onEmailChange={onAuthEmailChange}
        onPasswordChange={onAuthPasswordChange}
        onLogin={onLogin}
        onLogout={onLogout}
        status={authStatus}
        loading={authLoading}
      />
      <ProfileCard />
      <Panel title="Tendencias" items={topics} />
      <Panel title="Próximos directos" items={sessionItems} />
    </aside>
  );
}
