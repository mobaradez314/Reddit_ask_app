
export interface RedditPost {
  title: string;
  subreddit: string;
  url: string;
  score: number;
  commentCount: number;
  topCommentsSummary: string;
}

export interface TopicSummaries {
  overallSummary: string;
  positiveSentiments: string;
  negativeSentiments: string;
  keyQuestions: string;
}
