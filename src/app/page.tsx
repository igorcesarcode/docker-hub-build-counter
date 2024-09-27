import Image from "next/image";
import RemainingBuilds from "../components/RemainingBuilds";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="flex-grow flex items-center justify-center">
        <div className="p-8 rounded-lg shadow-md w-full max-w-md bg-slate-800">
          <RemainingBuilds />
        </div>
      </div>

      <footer className="w-full text-white py-4 text-center ">
        <a
          href="https://github.com/igorcesarcode"
          className="mr-4 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub @igorcesarcode
        </a>
        <a
          href="https://docs.docker.com/docker-hub/download-rate-limit/"
          className="hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Docker Hub Download Rate Limit
        </a>
        <div className="flex gap-4 items-center justify-center">
          <Image
            src={"/logo.svg"}
            alt="Next JS logomark"
            width={20}
            height={20}
          />
          Powered by Next JS
        </div>
      </footer>
    </main>
  );
}
