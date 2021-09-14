# Tinyurl

## Usage

`clone -> install -> run dev`

1. `git clone git@github.com:DevinDon/tinyurl.git`
2. `npm i`
3. `npm run dev`
4. Open `http://localhost:4200`

## Project

- Module
  - routing
    - lazy load
  - component
    - loading
  - page
    - `<App>`
      - Header
        - Company Logo
        - App Logo
      - Router Outlet
      - Footer
        - Copyright
        - Policy
    - `<Home>`
      - App Logo
      - Input
        - URL valid
        - State output
      - Submit
        - shorten state, initial state
        - after shorten, auto copy
        - invalid state, disable to click
        - loading state, disable to click
      - History Link
      - Analysis Link
    - `<Policy>`
    - `<History>`
      - List
        - Icon
        - Title
        - Link
        - Time
    - <del>`<Analysis>`</del>
      - <del>Page View</del>
      - <del>Top View</del>
- Service
  - API
    - `POST /url`
    - `GET /s/:id`
    - <del>`GET /profile`</del>
    - <del>`GET /views/amount?day=7&order=DESC`</del>
    - <del>`GET /views/visitors?day=7&order=DESC`</del>
    - <del>`GET /views/hosts?day=7&order=DESC`</del>
  - Cache
    - Cache Map
    - Load from cache
    - Save to memory cache map
    - Save to localStorage
- Interceptor
  - Cache
- Style
  - Responsive
    - Desktop
    - Mobile
    - <del>Tablet</del>
  - Link animation
  - @angular/material

## API Interface

> 注：遵循 RESTful API 设计，统一使用复数名词。

### 1. Shorten URL

> 长网址生成短网址。

| 键       | 值                | 注释 |
| -------- | ----------------- | ---- |
| 路径     | `POST /url`       |      |
| 路径参数 | 无                |      |
| 传入数据 | `{ url: string }` |      |
| 返回数据 | `{ url: string }` |      |

### 2. Access Short URL

> 通过短网址跳转到对应的长网址。

| 键       | 值             | 注释                                                            |
| -------- | -------------- | --------------------------------------------------------------- |
| 路径     | `GET /s/:id`   | `id` 指生成的短网址 ID，与部署域名无关                          |
| 路径参数 | 无             |                                                                 |
| 传入数据 |                |                                                                 |
| 返回数据 | `302 redirect` | 返回 302 临时跳转状态（业务需求，禁止搜索引擎自动收录原始地址） |
