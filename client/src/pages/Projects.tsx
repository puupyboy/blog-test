import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    id: "01",
    name: "数据可视化平台",
    description:
      "基于 D3.js 与 React 构建的交互式数据可视化工具，支持多维度数据探索与实时图表渲染。用户可上传 CSV/JSON 数据，自动生成折线图、散点图、热力图等多种可视化形式。",
    tags: ["React", "D3.js", "TypeScript", "Node.js"],
    github: "https://github.com",
    demo: "#",
    status: "已上线",
  },
  {
    id: "02",
    name: "AI 写作助手",
    description:
      "利用大语言模型辅助创意写作的工具，提供风格建议、内容扩展与语言润色功能。支持多种写作场景，包括博客文章、技术文档与创意故事。",
    tags: ["Python", "OpenAI API", "FastAPI", "React"],
    github: "https://github.com",
    demo: "#",
    status: "开发中",
  },
  {
    id: "03",
    name: "极简任务管理器",
    description:
      "专注于深度工作的移动端任务管理应用，融合番茄工作法与 GTD 方法论。支持项目分组、优先级排序与专注时间统计。",
    tags: ["React Native", "SQLite", "Expo", "TypeScript"],
    github: "https://github.com",
    demo: "#",
    status: "已上线",
  },
  {
    id: "04",
    name: "个人知识库",
    description:
      "基于双向链接的个人知识管理系统，支持 Markdown 编辑、标签分类与全文检索。灵感来源于 Roam Research 与 Obsidian。",
    tags: ["Next.js", "PostgreSQL", "Prisma", "Tailwind CSS"],
    github: "https://github.com",
    demo: "#",
    status: "规划中",
  },
  {
    id: "05",
    name: "开源 UI 组件库",
    description:
      "一套以编辑美学为设计语言的 React 组件库，包含 30+ 精心设计的基础组件，支持深色模式与主题定制。",
    tags: ["React", "TypeScript", "Storybook", "Rollup"],
    github: "https://github.com",
    demo: "#",
    status: "已上线",
  },
  {
    id: "06",
    name: "命令行效率工具集",
    description:
      "一系列提升开发效率的命令行工具，包括智能 Git 提交信息生成器、项目脚手架工具与文件批量处理工具。",
    tags: ["Node.js", "Shell", "Go"],
    github: "https://github.com",
    demo: null,
    status: "持续更新",
  },
];

const statusColors: Record<string, string> = {
  已上线: "text-foreground",
  开发中: "text-muted-foreground",
  规划中: "text-muted-foreground",
  持续更新: "text-foreground",
};

export default function Projects() {
  return (
    <div className="min-h-screen pt-24 md:pt-32">
      {/* Header */}
      <section className="pb-16 md:pb-20">
        <div className="container">
          <p className="text-xs font-sans tracking-[0.2em] uppercase text-muted-foreground mb-6">
            项目
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
            <h1 className="font-serif text-5xl md:text-6xl font-black leading-tight">
              我的
              <br />
              <em className="font-display italic font-light">作品</em>
            </h1>
            <p className="font-display text-lg text-muted-foreground italic leading-relaxed pb-2">
              这里收录了我参与或独立完成的项目，涵盖工具开发、产品设计与开源贡献。每个项目都是一次探索与学习的过程。
            </p>
          </div>
          <div className="w-12 h-px bg-foreground mt-8" />
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pb-24">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-t border-l border-border">
            {projects.map((project) => (
              <div
                key={project.id}
                className="border-r border-b border-border p-8 group hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-6">
                  <span className="text-xs font-sans tracking-[0.15em] text-muted-foreground">
                    {project.id}
                  </span>
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-xs font-sans tracking-[0.1em] uppercase ${statusColors[project.status] ?? "text-muted-foreground"}`}
                    >
                      {project.status}
                    </span>
                  </div>
                </div>

                <h2 className="font-serif text-2xl font-bold mb-3 group-hover:opacity-70 transition-opacity">
                  {project.name}
                </h2>
                <p className="font-display text-base text-muted-foreground italic leading-relaxed mb-6">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-sans tracking-wide px-2 py-0.5 bg-secondary text-secondary-foreground border border-border"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-sans tracking-[0.1em] uppercase text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Github size={13} />
                    源码
                  </a>
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-sans tracking-[0.1em] uppercase text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <ExternalLink size={13} />
                      演示
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
