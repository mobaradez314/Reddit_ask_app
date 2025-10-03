import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { TopicForm } from './components/TopicForm';
import { PostGrid } from './components/PostGrid';
import { LoadingOverlay } from './components/LoadingOverlay';
import { ErrorMessage } from './components/ErrorMessage';
import { generateTopicSummaries, fetchRedditThreads, fetchThreadDetails, generateAnalysisReport } from './services/geminiService';
import type { RedditPost, TopicSummaries, ThreadContent, AnalysisDetailLevel } from './types';
import { Welcome } from './components/Welcome';
import { SummaryTabs } from './components/SummaryTabs';
import { ThreadViewerModal } from './components/ThreadViewerModal';
import { AnalysisToolbar } from './components/AnalysisToolbar';
import { AnalysisReportModal } from './components/AnalysisReportModal';


const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [posts, setPosts] = useState<RedditPost[]>([]);
  const [summaries, setSummaries] = useState<TopicSummaries | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [selectedPost, setSelectedPost] = useState<RedditPost | null>(null);
  const [threadContent, setThreadContent] = useState<ThreadContent | null>(null);
  const [isModalLoading, setIsModalLoading] = useState<boolean>(false);

  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);
  const [reportContent, setReportContent] = useState<TopicSummaries | null>(null);
  const [isReportLoading, setIsReportLoading] = useState<boolean>(false);
  const [analysisLevel, setAnalysisLevel] = useState<AnalysisDetailLevel | null>(null);


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
      const results = await fetchRedditThreads(prompt);
      setPosts(results);

      if (results.length > 0) {
        const topicSummaries = await generateTopicSummaries(prompt, results);
        setSummaries(topicSummaries);
      } else {
        setError("No relevant Reddit threads were found for this topic. Please try a different search.");
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred while fetching or analyzing data. The model may be unable to find relevant content or an API error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [prompt]);

  const handleViewThread = useCallback(async (post: RedditPost) => {
    setSelectedPost(post);
    setIsModalLoading(true);
    setThreadContent(null);
    setError(null);

    try {
      const content = await fetchThreadDetails(post.url);
      setThreadContent(content);
    } catch (err) {
      console.error(err);
      setError(`Failed to load thread details for "${post.title}". Please try again.`);
      setSelectedPost(null); // Close modal on error
    } finally {
      setIsModalLoading(false);
    }
  }, []);

  const handleCloseModal = () => {
    setSelectedPost(null);
    setThreadContent(null);
  };

  const handleGenerateReport = useCallback(async (level: AnalysisDetailLevel) => {
    if (posts.length === 0) {
      setError("Cannot generate a report without scraped data. Please perform a search first.");
      return;
    }
    setAnalysisLevel(level);
    setIsReportLoading(true);
    setIsReportModalOpen(true);
    setReportContent(null);
    setError(null);

    try {
      const content = await generateAnalysisReport(prompt, posts, level);
      setReportContent(content);
    } catch (err) {
      console.error(err);
      setError(`Failed to generate the ${level} report. Please try again.`);
      setIsReportModalOpen(false);
    } finally {
      setIsReportLoading(false);
    }
  }, [prompt, posts]);

  const handleCloseReportModal = () => {
    setIsReportModalOpen(false);
    setReportContent(null);
    setAnalysisLevel(null);
  };


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

        {!isLoading && posts.length > 0 && (
          <>
            <AnalysisToolbar onGenerate={handleGenerateReport} disabled={isLoading} />
            <SummaryTabs summaries={summaries!} />
          </>
        )}
        
        {!isLoading && posts.length === 0 && !error && (
          <Welcome />
        )}
        
        {!isLoading && posts.length > 0 && <PostGrid posts={posts} onViewThread={handleViewThread} />}

        {selectedPost && (
          <ThreadViewerModal
            isOpen={!!selectedPost}
            onClose={handleCloseModal}
            post={selectedPost}
            content={threadContent}
            isLoading={isModalLoading}
          />
        )}

        {isReportModalOpen && (
          <AnalysisReportModal
            isOpen={isReportModalOpen}
            onClose={handleCloseReportModal}
            level={analysisLevel}
            isLoading={isReportLoading}
            content={reportContent}
          />
        )}
      </main>
    </div>
  );
};

export default App;
