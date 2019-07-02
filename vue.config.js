module.exports = {
    devServer:{
        open: true,      //npm run server 项目启动后自动打开浏览器
        host: 'localhost',  // 主机名字  一般本地开发是 localhost
        port: 8080,     // 端口号
        https: false,   
        hotOnly: false, //热更新
        proxy:{             //配置跨域
            'api':{
                target: 'https://ele-interface.herokuapp.com/api/',  //跨域地址
                ws: true,                                             //是否启用websockets

                //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，
                //这样服务端和服务端进行数据的交互就不会有跨域问题   
                changeOrigin: true,    
                pathRewrite:{
                    '^/api': ''
                }
            }
        },
        before: app=>{}
    }
}