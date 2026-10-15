const setOption = require("../../model/setOption.model");
const getAll = async(req,res)=>{
    try {
        const setOptions =await setOption.find()
        res.status(200).json({
            connect:true,
            data:setOptions
        })
        
    } catch (error) {
        console.log(error);
    }
}


const getOne =async(req,res)=>{
    try {
        res.status(200).json({
            connect:true,
            data:[]
        }) 
        
    } catch (error) {
        console.log(error)
    }
}
const create =async(req,res)=>{
    try {
        const setOptoins = await setOption.create(req.body)
        res.status(200).json({
            connect:true,
            data:setOptoins
        }) 
        
    } catch (error) {
        console.log(error)
    }
}


const edit = async(req,res)=>{
     try {
        res.status(200).json({
            connect:true,
            data:[]
        }) 
        
    } catch (error) {
        console.log(error)
    }
}
const remove = async(req,res)=>{
     try {
        res.status(200).json({
            connect:true,
            data:[]
        }) 
        
    } catch (error) {
        console.log(error)
    }
}


module.exports ={getAll,getOne,create,remove,edit}