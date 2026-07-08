# AI-Ops Visual Dashboard

一个面向 AIOps 场景的前端可视化大屏项目，使用 Vue 3、TypeScript 和 ECharts 构建，重点展示运维指标、实时态势、告警联动与业务拓扑的统一视图。

## ✨ 项目效果

- 16:9 深色科技风大屏布局
- 业务链路、吞吐趋势、节点负载、健康度、能力雷达、拓扑态势一体化展示
- 支持前端 Mock 数据与可切换的真实接口数据源结构
- 适合课程作业、演示汇报、前端可视化实训展示

## 🧩 核心能力

- 实时运维指标卡片
- 业务链路占比与区域负载排行
- 吞吐趋势、健康度仪表与能力雷达
- 全域拓扑态势与告警联动日志
- Pinia 状态管理、ECharts 图表封装、Vitest 与 Playwright 测试覆盖

## 🛠 技术栈

- Vue 3
- TypeScript
- Vite
- ECharts
- Pinia
- Axios
- Vitest
- Playwright
- ESLint / Prettier

## 🚀 本地运行

```bash
git clone https://github.com/you0714/AI-Ops-Visual-Dashboard.git
cd AI-Ops-Visual-Dashboard
npm install
npm run dev
```

然后访问：

- http://localhost:5173

## 🏗 构建

```bash
npm run build
```

## 🧪 测试

```bash
npm run test
```

## 🌐 在线预览

项目已部署到 GitHub Pages：

- https://you0714.github.io/AI-Ops-Visual-Dashboard/

## 📁 项目结构

```text
src/
  app/           # 应用入口与全局样式
  charts/        # ECharts 图表组件
  components/    # 公共组件
  layouts/       # 大屏布局容器
  mocks/         # Mock 数据与模拟器
  services/      # 数据服务层
  stores/        # Pinia 状态管理
  tests/         # 单元测试与 E2E 测试
  types/         # TypeScript 类型定义
  utils/         # 工具函数
views/
  DashboardView.vue
```

## 📝 说明

本项目为前端可视化实训/演示项目，默认使用前端 Mock 数据，便于本地运行与展示；如需接入真实接口，可在服务层中切换数据源。
