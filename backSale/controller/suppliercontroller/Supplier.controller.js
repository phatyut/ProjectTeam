const SuppliersModel =require("../../model/suppliers.model");
const getAll =async (req, res) => {
    try {
        const doc = await SuppliersModel.find();

        if(!doc){
            return res.status(404).json({
                error:"document not Found!"
            })
        }
        
        res.status(200).json({
            connect: true,
            data:doc
        });      
    } catch (error) {
        next(error)
    }
};


const findOne = async (req, res) => {
    try {
        const id = req.params.id;
        const one = await SuppliersModel.findById(id);
        if (!one) {
            return res.status(404).json({
                connect: false,
                error: "This supplier is not found!"
            });
        }

        

        res.status(200).json({
            connect: true,
            data: one
        });

    } catch (error) {

        if (error.name === "CastError") {
            return res.status(400).json({
            connect: false,
            error: "ERROR ID"
            });
            }
            
        res.status(500).json({
            connect: false,
            error: error.message
        });
    }
};



const create = async(req,res)=>{
    console.log(req.body)
    const createSuppliers = await SuppliersModel.create(req.body);
    res.status(201).json({
        connect:true,
        message:createSuppliers
    })
};



const remove = async(req,res)=>{
    try{
        const id = req.params.id;
        const removeSuppliers = await SuppliersModel.findByIdAndDelete(id);
        if(!removeSuppliers){
            return res.status(404).json({
                connect:false,
                message:"This Id not Found!."
            })
        }
        // console.log(removeSuppliers)

        res.status(200).json({
            connect:true,
            data:[{id:id,},"Deleted."]
        })

    }catch(err){
       res.status(404).json({
        connect:false,
        error:err
       })
    }
    const id = req.params.id;
    console.log(id);

}



const update = async(req,res)=>{
    try{
        const id = req.params.id
        const updateSuppliers = await SuppliersModel.findByIdAndUpdate(id,)
        res.status(200).json({
            connect:true,
            data:[]
        })

    }catch(err){
        res.status(404).json({
            connect:false,
            error:err
        })
    }
}
module.exports = { getAll,findOne,create,remove,update };
