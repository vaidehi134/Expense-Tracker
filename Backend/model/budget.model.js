// import mongoose from "mongoose";
// const budgetSchema = mongoose.Schema({
//   category_name: {
//     type: String,
//     required: true,
//   },
//   amount: {
//     type: Number,
//     required: true,
//   },
//   amount_remaining: {
//     type: Number,
//     required: true,
//   },
// });

// const Budget = mongoose.model("Budget", budgetSchema);
// export default Budget

import mongoose from "mongoose";

const budgetSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  category_name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  amount_remaining: {
    type: Number,
    required: true,
  },
});

const Budget = mongoose.model("Budget", budgetSchema);
export default Budget;
