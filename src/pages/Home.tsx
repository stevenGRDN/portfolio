import { projects } from "../data/projects"
import { Link } from "react-router-dom"

export default function Home() {
  return (
    <div>
      <h1>Projects</h1>

      {projects.map(p => (
        <Link key={p.slug} to={`/project/${p.slug}`}>
          <div>{p.title}</div>
        </Link>
      ))}
    </div>
  )
}