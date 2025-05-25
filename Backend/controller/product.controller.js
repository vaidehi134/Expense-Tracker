// import Product from "../model/product.model.js";
// import Budget from "../model/budget.model.js";

// export const getProduct = async (req, res) => {
//   try {
//     const product = await Product.find();
//     res.status(200).json(product);
//   } catch (error) {
//     console.log("Error : " + error);
//     res.status(500).json(error);
//   }
// };

// export const getById = async (req, res) => {
//   try {
//     const product = await Product.findOne({ _id: req.params.id });
//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }
//     res.status(200).json(product);
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ message: "Server error", error });
//   }
// };

// export const addProduct = async (req, res) => {
//   const { id, name, price, category_name, description, date } = req.body;

//   try {
//     const budget = await Budget.findOne({ category_name });
//     if (!budget) {
//       return res.status(404).json({ message: "Budget category not found" });
//     }

//     if (budget.amount_remaining < price) {
//       return res
//         .status(400)
//         .json({ message: "Insufficient budget for this category" });
//     }

//     budget.amount_remaining -= price;
//     await budget.save();

//     const createdProduct = new Product({
//       id,
//       name,
//       price,
//       category_name,
//       description,
//       date,
//     });

//     await createdProduct.save();

//     res
//       .status(201)
//       .json({ message: "Product added and budget updated successfully" });
//   } catch (error) {
//     console.error("Error during add product:", error);
//     res.status(500).json({ message: "Server error during add product" });
//   }
// };

// export const editById = async (req, res) => {
//   const product = await Product.findOne({ _id: req.params.id });
//   product.id = req.body.id;
//   product.name = req.body.name;
//   product.image = req.body.image;
//   product.price = req.body.price;
//   product.description = req.body.description;
//   product.date = req.body.date;

//   const ans = await product.save();
//   res.status(200).json(ans);
// };

// export const deleteById = async (req, res) => {
//   const ans = await Product.deleteOne({ _id: req.params.id });
//   // res.status(200).json(ans);
//   res.json({ message: "Deleted Sucessfully" });
// };

// export const deleteAll = async (req, res) => {
//   const ans = await Product.deleteMany({});
//   res.json({ message: "Deleted All sucessfully" });
// };


import Product from "../model/product.model.js";
import Budget from "../model/budget.model.js";

// Get all products for the logged-in user
export const getProduct = async (req, res) => {
  try {
    const product = await Product.find({ user: req.user._id });
    res.status(200).json(product);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get a specific product by ID for the logged-in user
export const getById = async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Add a new product for the logged-in user
export const addProduct = async (req, res) => {
  const { id, name, price, category_name, description, date } = req.body;

  try {
    const budget = await Budget.findOne({ category_name, user: req.user._id });
    if (!budget) {
      return res.status(404).json({ message: "Budget category not found" });
    }

    if (budget.amount_remaining < price) {
      return res
        .status(400)
        .json({ message: "Insufficient budget for this category" });
    }

    budget.amount_remaining -= price;
    await budget.save();

    const createdProduct = new Product({
      id,
      name,
      price,
      category_name,
      description,
      date,
      user: req.user._id,
    });

    await createdProduct.save();
    res
      .status(201)
      .json({ message: "Product added and budget updated successfully" });
  } catch (error) {
    console.error("Error during add product:", error);
    res.status(500).json({ message: "Server error during add product" });
  }
};

// Edit a product by ID for the logged-in user
export const editById = async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!product) return res.status(404).json({ message: "Product not found" });

    product.id = req.body.id;
    product.name = req.body.name;
    product.price = req.body.price;
    product.description = req.body.description;
    product.date = req.body.date;

    const updated = await product.save();
    res.status(200).json(updated);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete product by ID for the logged-in user
export const deleteById = async (req, res) => {
  try {
    const deleted = await Product.deleteOne({
      _id: req.params.id,
      user: req.user._id,
    });
    res.json({ message: "Deleted Successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete all products of the logged-in user
export const deleteAll = async (req, res) => {
  try {
    await Product.deleteMany({ user: req.user._id });
    res.json({ message: "Deleted All Successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
