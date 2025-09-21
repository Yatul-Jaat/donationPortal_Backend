import Donner from "../model/donner.model.js";


// for admin to check pending donner
const pendingDonner = async (req, res) => {
  try {
    const pendingList = await Donner.find({ state: "pending" })
    if (!pendingList) {
      return res.status(404).json({ message: "No pending donner found" });
    } else {
      
      return res.status(200).json(pendingList);
     // const User = await User.findById(pendingList.userId);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// admin to check approved donner
const approvedDonner = async (req, res) => {
  try {
    const approvedList = await Donner.find({ state: "approved" })
    if (!approvedList) {
      return res.status(404).json({ message: "No approved donner found" });
    } else {
      
     
     return res.status(200).json(approvedList);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//admin to get all donner
const getAllDonner = async (req, res) => {
  try {
    const donnerList = await Donner.find();
    if (!donnerList) {
      return res.status(404).json({ message: "No donner found" });
    } else {
      return res.status(200).json(donnerList);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// for donner to get his/her request list by id
const getDonnerById = async (req, res) => {
  try {
    const { id } = req.body;
    const products = await Donner.find({ userId: id });
    if (!products) {
      return res.status(404).json({ message: "Donner not found" });
    } else {
      return res.status(200).json(products);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get a particular product request by product id--------------on clicking the product from the list
const getRequestsByUserId = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ message: "User id is required" });
    }
    const product = await Donner.findById(id);
    if (!product) {
      return res.status(404).json({ message: "No product found" });
    }
    return res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// file, form_data
const addDonnerProduct = async (req, res) => {
  const { userId, name, description, location, quantity } = req.body;
  if (!userId || !name || !description || !location || !quantity) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const donner = new Donner({
      userId:userId,
      name: name,
      description:description,
      state: "pending",
      location: location,
      quantity: quantity,
      leftQuantity: quantity
    });
    
    await donner.save();
    res.status(201).json({ message: "Product added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const deleteDonnerProduct = async (req, res) => {
    const {proudctId}=req.body;
    try {
        const product=await Donner.findById(proudctId);
        if(!product){
            return res.status(404).json({message:"Product not found"});
        }
        product.state="deleted";
        await product.save();
        res.status(200).json({message:"Product deleted successfully"});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateDonnerProduct = async (req, res) => {
    const {proudctId}=req.body;
    try {
        const product=await Donner.findById(proudctId);
        if(!product){
            return res.status(404).json({message:"Product not found..."});
        }
        product.state="approved";
        await product.save();
        res.status(200).json({message:"Product approved successfully..."});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


export {
  pendingDonner,
  approvedDonner,
  getAllDonner,
  getDonnerById,
  getRequestsByUserId,
  addDonnerProduct,
  deleteDonnerProduct,
  updateDonnerProduct
};

