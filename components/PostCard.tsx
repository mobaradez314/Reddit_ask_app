
import React from 'react';
import type { RedditPost } from '../types';
import { UpvoteIcon, CommentIcon, LinkIcon } from './IconComponents';

interface PostCardProps {
  post: RedditPost;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-5 flex flex-col h-full hover:border-indigo-500 transition-colors duration-300 transform hover:-translate-y-1">
      <div className="flex-grow">
        <div className="flex justify-between items-start mb-2">
            <span className="text-sm font-semibold text-indigo-400">{post.subreddit}</span>
            <a href={post.url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-indigo-400 transition-colors duration-200">
                <LinkIcon className="w-5 h-5" />
            </a>
        </div>
        <h3 className="text-lg font-bold text-gray-100 mb-3">{post.title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed border-l-2 border-gray-600 pl-3 italic">
            {post.topCommentsSummary}
        </p>
      </div>
      <div className="mt-4 pt-4 border-t border-gray-700 flex items-center justify-start space-x-6 text-sm text-gray-400">
        <div className="flex items-center space-x-2">
          <UpvoteIcon className="w-5 h-5 text-orange-500" />
          <span>{post.score.toLocaleString()}</span>
        </div>
        <div className="flex items-center space-x-2">
          <CommentIcon className="w-5 h-5 text-sky-500" />
          <span>{post.commentCount.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};
