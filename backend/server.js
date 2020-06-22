const app = require("./app");

// Could be from env or default to 5000
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
    console.log(`Server started on port ${PORT}`)
);

module.exports = server;
