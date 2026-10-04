# Shangyun's Blog

个人博客的**源站仓库**。基于 [Hexo](https://hexo.io/) 7 构建，托管在 GitHub Pages。

- 线上地址：<https://shangyun-sx.github.io>
- **你正在看的 `source` 分支是源文**（Markdown + 配置）
- `main` 分支是自动构建的产物，由 GitHub Actions 生成，**不要直接改**

> 日常写作只需要动 `source/_posts/` 下面的 Markdown 文件。

---

## 目录

- [这套博客怎么运作](#这套博客怎么运作)
- [功能清单](#功能清单)
- [怎么用](#怎么用)
- [项目结构](#项目结构)
- [常见问题](#常见问题)

---

## 这套博客怎么运作

```
你写 Markdown  ──git push──▶  GitHub Actions 自动编译  ──▶  main 分支  ──▶  GitHub Pages 上线
   (source 分支)                    (约 1 分钟)
```

- **引擎**：Hexo 7.3.0 —— 把 Markdown 编译成静态 HTML
- **主题**：Butterfly 5.7.0
- **托管**：GitHub Pages（免费，无需服务器）
- **构建**：`.github/workflows/deploy.yml`，推送到 `source` 分支即触发

不需要本地环境也能写：直接在 GitHub 网页上编辑 `source/_posts/` 里的文件，提交后自动发布。

---

## 功能清单

### 写作

| 功能 | 状态 | 说明 |
| --- | --- | --- |
| Markdown 正文 | ✅ | 直接写 |
| Front matter | ✅ | 开头 `---` 块里的 `title` / `date` / `updated` / `tags` / `categories` / `cover` |
| 首页摘要 | ✅ | 插一行 `<!-- more -->` 指定截断位置；不插则自动截取前 500 字（`index_post_content`） |
| 代码高亮 | ✅ | 三反引号代码块，带行号、语言标签和复制按钮（highlight.js） |
| 图片灯箱 | ✅ | 正文里的图片点击可放大（fancybox） |
| 目录 TOC | ✅ | 文章正文里有标题才会出现；滚动时高亮当前小节并显示阅读进度百分比 |
| 字数 / 阅读时长 | ✅ | 文章页标题下方、侧栏「全站统计」里显示（hexo-wordcount） |
| 封面图 | ✅ | front matter 里写 `cover:`，见[关于封面图](#关于封面图) |
| 文章更新时间 | ✅ | front matter 里手写 `updated:`，见[关于「更新时间」](#关于更新时间) |
| 草稿 | ✅ | 见 [写草稿](#写草稿) |

### 组织与浏览

| 功能 | 地址 |
| --- | --- |
| 分类页 | `/categories/essay/` |
| 标签页 | `/tags/blog/` |
| 归档（按年月） | `/archives/` |
| 站内搜索 | 导航栏的放大镜，弹层里实时搜索，见[搜索](#搜索) |
| 侧栏组件 | 文章页是「作者卡片 + 公告 + 最新文章（+ 有标题时的目录）」；首页/归档/标签/分类页是「作者卡片 + 公告 + 最新文章 + 分类 + 标签 + 归档 + 全站统计」 |
| 分页 | 每页 10 篇 |

### 分发 / SEO

- **RSS 订阅**：`/atom.xml`
- **站点地图**：`/sitemap.xml`
- **Open Graph**：分享到社交平台时生成标题与摘要预览
- **URL 全英文**：文章是哈希（`/2025/10/03/d770d4b1/`），分类与标签是英文 slug

### 已配置但默认关闭

| 功能 | 开启方式 |
| --- | --- |
| valine 评论 | 到 [leancloud.cn](https://leancloud.cn) 注册应用，把 AppID / AppKey 填进 `_config.butterfly.yml` 的 `valine`，再把 `comments.use` 改成 `Valine` |
| Disqus 评论 | `_config.butterfly.yml` 里填 `disqus.shortname`，再把 `comments.use` 改成 `Disqus` |
| 访客统计 | `_config.butterfly.yml` 里把 `busuanzi` 三项改成 `true`（会向第三方发请求，默认关） |
| Google Analytics | `_config.butterfly.yml` 里填 `google_analytics` |
| 「本文已过时」提示 | `_config.butterfly.yml` 里把 `noticeOutdate.enable` 改成 `true`——它读的正是文章手写的 `updated:`，这是 `updated` 除了页面显示之外的第二个用途 |

### 搜索

导航栏的放大镜打开**本地搜索**弹层，输入即实时匹配标题与正文，不跳转、也不依赖任何外部服务。

构建时 `hexo-generator-searchdb` 会把所有文章导出成 `/search.xml`，访客的浏览器直接读这个文件来搜。
配置分散在两处，改一处要记得改另一处：

- `_config.yml` 的 `search.path` —— 索引文件名
- `_config.butterfly.yml` 的 `search.use: local_search`，以及 `search.local_search.unescape`（配合 `search.format: html`）

> 历史：以前用 `scripts/search.js` 覆盖过 Hexo 内置的 `search_form` helper，把搜索框改成提交到必应
> （内置版本硬编码提交到 `google.com`，国内打不开）。换 Butterfly 后它自带搜索 UI、不走这个 helper，
> 该文件已删除。

### 没有的功能

数学公式、文章系列（series）、评论（已配置但未启用）。

---

## 怎么用

### 日常写文章

```bash
cd /d/Blog/myblog

npx hexo new "文章标题"        # 生成 source/_posts/文章标题.md
# 用编辑器写正文

npm run server                 # 可选：本地预览 http://localhost:4000
# 预览完按 Ctrl+C 退出

git add -A
git commit -m "post: 文章标题"
git push                       # 推完约 1 分钟自动上线
```

构建进度：<https://github.com/shangyun-sx/shangyun-sx.github.io/actions>

### 写草稿

草稿放在 `source/_drafts/`，**不会被发布**。

```bash
npx hexo new draft "标题"       # 新建草稿
npx hexo publish "标题"         # 想发了，移到 _posts/
```

### 换台电脑第一次使用

```bash
git clone -b source https://github.com/shangyun-sx/shangyun-sx.github.io.git myblog
cd myblog
npm install
```

### 改站点信息

编辑 `_config.yml` 顶部：

```yaml
title: Shangyun's Blog
subtitle: ''
description: 'shangyun-sx的个人博客'
keywords: 'shangyun-sx, blog, hexo, github'
author: Shangyun
```

想让副标题显示在首页大图上（带打字机效果），改 `_config.butterfly.yml` 的 `subtitle.enable` 并填 `sub`。
注意站点的 `subtitle` 和主题的 `subtitle` 是两回事，前者 Butterfly 不用。

### 改外观 / 开启功能

编辑 **`_config.butterfly.yml`**（约 1100 行，每项都有英文注释）。

> **不要直接改 `node_modules/hexo-theme-butterfly/` 里的文件** —— `npm update` 会把改动覆盖掉。
> `_config.butterfly.yml` 会与主题自带配置深度合并，只需写要改的键。
> 完整可配置项见 `node_modules/hexo-theme-butterfly/_config.yml`，或[官方文档](https://butterfly.js.org/)。
>
> 也**不要**把主题整个拷进 `themes/` 目录 —— Hexo 会优先用 `themes/` 那份，等于以后升级要手动合并。
> 本站没有 `themes/` 目录，用的是 npm 装的主题。

### 关于「更新时间」

文章的 `updated:` **不会自动更新**，得手动维护。

`_config.yml` 里的 `updated_option` 设成了 `empty`，含义是「不手写 `updated:` 的文章就没有这个字段」。
为什么不用自动方案：

- `mtime` —— GitHub Actions 每次构建都是全新 clone，会把所有文章的更新时间刷成检出时间，全变成构建那一刻；
- `date` —— 更新时间恒等于发布时间，页面上就是一句废话。

**每篇文章都必须有 `updated:`**。原因是文章页的「更新于」由 Butterfly 的
`post_meta.post.date_type: both` **无条件**渲染，而 Hexo 的日期 helper 对空值会 fallback 到「当前时间」
（`node_modules/hexo/dist/plugins/helper/date.js`）。漏写的后果是页面显示**这次构建的时刻**，看起来像刚改过。

```yaml
title: 文章标题
date: 2026-01-01 10:00:00        # 发布时间，创建时自动写入
updated: 2026-03-05 20:00:00     # 最后修改时间，改动文章后手动往前推
```

`npx hexo new` 用的脚手架 `scaffolds/post.md` 已经带上了 `updated:`（初值等于 `date`），不用手工加。

> 想改成「只在有 `updated:` 时才显示更新于」，得动主题模板；目前的做法是保证每篇都有。
> 另外 `updated:` 还会进 `atom.xml` 和页面的 `dateModified` 结构化数据（对 SEO 有用），
> 打开 `noticeOutdate` 后还会驱动「本文已过时」提示。

### 关于封面图

front matter 里写 `cover:`，首页卡片、归档页和侧栏「最新文章」都会显示：

```yaml
cover: https://example.com/img.jpg   # 外链，或 /img/xxx.jpg（放 source/img/ 下）
```

不写就没有封面，卡片显示纯文字。目前 3 篇文章 + 1 篇草稿共用同一张 unsplash 图。
`_config.butterfly.yml` 的 `cover.default_cover` 可以配「没写 cover 时用的默认图」。

### ⚠️ 新增中文标签或分类时

`_config.yml` 里的映射表负责把中文名转成英文 URL：

```yaml
category_map:
  随笔: essay
tag_map:
  随笔: essay
  博客: blog
  Hexo: hexo
```

**新加中文标签而不在这里补映射，URL 会退回中文**（变成 `%E6%96%B0%E6%A0%87%E7%AD%BE` 这样的百分号编码）。记得同步加一行。

显示名不受影响，页面里依然显示中文。

---

## 项目结构

```
myblog/
├── _config.yml                 # 站点配置：标题、URL、插件、搜索、部署
├── _config.butterfly.yml       # 主题配置：菜单、社交图标、侧栏、评论、CDN
├── scaffolds/
│   ├── post.md                 # npx hexo new 的模板（已带上 updated:）
│   └── draft.md                # npx hexo new draft 的模板
├── package.json                # 依赖与快捷命令
├── source/                     # ← 你写的东西都在这里
│   ├── _posts/                 # 已发布的文章（Markdown）
│   ├── _drafts/                # 草稿，不会被发布
│   ├── img/banner.jpg          # 页头大图
│   └── favicon.png             # 站点图标
├── .github/
│   ├── workflows/deploy.yml    # 自动构建发布
│   └── dependabot.yml          # 依赖自动更新
├── public/                     # 编译产物（已 gitignore）
└── node_modules/               # 依赖（已 gitignore）
```

### 快捷命令

| 命令 | 作用 |
| --- | --- |
| `npm run server` | 本地预览，<http://localhost:4000> |
| `npm run build` | 只编译，不发布 |
| `npm run clean` | 清掉编译缓存 |

---

## 常见问题

### 推送失败：`Failed to connect to github.com:443`

国内直连 GitHub 不稳定，**直接重试**即可。想根治需要挂代理。

### 每次 push 都出现 `git: 'credential-manager-core' is not a git command`

无害的噪音，系统级配置里的 `manager` 会兜住。清掉全局配置里那个失效项：

```bash
git config --global --unset credential.helper
```

### 文章改了但线上没更新

1. 确认 `git push` 成功了（推的是 `source` 分支）
2. 去 [Actions 页面](https://github.com/shangyun-sx/shangyun-sx.github.io/actions) 看构建是否通过
3. GitHub Pages 有几十秒 CDN 缓存，稍等片刻

### 为什么不能用 `npm run publish` / `npm run deploy`

这两个命令会在本地编译并直接推送到 `main` 分支，**与 GitHub Actions 冲突**（两边都在 force-push 同一个分支）。

现在统一由 Actions 发布，本地只需要 `git push`。

### 静态资源不走外部 CDN

Butterfly 默认从 jsdelivr 加载 FontAwesome 图标字体、图片灯箱、分享按钮等第三方脚本，而 jsdelivr 在国内经常加载不出来——挂了的表现是图标全变成方块、灯箱和分享按钮失灵。

本站把 `_config.butterfly.yml` 的 `CDN.third_party_provider` 设成了 `local`，由 `hexo-butterfly-extjs` 在构建时把需要的文件产出到 `/pluginsSrc/`，全站零外链依赖（主题自身的 JS/CSS 本来就是本地的）。

代价是 `public/` 体积涨到约 **11 MB**（其中 9 MB 是 `pluginsSrc/`）——插件会把清单里的**所有**脚本都拷进来，包括没启用的 mermaid、mathjax、twikoo 等。未启用的那些访客永远不会请求，只是每次部署多推几 MB。

想换回官方默认 CDN，把那一行改成 `jsdelivr` 即可，不用卸载依赖。

### 文章页的「更新于」显示成了刚才的时间

漏写 `updated:` 了。见[关于「更新时间」](#关于更新时间)——这是目前唯一的坑，脚手架已经帮你规避。

### 文章的 URL 是怎么生成的

由 `hexo-abbrlink` 根据标题算出的哈希，例如 `/2025/10/03/d770d4b1/`。

哈希在首次生成时会写回文章的 front matter（`abbrlink:` 字段）并固定下来，因此**改标题不会改变已发布文章的 URL**。

---

## 技术栈

- [Hexo](https://hexo.io/) 7.3.0
- [hexo-theme-butterfly](https://github.com/jerryc127/hexo-theme-butterfly) 5.7.0
- [hexo-abbrlink](https://github.com/ohroy/hexo-abbrlink) —— 生成短哈希 URL
- [hexo-generator-searchdb](https://github.com/next-theme/hexo-generator-searchdb) —— 本地搜索索引
- [hexo-generator-feed](https://github.com/hexojs/hexo-generator-feed) —— RSS
- [hexo-generator-sitemap](https://github.com/hexojs/hexo-generator-sitemap) —— 站点地图
- [hexo-wordcount](https://github.com/willin/hexo-wordcount) —— 字数统计与阅读时长
- [hexo-butterfly-extjs](https://github.com/jerryc127/butterfly-plugins) —— 第三方脚本本地化，见[静态资源不走外部 CDN](#静态资源不走外部-cdn)
- GitHub Actions + GitHub Pages
