"use client";

import { useFcmToken } from "@/src/helper/notification/use-fcm-token";
import { useUser } from "@/src/hooks/me/user-data";

export default function FcmInitializer() {
  const { user, isLoading } = useUser();

  useFcmToken(!!user);

  if (isLoading) return null;

  return null;
}