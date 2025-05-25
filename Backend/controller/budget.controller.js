// import Budget from "../model/budget.model.js";

// export const addBudget = async (req, res) => {
//   try {
//     const { category_name, amount } = req.body;

//     // Validate required fields
//     if (!category_name || amount == null) {
//       return res
//         .status(400)
//         .json({ message: "Category name and amount are required." });
//     }

//     // Check if category already exists
//     const existingCategory = await Budget.findOne({
//       category_name: category_name.trim(),
//     });

//     if (existingCategory) {
//       return res
//         .status(409) // 409 Conflict
//         .json({ message: "Category already exists." });
//     }

//     // Create and save new budget
//     const budget = new Budget({
//       category_name: category_name.trim(),
//       amount,
//       amount_remaining: amount,
//     });

//     const savedBudget = await budget.save();

//     res.status(201).json(savedBudget);
//   } catch (error) {
//     console.error("Error adding budget:", error.message);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// //get all budget
// export const getAllBudgets = async (req, res) => {
//   try {
//     const budgets = await Budget.find().sort({ category_name: 1 }); // optional sorting
//     res.status(200).json(budgets);
//   } catch (error) {
//     console.error("Error fetching budgets:", error.message);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// export const addAmount = async (req, res) => {
//   try {
//     const { category_name, amount } = req.body;

//     if (!category_name || typeof amount !== "number") {
//       return res
//         .status(400)
//         .json({ message: "Category name and valid amount are required" });
//     }

//     const trimmedCategory = category_name.trim();

//     const existingBudget = await Budget.findOne({
//       category_name: trimmedCategory,
//     });

//     if (!existingBudget) {
//       return res.status(404).json({ message: "Budget category not found" });
//     }

//     // Update both amount and amount_remaining
//     existingBudget.amount += amount;
//     existingBudget.amount_remaining += amount;

//     const updatedBudget = await existingBudget.save();

//     return res.status(200).json({
//       message: "Amount added successfully",
//       updatedBudget,
//     });
//   } catch (error) {
//     console.error("Error updating budget:", error);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// };

import Budget from "../model/budget.model.js";

// Add new budget category for the logged-in user
export const addBudget = async (req, res) => {
  try {
    const { category_name, amount } = req.body;
    if (!category_name || amount == null) {
      return res
        .status(400)
        .json({ message: "Category name and amount are required." });
    }

    const existingCategory = await Budget.findOne({
      category_name: category_name.trim(),
      user: req.user._id,
    });

    if (existingCategory) {
      return res.status(409).json({ message: "Category already exists." });
    }

    const budget = new Budget({
      category_name: category_name.trim(),
      amount,
      amount_remaining: amount,
      user: req.user._id,
    });

    const savedBudget = await budget.save();
    res.status(201).json(savedBudget);
  } catch (error) {
    console.error("Error adding budget:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all budgets for the logged-in user
export const getAllBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find({ user: req.user._id }).sort({
      //_id is a MongoDB convention and required field name for the document's unique identifier.
      category_name: 1,
    });
    res.status(200).json(budgets);
  } catch (error) {
    console.error("Error fetching budgets:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Add amount to a budget category
export const addAmount = async (req, res) => {
  try {
    const { category_name, amount } = req.body;
    if (!category_name || typeof amount !== "number") {
      return res
        .status(400)
        .json({ message: "Category name and valid amount are required" });
    }

    const trimmedCategory = category_name.trim();

    const existingBudget = await Budget.findOne({
      category_name: trimmedCategory,
      user: req.user._id,
    });

    if (!existingBudget) {
      return res.status(404).json({ message: "Budget category not found" });
    }

    existingBudget.amount += amount;
    existingBudget.amount_remaining += amount;

    const updatedBudget = await existingBudget.save();
    res
      .status(200)
      .json({ message: "Amount added successfully", updatedBudget });
  } catch (error) {
    console.error("Error updating budget:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
