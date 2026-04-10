const project = {
  title: "Project B",
  slug: "project-b",
  date: {
    value: "2025-01-01",
    display: '2026'
  },
  type: "web app",
  tags: ["web"],
  extras: [],
  cover: "/images/project-a.jpg",

  layout: "default",

  content: [
    { type: "text", text: "Description" },
    { type: "projectCover", src: "/portfolio/images/project-b/cover-2.png" },
    { type: "cover", src: "/portfolio/images/project-b/cover-1.png" },
    { type: "cover", src: "/portfolio/images/project-b/cover-2.png" },
  ]
}

export default project