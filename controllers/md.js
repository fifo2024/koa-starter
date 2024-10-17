/**
 * @file 读取md文档的controller
 * @author packjs@163.com
 */
const marked = require("marked");
const fs = require("node:fs");
const path = require("path");

const readFile = (filePath) => {
    // 指定要读取的本地文件路径
    return new Promise((resolve, reject) => {
        // 通过createReadStream()函数创建可读流并传递文件路径作为参数
        const readStream = fs.createReadStream(filePath, {
            encoding: "utf8",
        });

        // 设置data事件处理程序来获取每次接收到的数据块
        readStream.on("data", (chunk) => {
            console.log(`Received ${chunk.length} bytes of data.`);
            console.log(chunk.toString());
            resolve(chunk.toString());
        });

        // 设置end事件处理程序来在所有数据都被完全读取后进行操作
        readStream.on("end", () => {
            readStream.close();
            console.log("All data has been received and processed.");
        });

        // 设置error事件处理程序来处理任何错误情况
        readStream.on("error", (err) => {
            console.error(`An error occurred while reading the file: ${err}`);
            reject(err);
        });
    });
};

module.exports = {
    async index(ctx) {
        let filePath = path.join(__dirname, "../upload/index.md");
        console.log(filePath);
        let data = await readFile(filePath);
        console.log(26, data);
        // ctx.body = `
        //     <html>
        //         <head>
        //             <title>123456</title>
        //             <link rel="stylesheet" href="/css/md.css">
        //         </head>
        //         <body>
        //         ${marked.parse(data.toString())}
        //         </body>
        //     </html>
        // `;
        await ctx.render("md/index", {
            title: "dddddddd",
            description: "aaa",
            keywords: "ddd",
            container: marked.parse(data.toString()),
        });
    },
};
