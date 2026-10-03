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
- **主题**：landscape 1.1.0
- **托管**：GitHub Pages（免费，无需服务器）
- **构建**：`.github/workflows/deploy.yml`，推送到 `source` 分支即触发

不需要本地环境也能写：直接在 GitHub 网页上编辑 `source/_posts/` 里的文件，提交后自动发布。

---

## 功能清单

### 写作

| 功能 | 状态 | 说明 |
| --- | --- | --- |
| Markdown 正文 | ✅ | 直接写 |
| Front matter | ✅ | 开头 `---` 块里的 `title` / `date` / `tags` / `categories` |
| 首页摘要 | ✅ | 正文里插一行 `<!-- more -->`，首页只显示它之前的内容，并带「Read More」链接 |
| 代码高亮 | ✅ | 三反引号代码块，带行号（highlight.js） |
| 图片灯箱 | ✅ | 正文里的图片点击可放大（fancybox） |
| 草稿 | ✅ | 见 [写草稿](#写草稿) |
| 封面图 | ❌ | landscape 主题不支持 `cover` 字段，写了也不会显示 |

### 组织与浏览

| 功能 | 地址 |
| --- | --- |
| 分类页 | `/categories/essay/` |
| 标签页 | `/tags/blog/` |
| 归档（按年月） | `/archives/` |
| 侧栏组件 | 分类、标签、标签云、归档、最新文章（含文章计数） |
| 分页 | 每页 10 篇 |

### 分发 / SEO

- **RSS 订阅**：`/atom.xml`
- **站点地图**：`/sitemap.xml`
- **Open Graph**：分享到社交平台时生成标题与摘要预览
- **URL 全英文**：文章是哈希（`/2025/10/03/d770d4b1/`），分类与标签是英文 slug

### 已配置但默认关闭

| 功能 | 开启方式 |
| --- | --- |
| valine 评论 | 到 [leancloud.cn](https://leancloud.cn) 注册应用，把 AppID / AppKey 填进 `_config.landscape.yml`，并把 `enable` 改为 `true` |
| Disqus 评论 | `_config.landscape.yml` 里填 `disqus_shortname` |
| Google Analytics | `_config.landscape.yml` 里填 `google_analytics` |

### 没有的功能

站内搜索、目录 TOC、数学公式、阅读时长统计。

> ⚠️ **页头的搜索框当前不可用。**
> Hexo 7 内置的 `search_form` helper 硬编码指向 `google.com`，而 Google 在国内无法访问，
> 访客点击搜索会打不开页面。要修复可以把 helper 覆盖成必应搜索，或直接移除搜索框。

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
subtitle: '第一篇博客'          # 显示在页头大图上的副标题
description: 'shangyun-sx的个人博客'
keywords: 'shangyun-sx, blog, hexo, github'
author: Shangyun
```

### 改外观 / 开启功能

编辑 **`_config.landscape.yml`**。

> **不要直接改 `node_modules/hexo-theme-landscape/` 里的文件** —— `npm update` 会把改动覆盖掉。
> `_config.landscape.yml` 会与主题自带配置深度合并，只需写要改的键。
> 完整可配置项见 `node_modules/hexo-theme-landscape/_config.yml`。

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
├── _config.yml                 # 站点配置：标题、URL、插件、部署
├── _config.landscape.yml       # 主题配置：菜单、社交图标、侧栏、评论
├── package.json                # 依赖与快捷命令
├── source/                     # ← 你写的东西都在这里
│   ├── _posts/                 # 已发布的文章（Markdown）
│   ├── _drafts/                # 草稿，不会被发布
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

### 文章的 URL 是怎么生成的

由 `hexo-abbrlink` 根据标题算出的哈希，例如 `/2025/10/03/d770d4b1/`。

哈希在首次生成时会写回文章的 front matter（`abbrlink:` 字段）并固定下来，因此**改标题不会改变已发布文章的 URL**。

---

## 技术栈

- [Hexo](https://hexo.io/) 7.3.0
- [hexo-theme-landscape](https://github.com/hexojs/hexo-theme-landscape) 1.1.0
- [hexo-abbrlink](https://github.com/ohroy/hexo-abbrlink) —— 生成短哈希 URL
- [hexo-generator-feed](https://github.com/hexojs/hexo-generator-feed) —— RSS
- [hexo-generator-sitemap](https://github.com/hexojs/hexo-generator-sitemap) —— 站点地图
- GitHub Actions + GitHub Pages
