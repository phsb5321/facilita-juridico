import Canvas from "@/components/atoms/Canvas";
import Heading from "@/components/atoms/Heading";
import PageTemplate from "@/components/templates/PageTemplate";
import { useClients } from "@/hooks/useClients";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/routes")({
  component: RouteOptimizationPage,
});

function RouteOptimizationPage() {
  const { shortestRouteData } = useClients();

  if (!shortestRouteData) {
    return null;
  }

  const header = <Heading level={1}>🚀 Optimized Client Route</Heading>;
  const content = (
    <div className="text-center my-4 mx-auto">
      {shortestRouteData.length > 0 && (
        <div className="flex justify-around items-start bg-white p-4 rounded-lg shadow-md my-4">
          <div className="flex-1 max-w-md">
            <Heading
              level={2}
              className="text-center text-2xl font-semibold mb-4"
            >
              📍 Optimized Route Visualization
            </Heading>
            <div className="p-2 border-2 border-dashed border-gray-300 rounded-lg">
              <Canvas route={shortestRouteData} />
            </div>
          </div>

          <div className="flex-1 max-w-md">
            <Heading
              level={2}
              className="text-center text-2xl font-semibold mb-4"
            >
              📋 Client List
            </Heading>
            <div className="overflow-auto max-h-64">
              <table className="min-w-full bg-white">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className="py-3 px-4 text-left">Name</th>
                  </tr>
                </thead>
                <tbody>
                  {shortestRouteData.map((client) => (
                    <tr key={client.id} className="border-b">
                      <td className="py-3 px-4">{client.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return <PageTemplate header={header} content={content} />;
}
