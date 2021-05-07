# 一个node下面简单封装的request请求
- 注意版本要求node 10.x及以上版本 由于依赖got中的cacheable-lookup， 需要node>=10.6.0, so

- github: https://github.com/zdhsoft/xmrequest
- npm: https://www.npmjs.com/package/xmrequest

## 历史记录
- 0.9.0
  - 2021-05-07
    - + 实现GotUtils
- 0.0.2
  - 2021-05-06
    - * 删除原有的js代码，改为ts，去除原有的request依赖，改为got。
    - * 将临时文件增加忽略文件中。
    - * 将xmcommon的依赖提升到最新的版本。
