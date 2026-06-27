# WATFlight 网站代码优化修改计划书

> 实施状态：六个阶段已于本轮完成，最终验证结果以仓库当前的 Lint、类型检查、生产构建和浏览器回归记录为准。

## 1. 目标与原则

本计划用于减少无效代码和静态资源、降低客户端 JavaScript 与滚动渲染开销、恢复可靠的质量门禁，并在不改变现有视觉设计和交互结果的前提下改善项目结构。

实施原则：

1. 先建立基线和质量门禁，再删除模板遗留内容。
2. 先做可验证的低风险优化，再重构滚动动画。
3. 每个阶段独立提交，避免把资源清理、视觉调整和运行逻辑重构混在一起。
4. 删除资源前通过代码引用、页面截图和生产页面三重确认。

## 2. 审查结论摘要

### P0：应优先处理

1. `next.config.mjs` 设置了 `typescript.ignoreBuildErrors: true`，生产构建可能在存在类型错误时继续完成。
2. `npm run lint` 当前无法运行，因为项目没有安装或配置 ESLint。
3. `next/image` 的全局优化被关闭，且多个 `fill` 图片没有提供 `sizes`，会增加图片传输量。
4. Hero 和右侧进度导航各自注册滚动监听，并在滚动过程中频繁更新 React state。

### P1：明确的无用代码与资源

1. `components/ui/` 下约 57 个 shadcn/ui 文件没有被当前页面引用。
2. `components/fade-image.tsx` 没有调用方。
3. `hooks/use-mobile.ts`、`hooks/use-toast.ts`、`lib/utils.ts` 仅服务于未使用的 UI 模板代码。
4. `styles/globals.css` 没有被导入；实际样式入口是 `app/globals.css`。
5. `public/images/` 约有 80 个文件、总计约 30.3 MB；当前 TSX 静态引用只有 8 个文件，合计约 0.285 MB。其余约 30 MB 需要在删除前做最终人工确认。
6. `app/globals.css` 中存在重复滚动条规则，以及多组没有调用方的动画和工具类。
7. `TestimonialsSection` 存在未使用的 `Image` import；`ThemeProvider` 存在未使用的 React import。

### P2：组件与架构机会

1. `CompetitionsSection`、`SponsorshipSection`、`TeamSection`、`TestimonialsSection` 都没有 Hook 或浏览器 API，却被标记为 Client Component。
2. 网站被永久强制为暗色主题，但仍通过 `next-themes` 在客户端提供主题上下文。
3. Header 与 ProgressionNav 分别维护导航配置，存在 section id 和标签发生漂移的风险。
4. 三个同级 section 标题已经采用相同样式，但类名仍分别复制，后续容易再次不一致。
5. Team 中的加入步骤和社交链接为重复 JSX，可改为数据驱动渲染。

## 3. 分阶段修改计划

### 阶段一：恢复质量门禁与基线

涉及文件：`package.json`、`next.config.mjs`、新增 ESLint 配置，可选新增 CI 配置。

修改内容：

1. 安装并配置与 Next.js 16 兼容的 ESLint，恢复可执行的 `lint` 命令。
2. 新增独立的 `typecheck` 命令：`tsc --noEmit`。
3. 删除 `typescript.ignoreBuildErrors: true`，让生产构建阻止类型错误进入部署。
4. 选择 pnpm 作为唯一包管理器，在 `package.json` 添加 `packageManager`，删除 `package-lock.json`。
5. 在后续删除无用代码时开启或单独执行未使用变量检查。
6. 记录优化前的生产构建结果、Lighthouse 移动端数据、首屏图片传输量和客户端 JS 体积。

验收标准：`pnpm lint`、`pnpm typecheck`、`pnpm build` 均成功，锁文件只有一份。

### 阶段二：删除模板遗留代码、依赖和资源

涉及目录：`components/ui/`、`hooks/`、`components/fade-image.tsx`、`lib/utils.ts`、`styles/globals.css`、`public/images/`。

修改内容：

1. 删除没有调用方的 57 个 UI 组件和 FadeImage。
2. 删除仅由这些模板组件使用的 Hook 与工具函数。
3. 删除未导入的 `styles/globals.css`。
4. 删除 `app/globals.css` 中重复的滚动条定义和确认无调用方的动画类。
5. 建立“保留图片清单”，人工核对线上页面后删除未使用图片。
6. 根据剩余 import 重新精简依赖，重点移除未使用的 Radix、表单、图表、轮播、日期、Toast、Drawer 等依赖。
7. 删除不再需要的 `tw-animate-css`、`tailwindcss-animate`、`autoprefixer` 等直接依赖前，确认 PostCSS 和现用动画不依赖它们。
8. 保留 `components.json` 仅在团队仍计划继续使用 shadcn CLI 时；否则一并删除。

验收标准：页面功能和视觉截图无变化；无断链图片；依赖安装结果干净；仓库不再包含无引用模板目录。

