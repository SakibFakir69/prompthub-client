import { baseApi } from "../../baseApi";

export interface SearchUser {
    _id: string;
    name: string;
    email: string;
    gender: string;
    followers: number;
    age: number;
    avatar?: string;
}

export interface SearchUsersRequest {
    name?: string;
    email?: string;
    age?: number;
    gender?: string;
    cursor?: string;
    limit?: number;
}

export interface SearchUsersResponse {
    data: SearchUser[];
    pagination: {
        nextCursor: string | null;
        hasNextPage: boolean;
    };
}

export interface FollowUserRequest {
    id: string; // targetUserId — matches req.body.id on backend
}

export interface FollowUserResponse {
    following: boolean;
}

const peopleApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // ── Search (GET with query params, cursor-based infinite scroll) ──
        searchUsers: builder.query<SearchUsersResponse, SearchUsersRequest>({
            query: ({ name, email, age, gender, cursor, limit = 20 }) => ({
                url: "/people/search",
                method: "GET",
                params: {
                    ...(name     && { name }),
                    ...(email    && { email }),
                    ...(age      && { age }),
                    ...(gender   && { gender }),
                    ...(cursor   && { cursor }),
                    limit,
                },
            }),

            // Keep cache key stable across page loads — ignore cursor so all
            // pages of the same filter set share one cache entry.
            serializeQueryArgs: ({ queryArgs }) => {
                const { cursor: _cursor, ...filters } = queryArgs;
                return filters;
            },

            // Append incoming page to existing cached data.
            merge: (currentCache, newItems) => {
                currentCache.data.push(...newItems.data);
                currentCache.pagination = newItems.pagination;
            },

            // Re-fetch when filters change (cursor change alone does not refetch).
            forceRefetch: ({ currentArg, previousArg }) => {
                if (!currentArg || !previousArg) return true;
                return currentArg.cursor !== previousArg.cursor;
            },

            providesTags: (result) =>
                result
                    ? [
                        ...result.data.map(({ _id }) => ({
                            type: "People" as const,
                            id: _id,
                        })),
                        { type: "People" as const, id: "LIST" },
                    ]
                    : [{ type: "People" as const, id: "LIST" }],
        }),

        // ── Follow / Unfollow toggle (single endpoint on backend) ──
        followUser: builder.mutation<FollowUserResponse, FollowUserRequest>({
            query: ({ id }) => ({
                url: "/people/follow",
                method: "POST",
                data: { id }, // backend reads req.body.id
            }),
            invalidatesTags: (_result, _error, { id }) => [
                { type: "People", id },
                { type: "People", id: "LIST" },
            ],
        }),
    }),
    overrideExisting: false,
});

export const {
    useSearchUsersQuery,
    useLazySearchUsersQuery,
    useFollowUserMutation,
} = peopleApi;