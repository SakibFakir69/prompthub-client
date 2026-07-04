// exploreApi.ts
import { baseApi } from "../../baseApi";

export interface Prompt {
  _id: string;
  title: string;
  prompt: string;
  tags: string[];
  [key: string]: any;
}

interface ExploreResponse {
  message: string;
  data: Prompt[];
  nextCursor: string | null;
}

interface ExploreParams {
  cursor?: string | null;
  search?: string;
}

const exploreApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    explore: builder.query<ExploreResponse, ExploreParams>({
      query: ({ cursor, search }) => ({
        url: '/explore',
        method: 'GET',
        params: {
          ...(cursor ? { cursor } : {}),
          ...(search ? { prompt: search } : {}),
        },
      }),
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        return `${endpointName}-${queryArgs.search ?? ""}`;
      },
      merge: (currentCache, newItems, { arg }) => {
        if (!arg.cursor) {
          currentCache.data = newItems.data;
        } else {
          currentCache.data.push(...newItems.data);
        }
        currentCache.nextCursor = newItems.nextCursor;
      },
      forceRefetch: ({ currentArg, previousArg }) => {
        return currentArg?.cursor !== previousArg?.cursor;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ _id }) => ({ type: "Prompt" as const, id: _id })),
              { type: "Prompt" as const, id: "LIST" },
            ]
          : [{ type: "Prompt" as const, id: "LIST" }],
    }),
  }),
  overrideExisting: false,
});

export const { useExploreQuery, useLazyExploreQuery } = exploreApi;