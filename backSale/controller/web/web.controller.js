const webModel = require("../../model/web.model")

const create = async(req,res,next)=>{
    try{
        const readdata = await webModel.create(req.body);
        res.status(200).json({
            connect:false,
            data:readdata
        })
    }catch(error){
       next(error)
    }
}

const getAll =async (req,res,next)=>{
    try{
        const message =await webModel.find();
         res.status(200).json({
             connect:true,
             data:message
            }
        )
    }catch(error){
        next(error)
    }
}



const getById = async (req,res,next)=>{
        try{
            const id = req.params.id;
            const getOneData = await webModel.findById(id)
            res.status(200).json({
                connect:true,
                data:getOneData
            })
        }catch(error){
            next(error)
        }
} 



const updateData = async(req,res,next)=>{
    try{
        const id = req.params.id
        const updateDatas = await webModel.findByIdAndUpdate(id,req.body,{runValidators:true,new:true});
        res.status(200).json({
            connect:true,
            datas:updateDatas
        })

    }catch(error){
        next(error)
    }
}



const remove =async(req,res,next)=>{
    try{
        const id = req.params.id;
         await webModel.findByIdAndDelete(id)
        res.status(200).json({
            connect:true,
            data:"Delete sucessfully."
        })
    }catch(error){
       next(error)
    }
}



module.exports = {getAll,getById,updateData,remove,create}