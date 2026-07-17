import { useEffect } from "react";
import {
  requestNotificationPermission,
  listenForegroundMessages,
} from "../../lib/firebase";
import { useRegisterDeviceTokenMutation } from "@/src/store/features/notification/notification.features";

export function useFcmToken(isAuthenticated: boolean) {
  
  const [registerDeviceToken] = useRegisterDeviceTokenMutation();

  useEffect(() => {
    if (!isAuthenticated) return;

    const init = async () => {
      const token = await requestNotificationPermission();

      if (!token) return;

      await registerDeviceToken({
        token,
        platform: "web",
      });
    };

    init();

    const unsubscribe = listenForegroundMessages((payload) => {
      console.log("Foreground message:", payload);
    });

    return () => {

      unsubscribe();

    };
  }, [isAuthenticated, registerDeviceToken]);
}