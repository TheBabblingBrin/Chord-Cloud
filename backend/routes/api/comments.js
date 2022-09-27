const express = require('express')
const { setTokenCookie, restoreUser, requireAuth} = require('../../utils/auth');

const router = express.Router();

const { Song, User, Album, Comment } = require('../../db/models');

//EDIT a comment based on ID
router.put('/:commentId', requireAuth, async (req, res, next)=>{
  const {body} = req.body
  const comment = await Comment.findByPk(req.params.commentId)
  await comment.update({body})
  res.json(comment)
})

//delete a comment
router.delete('/:commentId', requireAuth, async (req, res, next)=>{
  const comment = await Comment.findByPk(req.params.commentId)
  if(comment){
    await comment.destroy()
    res.json({
      "message": "Successfully deleted",
      "statusCode": 200
  })} else{
    res.statusCode = 404
    res.json({
      "message": "Comment couldn't be found",
      "statusCode": 404
    })
  }
})
module.exports = router;
