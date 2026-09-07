const webModel = require("../../model/web.model")

const create = async(req,res)=>{
    try{
        const createData = await webModel.create(req.body);
        res.status(200).json({
            connect:false,
            datas:"create successfully."
        })
    }catch(error){
        res.status(400).json({
            connect:false,
            error:error.message
        })
    }
}

const getAll =async (req,res)=>{
    try{
        const getAllDatas =await webModel.find();
         res.status(200).json({
            connect:true,
            message:'getall data success'
        })
    }catch(error){
        console.log(error.message)
    }
}



const getById = async (req,res)=>{
        try{
            const id = req.params.id;
            const getOneData = await webModel.findById(id)
            res.status(200).json({
                connect:true,
                data:[]
            })
        }catch(error){
            res.status(400).json({
                connect:false,
                error:error.message
            })
        }
} 



const updateData = async(req,res)=>{
    try{
        const id = req.params.id
        const updateDatas = await webModel.findByIdAndUpdate(id,req.body,{runValidators:true,new:true});
        res.status(200).json({
            connect:true,
            datas:[]
        })

    }catch(error){
        res.status(400).json({
            connect:false,
            error:error.message
        })
    }
}



const remove =async(req,res)=>{
    try{
        const id = req.params.id;
         await webModel.findByIdAndDelete(id)
        res.status(200).json({
            connect:true,
            data:"Delete sucessfully."
        })
    }catch(error){
        res.status(400).json({
            connect:false,
            error:error.message
        })
    }
}



module.exports = {getAll,getById,updateData,remove}