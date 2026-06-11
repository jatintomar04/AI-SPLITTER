import React from "react";
import { groupChat, selfChat } from "../features/ai/ai.Slice";
import { useDispatch, useSelector } from "react-redux";

const AiAssistant = ({
  aiPrompt,
  setAiPrompt,
  activeGroupProfile,
}) => {
  const dispatch = useDispatch();

  const {
    response,
    isLoading,
    error,
  } = useSelector((state) => state.ai);

 

  const handleSelfAnalysis = () => {
    if (!aiPrompt.trim()) return;

    dispatch(
      selfChat({
         message : aiPrompt,
      })
    );
  };

  const handleGroupAnalysis = () => {
    if (!aiPrompt.trim()) return;

    if (!activeGroupProfile?._id) {
      alert("Please select a group first");
      return;
    }

    dispatch(
      groupChat({
        message: aiPrompt,
        groupId: activeGroupProfile._id,
      })
    );
  };

  return (
    <div className="bg-[#111111] border border-white/10 rounded-2xl p-5 flex flex-col gap-3">

      {/* TITLE */}
      <h3 className="text-xl text-[#f0ede8] font-serif">
        Ask <em className="text-[#c9a96e]">AI Engine</em>
      </h3>
 {/* RESPONSE */}
      {response && !isLoading && (
        <div className="mt-2 p-4 rounded-lg bg-[#0a0a0a] border border-white/10">
          <h4 className="text-[#c9a96e] font-medium mb-2">
            AI Analysis
          </h4>
<div className="text-sm text-white/80 whitespace-pre-line leading-relaxed">

  {response.reply}
</div>
        </div>
      )}
      {/* INPUT */}
      <textarea
        value={aiPrompt}
        onChange={(e) => setAiPrompt(e.target.value)}
        placeholder={`Ask anything: 'What is the sum total of ${
          activeGroupProfile?.name || "this group"
        } entries?'`}
        className="w-full min-h-[90px] bg-[#0a0a0a] text-[#f0ede8] border border-white/10 rounded-lg p-3 text-sm outline-none resize-none"
      />

      {/* BUTTONS */}
      <div className="flex gap-2">
        <button
          onClick={handleSelfAnalysis}
          disabled={isLoading}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm disabled:opacity-50"
        >
          Analyze Self Expenses
        </button>

        <button
          onClick={handleGroupAnalysis}
          disabled={isLoading}
          className="flex-1 bg-[#c9a96e] hover:bg-[#e8c990] text-black py-2 rounded-lg text-sm font-medium disabled:opacity-50"
        >
          Analyze Group Expenses
        </button>
      </div>

      {/* LOADING */}
      {isLoading && (
        <div className="mt-2 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
          <p className="text-yellow-400 text-sm">
            AI is analyzing your expenses...
          </p>
        </div>
      )}

      {/* ERROR */}
      {error && (
        <div className="mt-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
          <p className="text-red-400 text-sm">
            {error}
          </p>
        </div>
      )}

     

    </div>
  );
};

export default AiAssistant;