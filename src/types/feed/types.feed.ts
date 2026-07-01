export interface FeedItem {
  _id: string
  id?: string
  title: string
  prompt: string
  category: string[]
  tags: string[]
  image?: string
  createdBy: { userId: string; name: string; avatar: string }
  upVote: number
  downVote: number
  upVotedBy: string[]
  createdAt: string
}

export interface InitialData {
  data?: FeedItem[]
  nextCursor?: string | null
}

export interface Prompt {
  _id: string
  title: string
  prompt: string
  category: string[]
  tags: string[]
  image?: string
  createdBy: { userId: string; name: string; avatar: string }
  upVote: number
  downVote: number
  upVotedBy: string[]
  createdAt: string
}