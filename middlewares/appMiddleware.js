module.exports.logger = function(req,res,next) {
    console.log(`${req.method} ${req.url}`)
    next();
}


module.exports.notFoundError = function(req,res,next) {
    res.render('404', {
        title:'Page Not Found',
        layout: 'layout'
    })
}

module.exports.handleError = function(err,req,res,next) {
    console.log(err);
    res.render('500', {
        title:'Something Went Wrong',
        layout: 'layout'
    })
}