'use strict';

// 覆盖 Hexo 内置的 search_form helper。
//
// 内置实现（hexo/dist/plugins/helper/search_form.js）把搜索表单硬编码提交到 google.com，
// 靠一个 hidden 字段限制站点范围：
//     <form action="//google.com/search" ...>
//       <input type="hidden" name="sitesearch" value="<站点 URL>">
// Google 在国内访问不了，所以页头那个搜索框对访客是坏的。
//
// 这里改成必应。必应没有 Google 那样的 sitesearch 参数，只能用 `site:` 搜索语法，
// 而 site: 必须拼进查询词里，所以加了一段内联 onsubmit 在提交前改写输入框的值。
// 浏览器禁用 JS 时会退化成全站搜索（不影响表单本身可用）。
//
// 加载时机：Hexo 的 init() 先注册内置 helper，之后才加载 scripts/ 目录，
// 因此这里的注册会覆盖内置版本（Helper.register 直接赋值，不会报重复）。

// 从 config.url 里取出域名，用于拼 site: 前缀
function siteHost(url) {
  try {
    return new URL(url).host;
  } catch (e) {
    return String(url || '')
      .replace(/^https?:\/\//, '')
      .replace(/\/.*$/, '');
  }
}

hexo.extend.helper.register('search_form', function (options = {}) {
  const { config } = this;
  const className = options.class || 'search-form';
  const { text = 'Search', button } = options;
  // 域名单引号会截断内联 JS，去掉所有引号字符以防万一
  const host = siteHost(config.url).replace(/['"]/g, '');

  const submitButton = button
    ? `<button type="submit" class="${className}-submit">${
        typeof button === 'string' ? button : text
      }</button>`
    : '';

  const input =
    `<input type="search" name="q" class="${className}-input"` +
    (text ? ` placeholder="${text}"` : '') +
    '>';

  // onsubmit 里要先判断前缀是否已存在：提交后按浏览器「后退」回到本页时，
  // bfcache 会连同被改写过的输入框内容一起恢复，此时框里已经是
  // "site:host 关键词"。不加判断地再拼一次会变成
  // "site:host site:host 关键词"，必应认为这是两个互相冲突的 site: 条件，结果为空。
  return (
    `<form action="https://www.bing.com/search" method="get" accept-charset="UTF-8" class="${className}"` +
    ` onsubmit="var el=this.querySelector('input[name=q]');` +
    `if(el.value.indexOf('site:')!==0)el.value='site:${host} '+el.value;">` +
    input +
    submitButton +
    '</form>'
  );
});
