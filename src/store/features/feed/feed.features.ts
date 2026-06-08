// Import your central baseApi instead of createApi
import { baseApi } from '../../baseApi'; 

export const feedApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getallFeed: builder.query({
      query: (cursor = "") => `/feed/feed?cursor=${cursor}`,
      
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      
      merge: (currentCache, newItems) => {
        if (!currentCache) return newItems;
        return {
          ...newItems,
          data: [...currentCache.data, ...newItems.data],
        };
      },
      
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
  }),
  overrideExisting: false, // Prevents module replacement bugs during Next.js hot reloads
});

// The hooks are automatically generated on the injected instance
export const { useGetallFeedQuery } = feedApi;