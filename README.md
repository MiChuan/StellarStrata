# StellarStrata · 生日星图与文物

输入你的出生日期，探索那一天的**星空星图**与**出土文物**，生成精美的卡片式页面，并可导出为带**站点二维码**的图片进行分享。

在线访问：<https://michuan.github.io/StellarStrata/>

## ✨ 功能特性

- 🗓️ 选择出生日期，生成专属结果
- 🌌 星图卡片：黄道星座、月相、行星位置、可见星座，并根据日期所属季节展示对应的四季星图（春/夏/秋/冬）
- 🏺 文物卡片：与日期相关的出土文物图片与图文介绍
- 🎵 背景音乐播放器：首页顶部与结果卡片页各配备播放器，支持播放/暂停、进度拖动、静音
- 🖼️ 一键导出为图片，图片底部包含站点二维码与网址，方便扫码分享
- 🚀 通过 GitHub Actions 自动部署到 GitHub Pages

## 🛠️ 技术栈

- React 18 + TypeScript + Vite
- Tailwind CSS
- react-router-dom
- html2canvas（导出图片）+ qrcode（生成二维码）

## 💻 本地开发

```bash
npm install
npm run dev      # 启动开发服务器 http://localhost:5173
npm run build    # 生产构建，输出到 dist/
npm run preview  # 预览生产构建
```

## 🚀 部署到 GitHub Pages

本仓库已内置 GitHub Actions 工作流（`.github/workflows/deploy.yml`），推送到 `main` 分支即自动构建并部署。

首次使用需在 GitHub 仓库中开启 Pages：

1. 进入仓库 **Settings → Pages**
2. **Build and deployment → Source** 选择 **GitHub Actions**
3. 将代码推送到 `main` 分支，等待 Actions 运行完成
4. 访问 `https://<用户名>.github.io/StellarStrata/`

> 说明：站点部署在 `/StellarStrata/` 子路径下，已在 `vite.config.ts` 中配置 `base`。
> 若你 fork 到不同的仓库名，请同步修改 `vite.config.ts` 中的 `base` 值。

## 📁 目录结构

```
src/
├── components/      # DatePicker / StarChartCard / ArtifactCard / MusicPlayer / ExportButton / ShareFooter
├── data/            # astronomy.ts（星图与季节数据）/ artifacts.ts（文物数据）
├── assets/
│   ├── starcharts/  # 四季星图 spring/summer/autumn/winter.jpg
│   └── artifacts/   # 文物图片
├── pages/Home.tsx   # 主页面
└── App.tsx          # 路由入口

public/
└── music/           # 背景音乐 home.mp3（首页）/ card.mp3（结果页）
```

## 📝 待办事项

- [ ] 星图数据库建立
- [ ] 文物图片数据库建立
