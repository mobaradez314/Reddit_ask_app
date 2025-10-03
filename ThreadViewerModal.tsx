import React from 'react';
import type { RedditPost, ThreadContent } from '../types';
import { LinkIcon } from './IconComponents';

interface ThreadViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: RedditPost;
  content: ThreadContent | null;
  isLoading: boolean;
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

const renderMarkdownContent = (text: string) => {
    const lines = text.split('\n').filter(line => line.trim() !== '');
    return (
        <ul>
            {lines.map((line, index) => {
                const isListItem = line.trim().startsWith('*') || line.trim().startsWith('-');
                const lineContent = isListItem ? line.trim().substring(1).trim() : line;
                return (
                    <li key={index} className={isListItem ? "flex items-start mb-2" : "mb-2"}>
                        {isListItem && <span className="mr-3 mt-1 text-gray-500">•</span>}
                        <span>{lineContent}</span>
                    </li>
                );
            })}
        </ul>
    );
};

export const ThreadViewerModal: React.FC<ThreadViewerModalProps> = ({ isOpen, onClose, post, content, isLoading }) => {
  if (!isOpen) return null;

  const { postUrl } = getCleanRedditUrls(post);

  return (
    <div
      className="fixed inset-0 bg-gray-900 bg-opacity-80 backdrop-blur-sm z-50 flex justify-center items-center p-4"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="bg-gray-800 border border-gray-700 rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="p-5 border-b border-gray-700 flex justify-between items-center flex-shrink-0">
          <h2 className="text-xl font-bold text-white pr-8">{post.title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors" aria-label="Close modal">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </header>

        <main className="p-6 overflow-y-auto flex-grow">
          {isLoading && (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <svg className="animate-spin h-8 w-8 text-indigo-400 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="text-lg text-gray-300">AI is fetching thread details...</p>
            </div>
          )}
          {content && (
            <div className="prose prose-invert prose-sm text-gray-300 max-w-none leading-relaxed">
              <h3 className="text-gray-400 text-sm uppercase tracking-wider font-semibold">Original Post</h3>
              <div className="p-4 bg-gray-900/50 rounded-md mb-6">
                <p className="italic">{content.postBody}</p>
              </div>

              <h3 className="text-gray-400 text-sm uppercase tracking-wider font-semibold">Key Discussion Points</h3>
              {renderMarkdownContent(content.keyDiscussionPoints)}
            </div>
          )}
        </main>
        
        <footer className="p-4 bg-gray-800/50 border-t border-gray-700 flex-shrink-0 text-right">
            <a href={postUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-gray-800">
                View Original on Reddit
                <LinkIcon className="ml-2 -mr-1 h-4 w-4" />
            </a>
        </footer>
      </div>
    </div>
  );
};
