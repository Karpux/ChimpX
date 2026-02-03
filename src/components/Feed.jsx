import Composer from './Composer';
import PostCard from './PostCard';

export default function Feed({
  posts,
  composerText,
  onComposerChange,
  onPublish,
  remainingCharacters,
  loading,
  status,
}) {
  return (
    <section className="feed">
      <Composer
        composerText={composerText}
        onChange={onComposerChange}
        onPublish={onPublish}
        remainingCharacters={remainingCharacters}
        loading={loading}
        status={status}
      />

      <div className="feed-header">
        <h3>Tu feed</h3>
        <button className="ghost">Ver todo</button>
      </div>

      <div className="posts">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}
