
import GroupSwitcher from "../components/GroupSwitcher";
import ExpenseForm from "../components/ExpenseForm";
import AiAssistant from "../components/AiAssistant";
import ExpenseList from "../components/ExpenseList";
import RequestPanel from "../components/RequestPanel";
import { useDispatch, useSelector } from "react-redux";
import { getInvites } from "../features/user/userSlice";
import { socket } from "../socket";
import { toast } from "react-toastify";
import { useState } from "react";
import { useEffect } from "react";
import { getExpenses } from "../features/expense/expenseSlice";
// import SearchUserModal from "../components/Searchmodel";

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedGroupProfile, setSelectedGroupProfile] = useState("") ;
  const [editingExpenseId, setEditingExpenseId] = useState(null);
  const [expenseTitle, setExpenseTitle] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseType, setExpenseType] = useState("self");
  const [aiPrompt, setAiPrompt] = useState("");
  const { groups } = useSelector((state) => state.group);
  const {user} = useSelector((state)=> state.auth)
  const { invites } = useSelector((state) => state.user)

const dispatch = useDispatch()

    useEffect(() => {
    if (groups?.length > 0 && !selectedGroupProfile) {
      setSelectedGroupProfile(groups[0]._id);
      setActiveTab("group"); 
    }
  }, [groups, selectedGroupProfile]);

  const activeGroupProfile = groups?.find(
    (g) => g._id === selectedGroupProfile
  );

  // socket io 

 useEffect(() => {
  if (user?._id) {
    socket.emit("register", user._id);
  }
}, [user]);
 
// send request 

useEffect(() => {
  const handleNotification = (data) => {
    toast.info(data.message);
    dispatch(getInvites());
  };

  socket.on("notification", handleNotification);

  return () => {
    socket.off("notification", handleNotification);
  };
}, [dispatch]);

// handle real time  expense change 

useEffect(() => {
  const handleExpenseChange = (data) => {
    console.log("Expense socket received:", data);
    dispatch(getExpenses());
  };

  socket.on("dataUpdated", handleExpenseChange);

  return () => {
    socket.off("dataUpdated", handleExpenseChange);
  };
}, [dispatch]);
 

  return (
    <div className="min-h-screen bg-black text-white flex flex-col mt-16">

      {/* BODY */}
      <main className="flex-1 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6 p-6">

        {/* LEFT SIDE */}
        <div className="lg:col-span-4 flex flex-col gap-5">
 <div className="flex justify-end mb-4">
</div>
          <GroupSwitcher
            mockGroups={groups}
            selectedGroupProfile={selectedGroupProfile}
            setSelectedGroupProfile={setSelectedGroupProfile}
            setActiveTab={setActiveTab}
          />

          <ExpenseForm
            expenseTitle={expenseTitle}
            setExpenseTitle={setExpenseTitle}
            expenseAmount={expenseAmount}
            setExpenseAmount={setExpenseAmount}
            expenseType={expenseType}
            setExpenseType={setExpenseType}
            editingExpenseId={editingExpenseId}
            setEditingExpenseId={setEditingExpenseId}
            activeGroupProfile={activeGroupProfile}
          />

          <AiAssistant
            aiPrompt={aiPrompt}
            setAiPrompt={setAiPrompt}
            activeGroupProfile={activeGroupProfile}
          />
      

        </div>
        

        {/* RIGHT SIDE */}
        <div className="lg:col-span-8 flex flex-col gap-4">

          {/* TABS */}
          <div className="flex gap-6 border-b border-zinc-800 pb-2">
            {[
              { id: "group", label: "Group" },
              { id: "all", label: "All" },
              { id: "self", label: "Self" },
              { id: "requests", label: "Requests" },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`pb-2 text-sm border-b-2 transition ${
                  activeTab === t.id
                    ? "border-yellow-500 text-yellow-400"
                    : "border-transparent text-gray-400"
                }`}
              >
                {t.label}
                   {t.id === "requests" && invites?.length > 0 && (
        <span className="ml-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
          {invites.length}
        </span>
      )}
              </button>
            ))}
          </div>

          {/* CONTENT */}
          {activeTab !== "requests" ? (
            <ExpenseList
              mockGroups={groups}
              activeTab={activeTab}
              selectedGroupProfile={selectedGroupProfile}
              setEditingExpenseId={setEditingExpenseId}
              setExpenseTitle={setExpenseTitle}
              setExpenseAmount={setExpenseAmount}
              setExpenseType={setExpenseType}
            />
          ) : (
            <RequestPanel />
          )}
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;  