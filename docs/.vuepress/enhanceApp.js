/**
 * 由于 VuePress 是一个标准的 Vue 应用，你可以通过创建一个 .vuepress/enhanceApp.js 文件来做一些应用级别的配置
 * 当该文件存在的时候，会被导入到应用内部。
 * enhanceApp.js 应该 export default 一个钩子函数，并接受一个包含了一些应用级别属性的对象作为参数。
 * 你可以使用这个钩子来安装一些附加的 Vue 插件、注册全局组件，或者增加额外的路由钩子等：
 */
import { colorConsole } from "./utils/console/colorConsole";

export default ({
    Vue, // VuePress 正在使用的 Vue 构造函数
    options, // 附加到根实例的一些选项
    router, // 当前应用的路由实例
    siteData // 站点元数据
}) => {
    // ...做一些其他的应用级别的优化
    // colorConsole("success", "Vue", Vue);
    colorConsole("primary", "options", options);
    colorConsole("warning", "router", router);
    colorConsole("coral", "siteData", siteData);
};
