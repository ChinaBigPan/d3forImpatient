module.exports = {
    title: "D3速成手册 示例",
    description: "这里存放D3 for impetient书中的示例，以方便各位读者理解",
    configureWebpack: {
        resolve: {}
    },
    base: "/d3forImpatient/",
    themeConfig: {
        repo: "/ChinaBigPan/d3forImpatient",
        repoLabel: "GitHub",
        smoothScroll: true,
        nav: [
            { text: "首页", link: "/" },
            {
                text: "Github",
                link: "https://github.com/ChinaBigPan/d3forImpatient"
            }
        ],
        sidebar: [
            {
                title: "第2章 让我们开始作图吧",
                path: "/routes/chapters/chapter2.html",
                sidebarDepth: 2
            },
            {
                title: "第3章 核心问题：选择与绑定",
                path: "/routes/chapters/chapter3.html",
                sidebarDepth: 2
            },
            {
                title: "第4章 事件、交互和动画",
                path: "/routes/chapters/chapter4.html",
                sidebarDepth: 2
            },
            {
                title: "第5章 生成器、组件、布局",
                path: "/routes/chapters/chapter5.html",
                sidebarDepth: 2
            },
            {
                title: "第7章 补间、比例尺和坐标轴",
                path: "/routes/chapters/chapter7.html",
                sidebarDepth: 2
            },
            {
                title: "第8章 颜色、彩色比例尺和热力图",
                path: "/routes/chapters/chapter8.html",
                sidebarDepth: 2
            },
            {
                title: "第9章 树和网络",
                path: "/routes/chapters/chapter9.html",
                sidebarDepth: 2
            }
        ],
        lasteUpdated: "上次更新",
        repo: ""
    },
    head: [["link", { rel: "icon", href: "/images/favicon.ico" }]]
    // chainWebpack: (config, isServer) => {
    //     console.log("chainWebpack config", config);
    //     console.log("chainWebpack isServer", isServer);
    // }
};
