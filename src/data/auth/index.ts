import { DemoPrompt } from './../../interfaces/auth/index';



export const demoPromptsData: DemoPrompt[] = [
  {
    title: "SEO Blog Writer",
    prompt:
      "Write a fully optimized blog post on any topic with proper keyword placement, meta description, and internal linking suggestions.",
    category: ["Writing", "Marketing"],
    tags: ["seo", "blog", "content"],
    upVote: 142,
    createdBy: { name: "Alex Rivera" },
  },
  {
    title: "React Component Generator",
    prompt:
      "Generate a reusable React component with TypeScript, proper prop types, and Tailwind CSS styling based on a description.",
    category: ["Coding", "Frontend"],
    tags: ["react", "typescript", "tailwind"],
    upVote: 238,
    createdBy: { name: "Priya Sharma" },
  },
  {
    title: "Data Analysis Assistant",
    prompt:
      "Analyze the given dataset and provide key insights, trends, anomalies, and visualization recommendations with summary tables.",
    category: ["Data", "Analysis"],
    tags: ["data", "analytics", "insights"],
    upVote: 97,
    createdBy: { name: "Jordan Lee" },
  },
  {
    title: "Email Campaign Creator",
    prompt:
      "Craft a high-converting email sequence with subject lines, body copy, CTAs, and A/B test variants for each stage of the funnel.",  
    category: ["Marketing", "Writing"],
    tags: ["email", "copywriting", "funnel"],
    upVote: 185,
    createdBy: { name: "Mia Chen" },
  },
  {
    title: "API Documentation Writer",
    prompt:
      "Generate comprehensive API documentation including endpoint descriptions, request/response examples, error codes, and authentication details.",
    category: ["Coding", "Documentation"],
    tags: ["api", "docs", "rest"],
    upVote: 64,
    createdBy: { name: "Sam Okafor" },
  },
  {
    title: "UI/UX Reviewer",
    prompt:
      "Review the described interface and provide actionable feedback on usability, accessibility, visual hierarchy, and conversion optimization.",
    category: ["Design", "UX"],
    tags: ["ui", "ux", "review"],
    upVote: 112,
    createdBy: { name: "Lena Müller" },
  },
];
