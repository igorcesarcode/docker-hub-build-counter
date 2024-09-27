"use client";

import { useRemainingBuilds } from "@/app/hook/useRemainingBuilds";

const Spinner = () => (
  <div className="flex justify-center items-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

const ProgressBar = ({ percentage }: { percentage: number }) => {
  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
      <div
        className="bg-blue-600 h-2.5 rounded-full"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

export default function RemainingBuilds() {
  const { remainingBuilds, percentage, isLoading, error } =
    useRemainingBuilds();

  if (error) {
    return <div className="text-red-500">Erro: {error}</div>;
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <h1 className="text-lg font-bold mb-8">
        Contador de Builds do Docker Hub
      </h1>

      <div className="mb-6">
        <ProgressBar percentage={percentage} />
        <div className="text-center text-3xl font-bold text-blue-600">
          {remainingBuilds?.remaining}
        </div>
      </div>
      <div className="text-center">
        <p className="text-lg font-semibold text-gray-300">
          Pulls Restantes: {remainingBuilds?.remaining}
        </p>
        <p className="text-sm text-gray-400">
          Limite: {remainingBuilds?.limit}
        </p>
      </div>
    </>
  );
}
