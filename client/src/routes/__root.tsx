import { createRootRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <>
      <nav className="bg-gray-800 text-white p-4 shadow-lg h-16">
        <div className="container mx-auto flex justify-center space-x-4">
          <Link
            to="/"
            className="hover:bg-gray-700 px-3 py-2 rounded-md [&.active]:font-bold"
          >
            Home
          </Link>
          <Link
            to="/clients"
            className="hover:bg-gray-700 px-3 py-2 rounded-md [&.active]:font-bold"
          >
            Clients
          </Link>
          <Link
            to="/routes"
            className="hover:bg-gray-700 px-3 py-2 rounded-md [&.active]:font-bold"
          >
            Optimized Route
          </Link>
        </div>
      </nav>
      <Outlet />
    </>
  ),
});
