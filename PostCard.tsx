import React from 'react';
import type { RedditPost } from '../types';
import { UpvoteIcon, CommentIcon, LinkIcon } from './IconComponents';

interface PostCardProps {
  post: RedditPost;
  onViewThread: (post: RedditPost) => void;
}

const getCleanRedditUrls = (post: RedditPost): { postUrl: string; subredditUrl: string } => {
  const fallbackSubreddit = (post.subreddit || '').replace(/^r\//, '');
  const fallbackSubredditUrl = `https://www.reddit.com/r/${fallbackSubreddit}`;

  if (!post.url) {
    return { postUrl: fallbackSubredditUrl, subredditUrl: fallbackSubredditUrl };
  }

  try {
    const fullUrl = post.url.startsWith('http')
      ? post.url
      : `https://www.reddit.com${post.url.startsWith('/') ? '' : '/'}${post.url}`;
    
    const urlObject = new URL(fullUrl);
    const match = urlObject.pathname.match(/\/r\/([a-zA-Z0-9_]+)\/comments\/([a-zA-Z0-9]+)/);

    if (match && match[1] && match[2]) {
      const subreddit = match[1];
      const postId = match[2];
      const canonicalPostUrl = `https://www.reddit.com/r/${subreddit}/comments/${postId}/`;
      const canonicalSubredditUrl = `https://www.reddit.com/r/${subreddit}/`;
      return { postUrl: canonicalPostUrl, subredditUrl: canonicalSubredditUrl };
    }

    return { postUrl: fullUrl, subredditUrl: fallbackSubredditUrl };
  } catch (error) {
    console.warn('Could not parse URL, attempting to build a safe fallback:', post.url, error);
    const safeUrl = `https://www.reddit.com${post.url.startsWith('/') ? '' : '/'}${post.url}`;
    return { postUrl: safeUrl, subredditUrl: fallbackSubredditUrl };
  }
};

export const PostCard: React.FC<PostCardProps> = ({ post, onViewThread }) => {
  const { postUrl, subredditUrl } = getCleanRedditUrls(post);

  // FIX: Broaden the event type to accept both mouse and keyboard events to satisfy TypeScript and allow the component to be accessible.
  const handleCardClick = (e: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) => {
    // Prevent click from firing when clicking on an actual link inside the card
    if ((e.target as HTMLElement).closest('a')) {
      return;
    }
    onViewThread(post);
  };

  return (
    <div
      className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-5 flex flex-col h-full hover:border-indigo-500 transition-colors duration-300 transform hover:-translate-y-1 cursor-pointer group"
      onClick={handleCardClick}
      onKeyPress={(e) => e.key === 'Enter' && handleCardClick(e)}
      role="button"
      tabIndex={0}
      aria-label={`View details for post: ${post.title}`}
    >
      <div className="flex-grow">
        <div className="flex justify-between items-start mb-2">
          <a
            href={subredditUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-indigo-400 hover:underline z-10 relative"
            aria-label={`View subreddit ${post.subreddit}`}
          >
            {post.subreddit}
          </a>
          <a
            href={postUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-indigo-400 transition-colors duration-200 z-10 relative"
            aria-label="View original post on Reddit"
          >
            <LinkIcon className="w-5 h-5" />
          </a>
        </div>
        <h3 className="text-lg font-bold text-gray-100 mb-3 group-hover:text-indigo-300 transition-colors">{post.title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed border-l-2 border-gray-600 pl-3 italic">
          {post.topCommentsSummary}
        </p>
      </div>
      <div className="mt-4 pt-4 border-t border-gray-700 flex items-center justify-start space-x-6 text-sm text-gray-400">
        <div className="flex items-center space-x-2" aria-label={`${post.score.toLocaleString()} upvotes`}>
          <UpvoteIcon className="w-5 h-5 text-orange-500" />
          <span>{post.score.toLocaleString()}</span>
        </div>
        <button
          onClick={() => onViewThread(post)}
          className="flex items-center space-x-2 hover:text-sky-400 transition-colors duration-200 z-10 relative"
          aria-label={`View ${post.commentCount.toLocaleString()} comments in thread viewer`}
        >
          <CommentIcon className="w-5 h-5 text-sky-500" />
          <span>{post.commentCount.toLocaleString()}</span>
        </button>
      </div>
    </div>
  );
};
