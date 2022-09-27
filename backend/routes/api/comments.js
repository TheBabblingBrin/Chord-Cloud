const express = require('express')
const { setTokenCookie, restoreUser, requireAuth, isOwner} = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { check } = require('express-validator');

const validateComment = [
  check('body')
  .exists({ checkFalsy: true })
  .notEmpty()
  .withMessage("Comment body text is required"),
handleValidationErrors
]
const router = express.Router();

const { Song, User, Album, Comment } = require('../../db/models');

//EDIT a comment based on ID
router.put('/:commentId', validateComment, requireAuth, async (req, res, next)=>{
  const {body} = req.body
  const comment = await Comment.findByPk(req.params.commentId)
  if(!comment){
    res.statusCode = 404
    res.json({
      "message": "Comment couldn't be found",
      "statusCode": 404
    })
  }
  const userId = req.user.id
  if(isOwner(res, userId, comment.userId)){
    return
  }
  await comment.update({body})
  res.json(comment)
})

//delete a comment
router.delete('/:commentId', requireAuth, async (req, res, next)=>{
  const comment = await Comment.findByPk(req.params.commentId)



  if(comment){
      const userId = req.user.id
      if(isOwner(res, userId, comment.userId)){
        return
      }
    await comment.destroy()
    res.json({
      "message": "Successfully deleted",
      "statusCode": 200
  })} else{

      const userId = req.user.id
  if(isOwner(res, userId, comment.userId)){
    return
  }
    res.statusCode = 404
    res.json({
      "message": "Comment couldn't be found",
      "statusCode": 404
    })
  }
})
module.exports = router;
