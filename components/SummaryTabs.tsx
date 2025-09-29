import React, { useState, useMemo } from 'react';
import type { TopicSummaries } from '../types';
import { LightbulbIcon, ThumbsUpIcon, ThumbsDownIcon, QuestionMarkCircleIcon } from './IconComponents';

interface SummaryTabsProps {
  summaries: TopicSummaries;
}

type TabId = 'overall' | 'positives' | 'negatives' | 'questions';

// FIX: Define an interface for a tab object to ensure type safety for tab IDs.
// Without this, TypeScript infers `tab.id` as `string`, causing a type error in `setActiveTab`.
interface Tab {
  id: TabId;
  label: string;
  icon: React.FC<React.HTMLAttributes<SVGElement>>;
  content: string;
  color: string;
}

export const SummaryTabs: React.FC<SummaryTabsProps> = ({ summaries }) => {
  const [activeTab, setActiveTab] = useState<TabId>('overall');

  const TABS: Tab[] = useMemo(() => [
    { id: 'overall', label: 'Overall Summary', icon: LightbulbIcon, content: summaries.overallSummary, color: 'text-yellow-400' },
    { id: 'positives', label: 'Positives', icon: ThumbsUpIcon, content: summaries.positiveSentiments, color: 'text-green-400' },
    { id: 'negatives', label: 'Negatives', icon: ThumbsDownIcon, content: summaries.negativeSentiments, color: 'text-red-400' },
    { id: 'questions', label: 'Key Questions', icon: QuestionMarkCircleIcon, content: summaries.keyQuestions, color: 'text-sky-400' },
  ], [summaries]);

  const activeContent = TABS.find(tab => tab.id === activeTab)?.content || '';
  
  // A simple markdown to HTML converter for bullet points
  const renderContent = (content: string) => {
    const lines = content.split('\n').filter(line => line.trim() !== '');
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


  return (
    <div className="mb-10 p-6 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
        <h2 className="text-xl font-bold text-white mb-4">AI-Generated Analysis</h2>
      <div className="border-b border-gray-600 mb-4">
        <nav className="-mb-px flex space-x-6" aria-label="Tabs">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`${
                activeTab === tab.id
                  ? 'border-indigo-500 text-indigo-400'
                  : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-400'
              } group inline-flex items-center py-3 px-1 border-b-2 font-medium text-sm transition-colors duration-200`}
              aria-current={activeTab === tab.id ? 'page' : undefined}
            >
              <tab.icon className={`-ml-0.5 mr-2 h-5 w-5 ${activeTab === tab.id ? tab.color : ''}`} aria-hidden="true" />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>
      <div className="prose prose-invert prose-sm text-gray-300 max-w-none leading-relaxed">
        {renderContent(activeContent)}
      </div>
    </div>
  );
};
