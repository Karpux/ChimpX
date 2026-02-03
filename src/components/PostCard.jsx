export default function PostCard({ post }) {
  return (
    <article className="post-card">
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
  );
}
