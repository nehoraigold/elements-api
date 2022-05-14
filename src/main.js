const { app } = require("./app");

const main = () => {

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Listening on port ${port}...`);
    });
};

main();