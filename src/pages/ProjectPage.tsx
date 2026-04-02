import { useParams } from "react-router-dom"
import { projects } from "../data/projects"
import DefaultLayout from "../layouts/DefaultLayout"

export default function ProjectPage() {
  const { slug } = useParams()

  const project = projects.find(p => p.slug === slug)

  if (!project) return <div>Not found</div>

  return <DefaultLayout project={project} />
}