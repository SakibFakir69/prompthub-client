export interface DemoPrompt {
  title: string;
  prompt: string;
  category: string[];
  tags: string[];
  upVote: number;
  createdBy: {
    name: string;
    avatar?: string;
  };
}