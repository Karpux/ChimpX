import Panel from './Panel';
import ProfileCard from './ProfileCard';

export default function Sidebar({ topics, sessions }) {
  const sessionItems = sessions.map((session) => ({
    name: session.name,
    detail: `${session.time} · ${session.attendees} asistentes`,
  }));

  return (
    <aside className="sidebar">
      <ProfileCard />
      <Panel title="Tendencias" items={topics} />
      <Panel title="Próximos directos" items={sessionItems} />
    </aside>
  );
}
