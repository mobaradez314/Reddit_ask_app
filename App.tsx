
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { TopicForm } from './components/TopicForm';
import { PostGrid } from './components/PostGrid';
import { LoadingOverlay } from './components/LoadingOverlay';
import { ErrorMessage } from './components/ErrorMessage';
import { fetchRedditThreads, generateTopicSummaries } from './services/geminiService';
import type { RedditPost, TopicSummaries } from './types';
import { Welcome } from './components/Welcome';
import { SummaryTabs } from './components/SummaryTabs';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [posts, setPosts] = useState<RedditPost[]>([]);
  const [summaries, setSummaries] = useState<TopicSummaries | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleScrape = useCallback(async () => {
    if (!prompt.trim()) {
      setError('Please enter a topic to search for.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setPosts([]);
    setSummaries(null);

    try {
      // Step 1: Fetch individual Reddit threads
      const results = await fetchRedditThreads(prompt);
      setPosts(results);

      // Step 2: If threads are found, generate high-level summaries
      if (results.length > 0) {
        const topicSummaries = await generateTopicSummaries(prompt, results);
        setSummaries(topicSummaries);
      } else {
        // If no posts are found, show a message instead of an error
        setError("No relevant Reddit threads were found for this topic. Please try a different search.");
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred while fetching or analyzing data. The model may be unable to find relevant content or an API error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [prompt]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <TopicForm
          prompt={prompt}
          setPrompt={setPrompt}
          onSubmit={handleScrape}
          isLoading={isLoading}
        />
        
        {isLoading && <LoadingOverlay />}
        
        {error && <ErrorMessage message={error} />}

        {!isLoading && summaries && <SummaryTabs summaries={summaries} />}
        
        {!isLoading && posts.length === 0 && !error && (
          <Welcome />
        )}
        
        {!isLoading && posts.length > 0 && <PostGrid posts={posts} />}
      </main>
    </div>
  );
};

export default App;
