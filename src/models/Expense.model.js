import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true
    },
    description: {
      type: String,
      required: [true, 'Please provide a description'],
      trim: true
    },
    amount: {
      type: Number,
      required: [true, 'Please provide an amount'],
      min: [0, 'Amount cannot be negative']
    },
    paidBy: {
      type: String,
      required: [true, 'Please specify who paid']
    },
    participants: {
      type: [String],
      required: [true, 'Please specify participants'],
      validate: {
        validator: function(participants) {
          return participants.length > 0;
        },
        message: 'At least one participant is required'
      }
    },
    transactions: {
      type: [String],
      default: []
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
);

const Expense = mongoose.model('Expense', expenseSchema);

export default Expense;