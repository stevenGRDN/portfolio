import Home from "./pages/Home"
import Category from "./pages/Category"
import ProjectPage from "./pages/ProjectPage"

export const routes = [
  { path: "/", element: <Home /> },
  { path: "/project/:slug", element: <ProjectPage /> },
  { path: "/photography", element: <Category projectType={'photography'}/> },
  { path: "/web", element: <Category projectType={'web'}/> },
  { path: "/3d", element: <Category projectType={'3d'}/> },
  { path: "/other", element: <Category projectType={'other'}/> },
]