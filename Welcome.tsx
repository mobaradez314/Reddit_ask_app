
import React from 'react';
import { RedditIcon } from './IconComponents';

export const Welcome: React.FC = () => {
    return (
        <div className="text-center py-12 px-6 bg-gray-800/50 rounded-lg border border-gray-700">
            <div className="flex justify-center items-center mb-6">
                <RedditIcon className="w-16 h-16 text-orange-500" />
            </div>
            <h2 className="text-3xl font-extrabold text-white mb-3">Welcome to the AI Reddit Scraper</h2>
            <p className="max-w-2xl mx-auto text-gray-400 text-lg">
                Discover insights from Reddit conversations effortlessly.
            </p>
            <p className="max-w-2xl mx-auto text-gray-400 mt-2">
                Just type a topic in the search bar above, and our AI will find and summarize the most relevant threads for you.
            </p>
        </div>
    );
};
