import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addExpense, getExpenses, updateExpense } from "../features/expense/expenseSlice";

const ExpenseForm = ({
  editingExpenseId,
  setEditingExpenseId,
  expenseTitle,
  expenseAmount,
  expenseType,
  activeGroupProfile,
}) => {
 

  const [form, setForm] = useState({
    title : "",
    amount : "",
    type : "self"
  })

  const dispatch = useDispatch();
  useEffect(() => {
    setForm({
      title: expenseTitle || "",
      amount: expenseAmount || "",
      type: expenseType || "self",
    });
  }, [expenseTitle, expenseAmount, expenseType]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const expenseData = {
      title: form.title,
      amount: Number(form.amount),
      type: form.type,
    };

    if (form.type === "group") {
      expenseData.groupId = activeGroupProfile?._id;
    }

    if (editingExpenseId) {
      console.log(editingExpenseId)
      await dispatch(
        updateExpense({
          expenseId: editingExpenseId,
          expenseData,
        })
        
      );
      await dispatch(getExpenses())
    } else {
      await dispatch(addExpense(expenseData));
      await dispatch(getExpenses())
    }

    setForm({
      title: "",
      amount: "",
      type: "self",
    });

    setEditingExpenseId(null);
  };


  return (
    <div className="bg-[#111111] border border-white/10 rounded-2xl p-5">

      <h3 className="text-xl text-[#f0ede8] font-serif mb-4">
        {editingExpenseId ? "Edit Expense" : "Add Expense"}
      </h3>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">

        {/* TITLE */}
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Expense Title"
          className="w-full bg-[#0a0a0a] text-white border border-white/10 rounded-lg px-3 py-2"
        />

        {/* AMOUNT */}
        <input
          type="number"
          name="amount"
          value={form.amount}
          onChange={handleChange}
          placeholder="Amount"
          className="w-full bg-[#0a0a0a] text-white border border-white/10 rounded-lg px-3 py-2"
        />

        {/* TYPE */}
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="w-full bg-[#0a0a0a] text-white border border-white/10 rounded-lg px-3 py-2"
        >
          <option value="group">
            Group Expense ({activeGroupProfile?.name})
          </option>

          <option value="self">
            Self Expense
          </option>
        </select>

        <button
          type="submit"
          className="bg-[#c9a96e] hover:bg-[#e8c990] text-black py-2 rounded-lg"
        >
          {editingExpenseId ? "Update Expense" : "Add Expense"}
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;