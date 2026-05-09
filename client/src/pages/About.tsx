import { ArrowRight } from "lucide-react";
import { Link } from "wouter";

const skills = [
  { category: "前端开发", items: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Vue.js"] },
  { category: "后端开发", items: ["Node.js", "Python", "FastAPI", "PostgreSQL", "Redis"] },
  { category: "工具与其他", items: ["Git", "Docker", "Linux", "Figma", "Notion"] },
];

const experiences = [
  {
    period: "2023 — 至今",
    role: "全栈工程师",
    company: "某科技公司",
    description: "负责核心产品的前后端架构设计与开发，主导多个关键功能模块的落地。",
  },
  {
    period: "2021 — 2023",
    role: "前端开发工程师",
    company: "某互联网公司",
    description: "参与 B 端产品的研发，优化用户体验，推动前端工程化建设。",
  },
  {
    period: "2017 — 2021",
    role: "计算机科学 学士",
    company: "某大学",
    description: "主修计算机科学与技术，辅修数学，参与多项科研项目。",
  },
];

export default function About() {
  return (
    <div className="min-h-screen pt-24 md:pt-32">
      {/* Header */}
      <section className="pb-16 md:pb-24">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-7">
              <p className="text-xs font-sans tracking-[0.2em] uppercase text-muted-foreground mb-6">
                关于我
              </p>
              <h1 className="font-serif text-5xl md:text-6xl font-black leading-tight mb-8">
                你好，
                <br />
                <em className="font-display italic font-light">很高兴认识你</em>
              </h1>
              <div className="w-12 h-px bg-foreground mb-8" />
              <div className="space-y-5 font-display text-lg text-muted-foreground italic leading-relaxed">
                <p>
                  我是一名全栈工程师与独立创作者，热衷于用技术解决真实问题，同时对设计、写作和人文思考保持持续的好奇心。
                </p>
                <p>
                  在代码之外，我喜欢阅读哲学与历史，相信好的软件如同好的文章——需要清晰的结构、精准的表达，以及对读者（用户）的深刻理解。
                </p>
                <p>
                  这个博客是我记录思考、分享探索的地方。欢迎你在这里停留，也欢迎与我交流。
                </p>
              </div>
            </div>
            <div className="md:col-span-5">
              <div className="aspect-[4/5] bg-secondary flex items-center justify-center border border-border">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                    <span className="font-serif text-3xl font-bold text-muted-foreground">J</span>
                  </div>
                  <p className="font-display text-sm italic text-muted-foreground">个人照片</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="container">
        <div className="border-t border-border" />
      </div>

      {/* Skills */}
      <section className="py-20 md:py-28">
        <div className="container">
          <p className="text-xs font-sans tracking-[0.2em] uppercase text-muted-foreground mb-3">
            技能
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-12">专业能力</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-border pt-8">
            {skills.map((skillGroup) => (
              <div key={skillGroup.category}>
                <h3 className="text-xs font-sans tracking-[0.15em] uppercase text-muted-foreground mb-5">
                  {skillGroup.category}
                </h3>
                <ul className="space-y-3">
                  {skillGroup.items.map((skill) => (
                    <li key={skill} className="flex items-center gap-3">
                      <span className="w-1 h-1 bg-foreground rounded-full flex-shrink-0" />
                      <span className="font-display text-base text-foreground">{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="container">
        <div className="border-t border-border" />
      </div>

      {/* Experience */}
      <section className="py-20 md:py-28">
        <div className="container">
          <p className="text-xs font-sans tracking-[0.2em] uppercase text-muted-foreground mb-3">
            经历
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-12">工作与教育</h2>
          <div className="space-y-0">
            {experiences.map((exp, i) => (
              <div
                key={i}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 py-8 border-t border-border"
              >
                <div className="md:col-span-3">
                  <p className="text-xs font-sans tracking-[0.1em] text-muted-foreground">
                    {exp.period}
                  </p>
                </div>
                <div className="md:col-span-9">
                  <h3 className="font-serif text-xl font-bold mb-1">{exp.role}</h3>
                  <p className="text-xs font-sans tracking-widest uppercase text-muted-foreground mb-3">
                    {exp.company}
                  </p>
                  <p className="font-display text-base text-muted-foreground italic leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="container pb-24">
        <div className="border-t border-border pt-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <p className="font-display text-xl italic text-muted-foreground">
            想了解更多或寻求合作？
          </p>
          <Link href="/contact">
            <span className="inline-flex items-center gap-2 text-xs font-sans tracking-[0.15em] uppercase border border-foreground px-5 py-3 hover:bg-foreground hover:text-background transition-colors cursor-pointer">
              联系我 <ArrowRight size={14} />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
