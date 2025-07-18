import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function usePolling(ms: number) {
  const router = useRouter();

  useEffect(() => {
    const intervalId = setInterval(() => {
      router.refresh();
    }, ms);

    return () => clearInterval(intervalId);
  }, []);
}
