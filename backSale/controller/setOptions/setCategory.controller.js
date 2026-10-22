
// ============ controller/BatchController/BatchController.js ============
const SetCategory = require("../../model/SetOptionModel/setCategory.model");

const create = async (req, res) => {
  try {
    const name = (req.body.name || "").trim();
    if (!name) return res.json({ 
            connect: false, 
            message: "Name is required" 
          });
    const data = await SetCategory.create({ name });
    res.json({ 
              connect: true, 
              message: "Added successfully", 
              data:data
             });


  } catch (err) {
    if (err.code === 11000) {
      return res.json({ connect: false, message: "This name already exists" });
    }
    res.status(500).json({ connect: false, message: err.message });
  }
};

// 

const getAll = async (req, res) => {
  try {
    const data = await SetCategory.find().sort({ createdAt: -1 });
    res.json({ connect: true, data });
  } catch (err) {
    res.status(500).json({ connect: false, message: err.message });
  }
};

 const update = async (req, res) => {
  try {
    const name = (req.body.name || "").trim();
    if (!name) return res.json({ connect: false, message: "Name is required" });

    const data = await SetCategory.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true, runValidators: true }
    );
    if (!data) return res.json({ connect: false, message: "Not found" });
    res.json({ connect: true, message: "Updated successfully", data });
  } catch (err) {
    if (err.code === 11000) {
      return res.json({ connect: false, message: "This name already exists" });
    }
    res.status(500).json({ connect: false, message: err.message });
  }
};

const remove = async (req, res) => {
  try {
    await SetCategory.findByIdAndDelete(req.params.id);
    res.json({ connect: true, message: "Deleted" });
  } catch (err) {
    res.status(500).json({ connect: false, message: err.message });
  }
};

module.exports ={getAll,update,remove,create}

