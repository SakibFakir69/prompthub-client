import { useGetMeQuery } from "@/src/store/features/auth/auth.features";



export const useUser = () => {
  const { data, isLoading, isError, error, refetch } = useGetMeQuery();

  return {
    user: data,
    isLoading,
    isError,
    error,
    refetch,
  };
};