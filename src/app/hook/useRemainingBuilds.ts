import { useEffect, useState } from "react";

interface RemainingBuilds {
  remaining: number;
  limit: number;
}

export function useRemainingBuilds() {
  const [remainingBuilds, setRemainingBuilds] =
    useState<RemainingBuilds | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const percentage =
    remainingBuilds === null
      ? 0
      : (remainingBuilds.remaining / remainingBuilds.limit) * 100;

  useEffect(() => {
    const fetchRemainingBuilds = async () => {
      try {
        const response = await fetch("/api/auth", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
          const data = await response.json();
          setRemainingBuilds(data.remainingBuilds);
        } else {
          throw new Error("Falha ao buscar os dados");
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Ocorreu um erro desconhecido"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchRemainingBuilds();
  }, []);

  return { remainingBuilds, percentage, isLoading, error };
}
