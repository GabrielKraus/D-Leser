module.exports = {
    apps: [
        {
            name: "Server1",
            script: "src/app.js",
            watch: true,
            env: {
                PORT: 8080
            }
        }
    ]
}