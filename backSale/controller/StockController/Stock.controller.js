const Stock = require("../../model/Stocks.model");
const getAll =(req,res)=>{
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
const getById =(req,res)=>{
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
const create =(req,res)=>{
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
const edit =(req,res)=>{
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