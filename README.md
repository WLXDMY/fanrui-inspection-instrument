# 凡瑞检验仪器扩展项目

这是凡瑞 QMS“检验仪器”模块的前后端扩展项目。在保留原检验仪器列表、详情、编辑和保存流程的基础上，增加全局扩展字段配置，以及每台仪器独立填写和保存扩展值的能力。

## 功能概览

- 全部检验仪器共用最多 10 个扩展字段定义。
- 支持文本、日期时间和下拉输入字段。
- 每台仪器分别保存扩展字段值。
- 以原仪器稳定 ID 绑定数据；编号或名称修改后同步业务快照。
- 原基础信息保存成功后再保存扩展值，并通过重新读取确认结果。
- 前端跟随宿主运行时地址，经同源 `/instrument-extension/api/v1/` 访问扩展服务，适配设备直连、办公网和外网入口。
- 扩展后端和 MySQL 独立部署，不修改原 QMS 数据库。

## 仓库结构

```text
frontend/     Vue 2.6 检验仪器前端及平台上传适配
backend/      Spring Boot 3.2 独立扩展服务
deployment/   Docker Compose、环境变量示例和 Nginx 路由模板
docs/         架构与部署说明
```

## 技术栈

- 前端：Vue 2.6、Element UI、Vue Router、Axios、Node.js 14
- 后端：Java 21、Spring Boot 3.2.5、Spring Security OAuth2 Resource Server
- 数据库：MySQL 8、Flyway
- 部署：Docker Compose、Nginx

## 本地构建

### 前端

```bash
cd frontend
npm ci
npm run build:upload
```

平台上传模式使用 Hash 路由和相对资源路径，部署时由宿主提供 `baseUrl`、Token 和 Token-Type。不要把临时 Token 写入源码或构建产物。

### 后端

```bash
cd backend
mvn clean package
```

后端测试使用 H2，生产环境通过环境变量连接独立 MySQL。

### Docker Compose

```bash
cd deployment
cp .env.example .env
# 设置随机数据库密码、JWT Issuer 和原 QMS API 地址
docker compose up -d --build
```

业务接口默认启用 JWT 校验；未携带合法 Bearer Token 时返回 `401` 属于预期行为。

## 数据模型

- `instrument_field_definition`：全局字段定义、类型、排序和下拉选项。
- `instrument_binding`：原仪器稳定 ID 与编号、名称、状态快照。
- `instrument_field_value`：每台仪器各字段的实际值。
- `instrument_extension_audit_log`：扩展数据操作审计。

## 安全边界

- 仓库不包含客户 Token、账号、密码、真实 `.env`、数据库数据或运行日志。
- 示例地址均为本机占位值，部署时必须替换为获得授权的现场地址。
- 扩展数据库独立运行；迁入原 QMS 数据库需要单独设计备份、迁移和回滚方案。

## 项目状态

当前版本已经完成真实仪器列表、分类、详情、编辑、扩展字段配置、字段值保存及多网络访问验证。公开仓库提供源码和通用部署模板，不包含客户现场数据与生产凭据。

## 版权说明

本仓库用于已授权项目的开发、交付和技术交流。原平台、第三方组件及其源码的权利归各自权利人所有。本仓库未附带开源许可证，不表示授予复制、分发或商业使用权。
