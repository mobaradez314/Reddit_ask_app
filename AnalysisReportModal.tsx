import React from 'react';
import type { TopicSummaries, AnalysisDetailLevel } from '../types';
import { LightbulbIcon, ThumbsUpIcon, ThumbsDownIcon, QuestionMarkCircleIcon } from './IconComponents';

interface AnalysisReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  level: AnalysisDetailLevel | null;
  isLoading: boolean;
  content: TopicSummaries | null;
}

const renderMarkdownContent = (text: string) => {
    if (!text) return null;
    const lines = text.split('\n').filter(line => line.trim() !== '');
    return (
        <ul className="space-y-2">
            {lines.map((line, index) => {
                const isListItem = line.trim().startsWith('*') || line.trim().startsWith('-');
                const lineContent = isListItem ? line.trim().substring(1).trim() : line;
                return (
                    <li key={index} className={isListItem ? "flex items-start" : ""}>
                        {isListItem && <span className="mr-3 mt-1 text-gray-500">•</span>}
                        <span className="flex-1">{lineContent}</span>
                    </li>
                );
            })}
        </ul>
    );
};

export const AnalysisReportModal: React.FC<AnalysisReportModalProps> = ({ isOpen, onClose, level, isLoading, content }) => {
  if (!isOpen) return null;

  const levelTitle = level ? level.charAt(0).toUpperCase() + level.slice(1) : '';

  const sections = content ? [
    { title: 'Overall Summary', icon: LightbulbIcon, color: 'text-yellow-400', data: content.overallSummary },
    { title: 'Positive Sentiments', icon: ThumbsUpIcon, color: 'text-green-400', data: content.positiveSentiments },
    { title: 'Negative Sentiments', icon: ThumbsDownIcon, color: 'text-red-400', data: content.negativeSentiments },
    { title: 'Key Questions', icon: QuestionMarkCircleIcon, color: 'text-sky-400', data: content.keyQuestions },
  ] : [];

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
          <h2 className="text-xl font-bold text-white pr-8">{levelTitle} Analysis Report</h2>
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
              <p className="text-lg text-gray-300">AI is generating your {level} report...</p>
            </div>
          )}
          {content && (
            <div className="prose prose-invert prose-sm text-gray-300 max-w-none leading-relaxed space-y-6">
                {sections.map(sec => (
                    <div key={sec.title}>
                        <h3 className={`flex items-center text-gray-300 text-sm uppercase tracking-wider font-semibold mb-3 ${sec.color}`}>
                            <sec.icon className="w-5 h-5 mr-2" />
                            {sec.title}
                        </h3>
                        <div className="p-4 bg-gray-900/50 rounded-md">
                            {renderMarkdownContent(sec.data)}
                        </div>
                    </div>
                ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
