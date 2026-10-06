const Product=require('../models/Product');
exports.list=async(req,res)=>{try{const q=(req.query.q||'').trim();const filter=q?{$or:[{name:{$regex:q,$options:'i'}},{category:{$regex:q,$options:'i'}}]}:{};res.json(await Product.find(filter).sort({createdAt:-1}))}catch(e){res.status(500).json({message:e.message})}};
exports.get=async(req,res)=>{try{const p=await Product.findById(req.params.id);if(!p)return res.status(404).json({message:'Product not found'});res.json(p)}catch(e){res.status(404).json({message:'Product not found'})}};
