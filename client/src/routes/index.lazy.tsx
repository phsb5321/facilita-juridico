import PageTemplate from "@/components/templates/PageTemplate";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const header = (
    <h1 className="text-5xl font-extrabold text-center my-10 text-yellow-400">
      🌟 Welcome to The Project 🌟
    </h1>
  );

  const content = (
    <div className="text-center">
      <p className="text-xl mb-8 font-semibold">
        🚀 "Facilita Juridico" - Developer Position Test
      </p>
    </div>
  );

  return <PageTemplate header={header} content={content} />;
}

export default HomePage;
