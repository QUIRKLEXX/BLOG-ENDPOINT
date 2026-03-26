const router = require('express').Router()
const {
    createablog,
     getallblog,
      updateablog,
       deleteablog,
       getasingleblog,
       getsinglewithoutuser,
       getallwithoutuser
} = require('../controllers/blog');

router.route('/').post(createablog).get(getallblog).get(getallwithoutuser)
router.route('/:blogId').patch(updateablog).get(getasingleblog).delete(deleteablog).get(getsinglewithoutuser)



module.exports = router