module.exports = {
    defaults: {},
    routes: {
        api: {
            base: "/api/1.0",
            health: "/health",
            required: true
        }
    },
    postConfig: { headers: {"Content-Type": "application/json"} }
}