
import { GoogleGenAI, Type } from "@google/genai";
import type { RedditPost, TopicSummaries } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const postsSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      title: {
        type: Type.STRING,
        description: "The full title of the Reddit post.",
      },
      subreddit: {
        type: Type.STRING,
        description: "The name of the subreddit, e.g., 'r/programming'.",
      },
      url: {
        type: Type.STRING,
        description: "The direct URL to the Reddit post.",
      },
      score: {
        type: Type.INTEGER,
        description: "The net upvote score of the post.",
      },
      commentCount: {
        type: Type.INTEGER,
        description: "The total number of comments on the post.",
      },
      topCommentsSummary: {
        type: Type.STRING,
        description: "A concise summary of the top 3-5 most upvoted or insightful comments. Should capture the main points of discussion.",
      },
    },
    required: ["title", "subreddit", "url", "score", "commentCount", "topCommentsSummary"],
  },
};

const summariesSchema = {
    type: Type.OBJECT,
    properties: {
        overallSummary: {
            type: Type.STRING,
            description: "A neutral, high-level summary of the entire discussion around the topic based on the provided data.",
        },
        positiveSentiments: {
            type: Type.STRING,
            description: "A bulleted list (using markdown) summarizing the key positive opinions, common praises, and recommended aspects.",
        },
        negativeSentiments: {
            type: Type.STRING,
            description: "A bulleted list (using markdown) summarizing the key negative opinions, common criticisms, and potential drawbacks.",
        },
        keyQuestions: {
            type: Type.STRING,
            description: "A bulleted list (using markdown) of the most important or frequently asked questions that are central to the debate.",
        },
    },
    required: ["overallSummary", "positiveSentiments", "negativeSentiments", "keyQuestions"],
};


export const fetchRedditThreads = async (topic: string): Promise<RedditPost[]> => {
  const prompt = `
    You are an expert Reddit data analyst. Your task is to find 5-8 popular and highly relevant Reddit threads about the topic: "${topic}".
    For each thread you find, you must extract the following information precisely:
    1. The post title.
    2. The subreddit name (formatted as r/subreddit).
    3. The direct URL to the post.
    4. The post's score (net upvotes).
    5. The number of comments.
    6. A well-written, concise summary of the top 3-5 most insightful or upvoted comments. This summary should capture the essence of the discussion.

    Return the data as a JSON array that strictly adheres to the provided schema. Do not include any posts that are irrelevant to the topic.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: postsSchema,
      },
    });

    const jsonText = response.text.trim();
    const parsedData = JSON.parse(jsonText);
    
    if (!Array.isArray(parsedData)) {
        throw new Error("API did not return a valid array of posts.");
    }

    return parsedData as RedditPost[];

  } catch (error) {
    console.error("Error fetching or parsing Reddit threads from Gemini API:", error);
    throw new Error("Failed to get a valid response for Reddit threads from the AI model.");
  }
};

export const generateTopicSummaries = async (topic: string, posts: RedditPost[]): Promise<TopicSummaries> => {
    const contextData = posts.map(p => ({
        title: p.title,
        subreddit: p.subreddit,
        summary: p.topCommentsSummary,
    }));

    const prompt = `
        You are a master research analyst specializing in synthesizing public opinion from online forums.
        Based on the topic "${topic}" and the following curated list of Reddit post summaries, please generate a comprehensive analysis.
        The provided data is: ${JSON.stringify(contextData)}

        Your analysis must be structured as a JSON object with four keys: "overallSummary", "positiveSentiments", "negativeSentiments", and "keyQuestions".
        - For "overallSummary", provide a neutral, high-level summary of the entire discussion.
        - For "positiveSentiments", create a markdown bulleted list of the key positive opinions and common praises.
        - For "negativeSentiments", create a markdown bulleted list of the key negative opinions and common criticisms.
        - For "keyQuestions", create a markdown bulleted list of the most important or frequently asked questions.

        Ensure your output is insightful, directly based on the provided data, and strictly adheres to the JSON schema.
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: summariesSchema,
            },
        });

        const jsonText = response.text.trim();
        return JSON.parse(jsonText) as TopicSummaries;

    } catch (error) {
        console.error("Error generating topic summaries from Gemini API:", error);
        throw new Error("Failed to generate topic summaries from the AI model.");
    }
};
