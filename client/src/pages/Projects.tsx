const awards = [
  {
    id: "01",
    name: "美国大学生数学建模竞赛",
    description:
      "获得 M 奖（Meritorious Winner），在全球数千支参赛队伍中脱颖而出，展现了扎实的数学建模能力与团队协作精神。",
    tags: ["数学建模", "国际竞赛", "团队合作"],
    level: "M 奖",
  },
  {
    id: "02",
    name: "高教社杯全国大学生数学建模竞赛",
    description:
      "在省级赛区中获得一等奖，通过建立数学模型解决实际问题，完成了高质量的论文撰写与模型求解。",
    tags: ["数学建模", "省级竞赛", "论文撰写"],
    level: "省级一等奖",
  },
  {
    id: "03",
    name: "大学英语六级考试",
    description:
      "顺利通过全国大学英语六级考试（CET-6），具备良好的英语阅读、写作与沟通能力。",
    tags: ["英语", "语言能力"],
    level: "通过",
  },
  {
    id: "04",
    name: "普通话水平测试",
    description:
      "获得普通话水平测试二级甲等证书，发音标准，语言表达流畅。",
    tags: ["普通话", "语言能力"],
    level: "二级甲等",
  },
];

const levelColors: Record<string, string> = {
  "M 奖": "text-foreground",
  "省级一等奖": "text-foreground",
  通过: "text-foreground",
  "二级甲等": "text-foreground",
};

export default function Projects() {
  return (
    <div className="min-h-screen pt-24 md:pt-32">
      {/* Header */}
      <section className="pb-16 md:pb-20">
        <div className="container">
          <p className="text-xs font-sans tracking-[0.2em] uppercase text-muted-foreground mb-6">
            竞赛
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
            <h1 className="font-serif text-5xl md:text-6xl font-black leading-tight">
              我的
              <br />
              <em className="font-display italic font-light">荣誉</em>
            </h1>
            <p className="font-display text-lg text-muted-foreground italic leading-relaxed pb-2">
              这里记录了我参加的重要竞赛与取得的证书，每一项都是努力与成长的见证。
            </p>
          </div>
          <div className="w-12 h-px bg-foreground mt-8" />
        </div>
      </section>

      {/* Awards Grid */}
      <section className="pb-24">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-t border-l border-border">
            {awards.map((award) => (
              <div
                key={award.id}
                className="border-r border-b border-border p-8 group hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-6">
                  <span className="text-xs font-sans tracking-[0.15em] text-muted-foreground">
                    {award.id}
                  </span>
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-xs font-sans tracking-[0.1em] uppercase ${levelColors[award.level] ?? "text-muted-foreground"}`}
                    >
                      {award.level}
                    </span>
                  </div>
                </div>

                <h2 className="font-serif text-2xl font-bold mb-3 group-hover:opacity-70 transition-opacity">
                  {award.name}
                </h2>
                <p className="font-display text-base text-muted-foreground italic leading-relaxed mb-6">
                  {award.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {award.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-sans tracking-wide px-2 py-0.5 bg-secondary text-secondary-foreground border border-border"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
