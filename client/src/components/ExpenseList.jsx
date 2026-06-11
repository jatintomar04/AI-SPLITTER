import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteExpense, getExpenses } from "../features/expense/expenseSlice";
import Loading from "./Loading";
import { toast } from "react-toastify";

const ExpenseList = ({
  mockGroups,
  activeTab,
  selectedGroupProfile,
  setEditingExpenseId,
  setExpenseTitle,
  setExpenseAmount,
  setExpenseType,
}) => {



  const dispatch = useDispatch()

  const { expenses, isLoading,message, isError } = useSelector(
    (state) => state.expense
  );

  useEffect(() => {
    dispatch(getExpenses())
  }, [dispatch])

  useEffect(() => {
    if(message && isError){
      toast.error(message)
    }
  }, [isError,message]);

  if (isLoading) {
    return (
      <Loading />
    );
  }

  const expenseList = expenses?.expenses || [];
  const targetExpenses = expenseList.filter((item) => {

    if (activeTab === "group") {
      return (
        item.type === "group" &&
        item.group?._id?.toString() ===
        selectedGroupProfile?.toString()
      );
    }

    if (activeTab === "self") {
      return item.type === "self";
    }

    return true;
  });

  if (!selectedGroupProfile && activeTab === "group") {
    return (
      <div className="p-10 text-center text-white/40 text-sm border border-dashed border-white/10 rounded-xl">
        Please select group
      </div>
    );
  }

  if (targetExpenses.length === 0) {
    return (
      <div className="p-10 text-center text-white/40 text-sm border border-dashed border-white/10 rounded-xl">
        No transactions found for this selection.
      </div>
    );
  }

  const handlDelete = async (id)=>{

    await dispatch(deleteExpense(id))
    await dispatch(getExpenses())
  }
   
    

  return (
    <div className="flex flex-col gap-2">

      {targetExpenses.map((expense) => {
        const associatedGroup = mockGroups.find(
          (g) => g._id === expense.group
        );

        return (
          <div
            key={expense._id}
            className="flex items-center justify-between bg-[#111111] border border-white/10 rounded-xl px-4 py-3 hover:bg-[#151515] transition"
          >

            {/* LEFT SIDE */}
            <div className="flex items-center gap-3">

              {/* DOT */}
              <div
                className={`w-2 h-2 rounded-full ${expense.type === "group"
                  ? "bg-[#c9a96e]"
                  : "bg-white/30"
                  }`}
              />

              {/* TEXT */}
              <div>
                {activeTab === "group" && (
                  <h4 className="text-sm text-[#f0ede8] font-medium">
                    Paid by: {expense.user}
                  </h4>
                )}

                <h3 className="text-sm text-[#f0ede8] font-medium">
                  For : {expense.title}
                </h3>

                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-white/40">
                    {new Date(expense.createdAt).toLocaleString("en-IN")}
                  </span>

                  {expense.type === "group" && associatedGroup && (
                    <span className="text-[10px] uppercase text-[#c9a96e] bg-[#c9a96e]/10 border border-[#c9a96e]/20 px-2 py-[1px] rounded">
                      {associatedGroup.name}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="flex items-center gap-5">

              {/* AMOUNT */}
              <span className="text-lg font-serif text-[#f0ede8]">
                ₹{expense.amount.toLocaleString()}
              </span>

              {/* ACTIONS */}
              <div className="flex items-center gap-2 text-xs">

                <button
                  onClick={() => {
                    setEditingExpenseId(expense._id);
                    setExpenseTitle(expense.title);
                    setExpenseAmount(expense.amount);
                    setExpenseType(expense.type);
                  }}
                  className="text-white/40 hover:text-white transition"
                >
                  Edit
                </button>

                <span className="text-white/10">|</span>

                <button   onClick={() => handlDelete(expense._id)} className="text-red-400 hover:text-red-300 transition">
                  Del
                </button>
              </div>

            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ExpenseList;