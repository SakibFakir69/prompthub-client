import { baseApi } from "../../baseApi";

export interface DeviceToken {
  _id: string;
  userId: string;
  token: string;
  platform: 'web' | 'expo';
  createdAt: string;
  lastUsedAt: string;
}

interface RegisterTokenPayload {
  token: string;
  platform: 'web' | 'expo';
}

interface UnregisterTokenPayload {
  token: string;
}

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
}

export const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    registerDeviceToken: builder.mutation<ApiResponse<DeviceToken>, RegisterTokenPayload>({
      query: (body) => ({
        url: '/notifications/register-token',
        method: 'POST',
        data: body,
      }),
      invalidatesTags: ['Notification'],
    }),

    unregisterDeviceToken: builder.mutation<ApiResponse<null>, UnregisterTokenPayload>({
      query: (body) => ({
        url: '/notifications/unregister-token',
        method: 'POST',
        data: body,
      }),
      invalidatesTags: ['Notification'],
    }),

    // Remove this once you're done testing
    testPush: builder.mutation<ApiResponse<null>, void>({
      query: () => ({
        url: '/notifications/test-push',
        method: 'POST',
      }),
    }),

  }),
});

export const {
  useRegisterDeviceTokenMutation,
  useUnregisterDeviceTokenMutation,
  useTestPushMutation,
} = notificationApi;