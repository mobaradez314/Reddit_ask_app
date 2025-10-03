import React from 'react';
import type { AnalysisDetailLevel } from '../types';

interface AnalysisToolbarProps {
  onGenerate: (level: AnalysisDetailLevel) => void;
  disabled: boolean;
}

const ANALYSIS_LEVELS: { level: AnalysisDetailLevel; label: string }[] = [
  { level: 'concise', label: 'Concise Report' },
  { level: 'detailed', label: 'Detailed Report' },
  { level: 'extensive', label: 'Extensive Report' },
];

export const AnalysisToolbar: React.FC<AnalysisToolbarProps> = ({ onGenerate, disabled }) => {
  return (
    <div className="mb-4 p-4 bg-gray-800/50 rounded-lg shadow-md border border-gray-700">
      <div className="flex flex-col sm:flex-row items-center justify-between">
        <h3 className="text-lg font-semibold text-white mb-3 sm:mb-0">Generate In-Depth Report</h3>
        <div className="flex items-center gap-3">
          {ANALYSIS_LEVELS.map(({ level, label }) => (
            <button
              key={level}
              onClick={() => onGenerate(level)}
              disabled={disabled}
              className="px-4 py-2 bg-gray-700 text-sm font-medium text-gray-200 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label={`Generate a ${label}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
