
import React from 'react';
import type { RedditPost } from '../types';
import { PostCard } from './PostCard';

interface PostGridProps {
  posts: RedditPost[];
}

export const PostGrid: React.FC<PostGridProps> = ({ posts }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post, index) => (
        <PostCard key={`${post.url}-${index}`} post={post} />
      ))}
    </div>
  );
};
