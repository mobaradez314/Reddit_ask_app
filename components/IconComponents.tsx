
import React from 'react';

type IconProps = React.HTMLAttributes<SVGElement>;

export const RedditIcon: React.FC<IconProps> = (props) => (
  <svg viewBox="0 0 20 20" fill="currentColor" {...props}>
    <g>
      <circle fill="#FF4500" cx="10" cy="10" r="10"></circle>
      <path
        fill="#FFFFFF"
        d="M15.83,9.49A2,2,0,0,0,15,8.12a5.8,5.8,0,0,0-5-2.85,5.8,5.8,0,0,0-5,2.85,2,2,0,0,0-.83,1.37,4.5,4.5,0,0,0,0,3,2,2,0,0,0,1.4,1.4,4.28,4.28,0,0,0,2.51.06,1.42,1.42,0,0,0,1-.53,1.21,1.21,0,0,0,0-.73v-2a1.3,1.3,0,0,1,1.19-1.29h.28a1.3,1.3,0,0,1,1.19,1.29v2a1.21,1.21,0,0,0,0,.73,1.42,1.42,0,0,0,1,.53,4.28,4.28,0,0,0,2.51-.06,2,2,0,0,0,1.4-1.4,4.5,4.5,0,0,0,0-3Zm-3.14,1.29a1.14,1.14,0,1,1,1.14-1.14,1.14,1.14,0,0,1-1.14,1.14Zm-5.38,0a1.14,1.14,0,1,1,1.14-1.14A1.14,1.14,0,0,1,7.31,10.78Z"
      ></path>
      <path fill="#FF4500" d="M10,12.28a2,2,0,0,1-1.42-.59l-.28-.28a.5.5,0,0,1,0-.7,4,4,0,0,1,5.34,0,.5.5,0,0,1,0,.7l-.28.28A2,2,0,0,1,10,12.28Z"></path>
    </g>
  </svg>
);

export const UpvoteIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
  </svg>
);

export const CommentIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);

export const LinkIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
);

export const LightbulbIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.311a7.5 7.5 0 01-7.5 0c-1.451 0-2.713-.58-3.687-1.562a7.036 7.036 0 01-1.04-4.64L3 12m18 0l-1.04 4.64a7.036 7.036 0 01-1.04 4.64A7.5 7.5 0 0112 21a7.5 7.5 0 01-7.5 0" />
    </svg>
);

export const ThumbsUpIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.424 2.031-1.087 1.4-1.584 2.986-3.486 4.735-4.171 1.749-.686 3.662-.352 5.148.791.636.502 1.053 1.253 1.135 2.091a16.09 16.09 0 01-1.135 6.657l-1.302 4.881A2.25 2.25 0 0115.12 21H4.5a2.25 2.25 0 01-2.25-2.25V10.5c0-.987.626-1.813 1.5-2.121" />
    </svg>
);

export const ThumbsDownIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 4.5c.806 0 1.533.424 2.031 1.087 1.4 1.584 2.986 3.486 4.735 4.171 1.749.686 3.662.352 5.148-.791.636-.502 1.053-1.253 1.135-2.091a16.09 16.09 0 00-1.135-6.657l-1.302-4.881A2.25 2.25 0 0015.12 3H4.5A2.25 2.25 0 002.25 5.25v6.375c0 .987.626 1.813 1.5 2.121" />
    </svg>
);

export const QuestionMarkCircleIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
    </svg>
);
