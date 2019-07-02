function error(res, msg) {
    return res.status(500).send({
        error: msg
    });
}

function notFound(res, msg) {
    return res.status(404).send({
        message: msg
    });
}

function success(res, data) {
    return res.status(200).send(data);
}

module.exports = {
    error,
    notFound,
    success
};