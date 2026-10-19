const Stock = require("../../model/Stocks.model");
const getAll =async(req,res)=>{
    try {
        const doc = await Stock.find();
        res.status(200).json({
            connect:true,
            data:doc
        })
        
    } catch (error) {
        res.status(404).json({
            connect:false,
            error:error
        })
    }
}
const getById = async(req,res)=>{
    try {
        const doc = await Stock.findById(req.params.id);
        res.status(200).json({
            connect:true,
            data:doc
        })
        
    } catch (error) {
        res.status(404).json({
            connect:false,
            error:error
        })
    }
}
const create =async(req,res)=>{
    try {
        const doc = await Stock.create(req.body)
        res.status(200).json({
            connect:true,
            data:doc
        })
        
    } catch (error) {
        res.status(404).json({
            connect:false,
            error:error
        })
    }
}
const edit =async(req,res)=>{
    try {
        const id = req.params.id;
        const updateData = req.body;
        if(req.file){
            updateData.image = req.file.filename
        }
      await Stock.findByIdAndUpdate(id,updateData,{runValidators:true,new:true})
        res.status(200).json({
            connect:true,
            data:"Update successfully."
        })
        
    } catch (error) {
        res.status(404).json({
            connect:false,
            error:error
        })
    }
}
const remove =(req,res)=>{
    try {
        res.status(200).json({
            connect:true,
            data:[]
        })
        
    } catch (error) {
        res.status(404).json({
            connect:false,
            error:error
        })
    }
}


module.exports={getAll,getById,create,remove,edit}