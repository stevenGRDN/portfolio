import Home from "./pages/Home"
import ProjectPage from "./pages/ProjectPage"

export const routes = [
  { path: "/", element: <Home /> },
  { path: "/project/:slug", element: <ProjectPage /> }
]