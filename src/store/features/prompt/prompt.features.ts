
import { baseApi } from "../../baseApi"



export interface Prompt {
  _id: string
  title: string
  prompt: string
  tags: string[]
  profile: string
  image?: string
  imagePublicId?: string
  upVote: number
  downVote: number
  createdAt: string
  updatedAt: string,
  visibility:boolean
}

export interface PromptResponse {
  success: boolean
  message: string
  data: Prompt
}

export interface PromptsResponse {
  success: boolean
  message: string
  data: Prompt[]
}

export interface VoteResponse {
  success: boolean
  message: string
  data: { upVote: number; downVote: number }
}

export interface CreatePromptPayload {
  title: string
  prompt: string
  tags?: string[]
  profile?: string
  image?: string           // Cloudinary URL after upload
  imagePublicId?: string
}

export interface UpdatePromptPayload {
  id: string
  title?: string
  prompt?: string
  tags?: string[]
  profile?: string
}

export interface VotePayload {
  postId: string
}

export interface SavePromptPayload {
  promptId: string
}


export const promptApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({


    createPrompt: builder.mutation<PromptResponse, CreatePromptPayload>({
      query: (data) => ({
        url: '/prompt/create-prompt',
        method: 'POST',
        data,
      }),
      invalidatesTags: ['Prompt'],
    }),

    // POST /prompt-image — multipart upload, returns { image, imagePublicId }
    uploadPromptImage: builder.mutation<{ image: string; imagePublicId: string }, FormData>({
      query: (data) => ({
        url: '/prompt/prompt-image',
        method: 'POST',
        data,
        headers: { 'Content-Type': 'multipart/form-data' },
      }),
    }),


    getAllPrompts: builder.query<PromptsResponse, void>({
      query: () => ({
        url: '/prompt/get-prompt',
        method: 'GET',
      }),
      providesTags: ['Prompt'],
    }),


    getPromptDetails: builder.query<PromptResponse, string>({
      query: (id) => ({
        url: `/prompt/prompt-details/${id}`,
        method: 'GET',
      }),
      providesTags: (_result, _error, id) => [{ type: 'Prompt', id }],
    }),


    updatePrompt: builder.mutation<PromptResponse, UpdatePromptPayload>({
      query: ({ id, ...data }) => ({
        url: `/prompt/update-prompt/${id}`,
        method: 'PUT',
        data,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Prompt', id }, 'Prompt'],
    }),


    deletePrompt: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `/prompt/delete-prompt/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Prompt'],
    }),


    upVote: builder.mutation<VoteResponse, VotePayload>({
      query: (data) => ({
        url: '/prompt/upVote',
        method: 'POST',
        data,
      }),
      async onQueryStarted({ postId }, { dispatch, queryFulfilled }) {
        const patchList = dispatch(
          promptApi.util.updateQueryData('getAllPrompts', undefined, (draft) => {
            const p = draft.data.find((x) => x._id === postId)
            if (p) p.upVote += 1
          })
        )
        const patchDetails = dispatch(
          promptApi.util.updateQueryData('getPromptDetails', postId, (draft) => {
            draft.data.upVote += 1
          })
        )
        try {
          await queryFulfilled
        } catch {
          patchList.undo()
          patchDetails.undo()
        }
      },
    }),

    downVote: builder.mutation<VoteResponse, VotePayload>({
      query: (data) => ({
        url: '/prompt/downVote',
        method: 'POST',
        data,
      }),
      async onQueryStarted({ postId }, { dispatch, queryFulfilled }) {
        const patchList = dispatch(
          promptApi.util.updateQueryData('getAllPrompts', undefined, (draft) => {
            const p = draft.data.find((x) => x._id === postId)
            if (p) p.downVote += 1
          })
        )
        const patchDetails = dispatch(
          promptApi.util.updateQueryData('getPromptDetails', postId, (draft) => {
            draft.data.downVote += 1
          })
        )
        try {
          await queryFulfilled
        } catch {
          patchList.undo()
          patchDetails.undo()
        }
      },
    }),

    savePrompt: builder.mutation<{ success: boolean; message: string }, SavePromptPayload>({
      query: (data) => ({
        url: '/prompt/save-prompt',
        method: 'POST',
        data,
      }),
      invalidatesTags: ['SavedPrompt'],
    }),


    getSavedPrompts: builder.query<PromptsResponse, void>({
      query: () => ({
        url: '/prompt/save-prompt',
        method: 'GET',
      }),
      providesTags: ['SavedPrompt'],
    }),


    deleteSavedPrompt: builder.mutation<{ success: boolean; message: string }, SavePromptPayload>({
      query: (data) => ({
        url: '/prompt/save-prompt',
        method: 'DELETE',
        data,
      }),
      invalidatesTags: ['SavedPrompt'],
    }),

    trending: builder.query<any, void>({
      query: () => ({
        url: '/prompt/trending',
        method: "GET"
      }),

    })

  }),
  overrideExisting: false,
})

// ─── Hooks ────────────────────────────────────────────────────────────────────

export const {
  useCreatePromptMutation,
  useUploadPromptImageMutation,
  useGetAllPromptsQuery,
  useGetPromptDetailsQuery,
  useUpdatePromptMutation,
  useDeletePromptMutation,
  useUpVoteMutation,
  useDownVoteMutation,
  useSavePromptMutation,
  useGetSavedPromptsQuery,
  useDeleteSavedPromptMutation,
  useTrendingQuery
} = promptApi