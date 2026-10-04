---
title: {{ title }}
date: {{ date }}
# updated 不会被自动更新（_config.yml 里 updated_option 是 'empty'），改文章时手动往前推。
# 两处日期必须同时存在，否则页面上的「更新于」会显示成构建时间而不是文章时间。
updated: {{ date }}
tags:
# 封面图，可选。填图片 URL 或 /img/xxx.jpg；留空则首页卡片不显示封面
# cover:
---
