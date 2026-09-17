const ProductModel = require("../../model/Product.model");

// GET ALL
const getAll = async (req, res,next) => {
  try {
    // test and learn no work
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit *1 ||1;
    const skip = (page - 1) * limit ; 

    const searchQuery = {};
    if(req.query.search){
      searchQuery["$or"]=[
        {name:{$regex:req.query.search ,$options:'i'}}
      ]
    }

    const TotalItems = await ProductModel.find(searchQuery).countDocuments()
    const TotalPage = Math.ceil(TotalItems / limit)
    // const products = (await ProductModel.find().skip(skip).limit(limit)).sort({_id:-1}).exec();
    // worked

    const products = (await ProductModel.find().exec());



    res.status(200).json({ connect: true,TotalPage, data: products });
  } catch (error) {
    next(error)
  }
};

// GET ONE
const getOne = async (req, res,next) => {
  try {
    const id = req.params.id;
    const product = await ProductModel.findById(id);
    if(!product){
      res.status(404).json({
        connect :false,
        message :" Product not found!",
      })
    }
    res.status(200).json({ connect: true, data: product });
  } catch (error) {
    next(error)
  }
};

// CREATE with image
const create = async (req, res,next) => {
  try {
    const productData = req.body;
    if (req.file) {
      productData.image = req.file.filename; // save filename in DB
    }
    const newProduct = await ProductModel.create(productData);
    res.status(200).json({ connect: true, data: newProduct });
  } catch (error) {
      next(error)
  }
};

// EDIT with image update
const edit = async (req, res,next) => {
  try {
    const id = req.params.id;
    const updateData = req.body;
    if (req.file) {
      updateData.image = req.file.filename;
    }
    await ProductModel.findByIdAndUpdate(id, updateData, { runValidators: true, new: true });
    res.status(200).json({ connect: true, data: "update successfully" });
  } catch (error) {
    next(error)
  }
};

// DELETE
const remove = async (req, res,next) => {
  try {
    const id = req.params.id;
    await ProductModel.findByIdAndDelete(id);
    res.json({ connect: true, message: "delete successfully" });
  } catch (error) {
    next(error)
  }
};

module.exports = { getAll, getOne, create, edit, remove };
