const path = require('path');

const apply = (app) => {
    app.set('json spaces', 40);

    app.get(path.posix.resolve('/title'), (request, response) =>
        response.json({
            data: 'BILIBILI',
        }),
    );
};

module.exports = { apply };
