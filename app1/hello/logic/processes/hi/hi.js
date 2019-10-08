const async = require('async');
const express = require('express');
const router = express.Router();

function main(req, res) {
    async.waterfall([function hi(cbk) {
        cbk(null, {});
    },
    hi], function(err, result) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(result || 1);
        }
    });
}
function hi(args, cbk) {
    function script(inputs, next) {
        next(null, 'hello world');
    }
    script(args, cbk);
}
module.exports = function(app) {
    router.get('/hi', main);
    return router;
}