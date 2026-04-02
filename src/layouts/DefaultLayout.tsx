export default function DefaultLayout({ project }) {
  return (
    <div>
      <h1>{project.title}</h1>

      {project.content.map((block, i) => {
        if (block.type === "text") {
          return <p key={i}>{block.text}</p>
        }
        return null
      })}
    </div>
  )
}