module.exports = {
    async fe(ctx) {
        // ctx.body = 'hello fe';
        await ctx.render("index", {
            title: "hello fe",
            description: "aaa",
            keywords: "ddd",
        });
    },
    backend(ctx) {
        ctx.body = "hello backend";
    },
    getJSON(ctx) {
        // 如果jsonp 的请求为GET
        if (
            ctx.method === "GET" &&
            ctx.url.split("?")[0] === "/getData.jsonp"
        ) {
            // 获取jsonp的callback
            let callbackName = ctx.query.callback || "callback";
            let returnData = {
                success: true,
                data: {
                    text: "this is a jsonp api",
                    time: new Date().getTime(),
                },
            };

            // jsonp的script字符串
            let jsonpStr = `;${callbackName}(${JSON.stringify(returnData)})`;

            // 用text/javascript，让请求支持跨域获取
            ctx.type = "text/javascript";

            //输出jsonp字符串
            ctx.body = jsonpStr;
        } else {
            ctx.body = "hello jsonp";
        }
    },
};