### 阶段三：收窄 Client Component 边界

涉及文件：四个静态 section、`app/layout.tsx`、`components/theme-provider.tsx`。

修改内容：

1. 从 Competitions、Sponsorship、Team、Testimonials 四个静态 section 移除 `"use client"`。
2. 将暗色模式直接设置在根 `<html className="dark">`，移除强制主题 Provider。
3. 删除 `components/theme-provider.tsx` 和 `next-themes` 依赖。
4. 仅保留 Header、HeroSection、ProgressionNav 为 Client Component。

收益：减少 hydration 范围、客户端模块数量和主题初始化脚本，降低刷新时样式状态不一致的概率。

验收标准：服务端 HTML 包含静态 section 内容；无 hydration 警告；页面始终保持当前暗色主题。

### 阶段四：图片加载与传输优化

涉及文件：`next.config.mjs`、Hero、Sponsorship、Team。

修改内容：

1. 删除 `images.unoptimized: true`，恢复 Next.js 图片优化。
2. 为所有 `fill` 图片补充准确的 `sizes`。
3. 仅保留真正影响 LCP 的首屏主图为高优先级；侧边图继续延迟加载。
4. 检查 Logo 的源尺寸、透明边界和输出格式，避免用超大画布展示小图标。
5. 对仍需直接静态分发的图片预先压缩，并记录视觉质量阈值。

验收标准：LCP 不退化；首屏图片传输量下降；控制台不再出现缺少 `sizes` 的警告；不同 DPR 下图片保持清晰。

### 阶段五：滚动性能重构

涉及文件：`components/sections/hero-section.tsx`、`components/progression-nav.tsx`，建议新增 `hooks/use-scroll-store.ts`。

修改内容：

1. 建立单例滚动订阅或 `useSyncExternalStore`，合并重复的 window scroll 监听与 RAF 调度。
2. Hero 不再每帧通过 `setState` 重渲染整个组件树；改为更新 CSS 自定义属性或最小动画节点。
3. 将 Hero 左右图片在模块初始化时预分组，避免每次渲染重复执行两次 `filter`。
4. 使用图片路径作为 key，避免数组索引 key。
5. ProgressionNav 缓存 section 元素，避免每次滚动重新执行 `getElementById` 和创建数组。
6. 使用 IntersectionObserver 判定 active section；进度线使用 `transform: scaleY()`，避免频繁改变高度造成布局计算。
7. 重新评估长期存在的 `will-change`，只为确实动画的元素保留合成层提示。
8. 增加 `prefers-reduced-motion` 降级方案，关闭或简化长距离滚动动画。

验收标准：滚动时 React Profiler 不再显示 Hero 每帧完整重渲染；主线程长任务减少；视觉时序和 35vh 停留效果保持一致。

### 阶段六：组件与内容架构整理

建议新增：`components/section-heading.tsx`、`content/site-content.ts` 或相近命名。

修改内容：

1. 抽取同级标题组件，统一 eyebrow、标题宽度、字号和间距；允许少量 className 覆盖，不把所有 section 强行套入同一模板。
2. 将导航 section id、Header 导航和 ProgressionNav 配置集中到单一数据源。
3. 将 competitions、tiers、teamMembers、joinSteps、socialLinks 等静态数据移入内容模块。
4. 把 Join Step、Social Link、Team Member 等重复项改为小型数据驱动组件。
5. 保持 Hero 独立，不将其滚动动画塞入通用 section 抽象。
6. 更新 README，移除旧的电商模板名称和无关 v0 文案，补充真实项目结构、命令和部署说明。

验收标准：新增 section 或导航项只需修改一个配置位置；同级标题不会因复制类名再次漂移；README 与实际项目一致。

## 4. 不建议的重构

1. 不建议引入全局状态库：当前页面状态规模很小，滚动外部 store 或轻量 Hook 足够。
2. 不建议把所有 section 合并成一个巨型配置渲染器：Hero、赞助卡和 Team 的结构差异明显，过度抽象会降低可读性。
3. 不建议仅为减少文件数而合并组件：重点应是减少客户端边界和重复逻辑，而不是追求更少文件。
4. 不建议在删除图片前只依赖文本搜索，CSS、文档或即将发布的内容可能仍需使用资源。

## 5. 推荐实施顺序

1. 阶段一：质量门禁与性能基线。
2. 阶段二：无用代码、依赖、CSS 和图片清理。
3. 阶段三：Server/Client Component 边界与主题简化。
4. 阶段四：图片优化。
5. 阶段五：滚动性能重构。
6. 阶段六：共享组件、内容配置和文档整理。

每个阶段完成后均执行桌面端与手机端截图对比、键盘导航检查、外链检查、类型检查、Lint 和生产构建。滚动性能重构阶段额外使用 Performance 与 React Profiler 对比前后结果。
