let express = require('express');
let router = express.Router();

/* GET users listing. */
router.get('/markdown', function (req, res, next) {
    res.redirect('/tools/markdown.html');
});
module.exports = router;
