// module.exports = {
//     apps: [
//         {
//             name: "Server1",
//             script: "src/app.js",
//             watch: true,
//             env: {
//                 PORT: 8080
//             },
//             node_args: "--expose-gc"
//         },
//         {
//             name: "Server2",
//             script: "src/app.js",
//             watch: true,
//             env: {
//                 PORT: 8081
//             },
//             exec_mode:"cluster",
//             instances:8,
//             node_args: "--harmony --expose-gc"
//         }
//     ]
// }

module.exports = {
    apps: [
        {
            name: "Server1",
            script: "src/app.js",
            watch: true,
            env: {
                PORT: 8080
            },
            args: "-a 2 b 30",
            node_args: "--expose-gc"
        },
        {
            name: "Server2",
            script: "src/app.js",
            watch: true,
            env: {
                PORT: 8081
            },
            args: "-a 2 b 30",
            node_args: "--expose-gc"
        },
        {
            name: "Server3",
            script: "src/app.js",
            watch: true,
            env: {
                PORT: 8082
            },
            exec_mode: "cluster",
            instances: 8,
            args: "-a 2 b 30",
            node_args: "--harmony --expose-gc"
        }
    ]
}