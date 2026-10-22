// const express = require("express")
const testModel = require("../../model/test.model")

const All=async(req,res)=>{
    try{
        const data = await testModel.find()
        res.status(200).json({
            connect:true,
            data:data
        })

    }catch(error){
          res.status(404).json({
            connect:false,
            error:error
        })
    }
}
const edit=async(req,res)=>{
    try{
        const id = req.params.id ;
        await testModel.find(id,req.body,{runValidators:true,new:true})
        res.status(200).json({
            connect:true,
            result:"Update successfully."
        })

    }catch(error){
         res.status(404).json({
            connect:false,
            error:error
        })
    }
}
const remove=async(req,res)=>{
    try{
        const id = req.params.id;
        await testModel.findByIdAndDelete(id);
        res.status(200).json({
            connect:true,
            result :'Delete successfully.'
        })

    }catch(error){
        res.status(404).json({
            connect:false,
            error:error
        })
    }
}

const create = async(req,res)=>{
    try{
        const data = await testModel.create(req.body)
        res.status(201).json({
            connect:true,
            data:data
        })

    }catch(error){
        res.status(404).json({
            connect:false,
            error:error
        })
    }
}


module.exports = {All,edit,remove,create}