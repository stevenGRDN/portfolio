const project = {
  title: "Project A",
  slug: "project-a",
  date: {
    value: "2025-01-01",
    display: '2025 - present'
  },
  type: "web app - business",
  tags: ["web"],
  // extras:['React - NextJS', 'even more', 'and more'],
  extras:['React - NextJS',],
  cover: "/images/project-a.jpg",

  layout: "default",

  content: [
    { type: "text", text: "Description" },
    { type: "projectCover", src: "/portfolio/images/project-a/cover-1.png" },
    { type: "cover", src: "/portfolio/images/project-a/cover-1.png" },
    { type: "cover", src: "/portfolio/images/project-a/cover-2.png" },
    { type: "cover", src: "/portfolio/images/project-a/cover-3.png" },
  ]
}

export default project