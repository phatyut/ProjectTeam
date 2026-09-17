const SupplierModel = require("../../model/suppliers");


const createSuppliers = async(req,res)=>{
    try{

    }catch(error){
        res.status(400).json({
            connect
        })
    }
}
const getAll = async(req,res)=>{
    try{
        const readAll = await SupplierModel.find();
        res.status(200).json({
            connect:true,
            data:readAll
        })

    }catch(error){
        console.error(error.message);
    }
}


module.exports ={getAll}