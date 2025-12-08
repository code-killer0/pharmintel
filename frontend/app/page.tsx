import AgentRunner from "./components/AgentRunner";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-100">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold text-center w-full mb-10 text-blue-800">
          PharmaIntel Intelligence Suite
        </h1>
      </div>

      <AgentRunner />
    </main>
  );
}
