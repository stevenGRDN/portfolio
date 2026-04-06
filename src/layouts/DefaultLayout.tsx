export default function DefaultLayout({ project } : { project : any}) {
  return (
    <div>
      <h1>{project.title}</h1>

      {project.content.map((block : any, i : number) => {
        if (block.type === "text") {
          return <p key={i}>{block.text}</p>
        }
        return null
      })}
    </div>
  )
}