const router=require('express').Router();router.get('/:userId',async(req,res)=>res.json([]));router.post('/',async(req,res)=>res.json({ok:true}));module.exports=router;
