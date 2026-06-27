import { baseApi } from "../../baseApi";

export interface SearchUser {
    _id: string;
    name: string;
    email: string;
    gender: string;
    followers: number;
    age: number;
    avatar?: string;
    isFollowing?: boolean;
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
    id: string;
}

// ✅ FIX: matches actual ReturnResponse wrapper shape
export interface FollowUserResponse {
    success: boolean;
    message: string;
    data: {
        following: boolean;
    };
}

const peopleApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        searchUsers: builder.query<SearchUsersResponse, SearchUsersRequest>({
            query: ({ name, email, age, gender, cursor, limit = 20 }) => ({
                url: "/people/search",
                method: "GET",
                params: {
                    ...(name   && { name }),
                    ...(email  && { email }),
                    ...(age    && { age }),
                    ...(gender && { gender }),
                    ...(cursor && { cursor }),
                    limit,
                },
            }),

            serializeQueryArgs: ({ queryArgs }) => {
                const { cursor: _cursor, ...filters } = queryArgs;
                return filters;
            },

            merge: (currentCache, newItems) => {
                const existingIds = new Set(currentCache.data.map((u) => u._id));
                const fresh = newItems.data.filter((u) => !existingIds.has(u._id));
                currentCache.data.push(...fresh);
                currentCache.pagination = newItems.pagination;
            },

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

        followUser: builder.mutation<FollowUserResponse, FollowUserRequest>({
            query: ({ id }) => ({
                url: "/people/follow",
                method: "POST",
                data: { id },
            }),
            // No invalidatesTags — state patched manually in component
        }),
    }),
    overrideExisting: false,
});

export const {
    useSearchUsersQuery,
    useLazySearchUsersQuery,
    useFollowUserMutation,
} = peopleApi;