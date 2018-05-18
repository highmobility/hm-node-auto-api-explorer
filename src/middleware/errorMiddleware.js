module.exports = (err, req, res, next) => {
    return res.render('pages/error.ejs', { err });
};
