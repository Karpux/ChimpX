export default function Panel({ title, items }) {
  return (
    <div className="panel">
      <h4>{title}</h4>
      <ul>
        {items.map((item) => (
          <li key={item.label || item.name}>
            <span>{item.label || item.name}</span>
            <strong>{item.metric || item.detail}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}
