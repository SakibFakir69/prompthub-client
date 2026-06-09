
import { baseApi } from '../../baseApi';

export const feedApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getallFeed: builder.query({

            query: (cursor = "") => ({
                url: `/feed/feed`,
                method: 'GET',
                params: { cursor },
            }),

            serializeQueryArgs: ({ endpointName }) => {
                return endpointName;
            },

            merge: (currentCache, newItems) => {
                if (!currentCache) return newItems;

              
                const existingIds = new Set(currentCache.data.map((item: any) => item._id));

                const uniqueNewItems = newItems.data.filter((item: any) => !existingIds.has(item._id));

                return {
                    ...newItems,
                  
                    data: [...currentCache.data, ...uniqueNewItems],
                };
            },

            forceRefetch({ currentArg, previousArg }) {
                return currentArg !== previousArg;
            },
        }),
    }),
    overrideExisting: false,
});


export const { useGetallFeedQuery } = feedApi;