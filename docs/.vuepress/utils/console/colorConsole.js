/**
 * 彩色的控制台，方便调试
 *
 * @param [String | ColorCode] desc 状态描述
 * @param [String ] hint 提示信息
 * @content [params ] ...content 控制台显示的参数
 */
export function colorConsole(desc, hint, content) {
    // if (process.env.NODE_ENV === "production") return;
    const defaultColor = {
        primary: "#1890ff",
        success: "#52c41a",
        warning: "#faad14",
        error: "#f5222d",
        coral: "#FF7F50",
        fuchsia: "#FF00FF",
        seagreen: "#2E8B57",
        darkblue: "#00008B",
        red: "red",
        blue: "blue",
        green: "green"
    };
    const isDefaultColor = Object.keys(defaultColor).indexOf(desc) >= 0;
    if (!isDefaultColor) {
        defaultColor[desc] = desc;
    }
    console.log(
        `%c ${hint} `,
        `background: ${defaultColor[desc]}; color: white; border-radius: 2px;`,
        content
    );
}
