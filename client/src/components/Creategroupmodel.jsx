import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createGroup } from '../features/group/groupSlice';

const CreateGroupModal = ({ open, onClose, onCreateGroup }) => {
  const [groupName, setGroupName] = useState('');
  const dispatch = useDispatch()

  // Conditional early return wrapper
  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!groupName.trim()) return;

    if (onCreateGroup) {
      onCreateGroup(groupName.trim());
    }
    dispatch(
      createGroup({
        name: groupName,
      })
    );
    setGroupName('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center z-[1000] p-4 font-dm animate-fade-in">

      {/* Modal Card Box */}
      <div className="bg-[#111111] border border-white/[0.08] w-full max-w-[380px] rounded-2xl p-7 relative shadow-2xl">

        {/* Header Section */}
        <h3 className="font-serif-disp text-2xl md:text-3xl text-[#f0ede8] mb-1.5 tracking-tight">
          Setup <em className="text-[#c9a96e] not-italic">New Group</em>
        </h3>

        <p className="text-xs text-[#f0ede8]/45 mb-5 leading-relaxed font-light">
          Initiate separate account ledgers for different events dynamically.
        </p>

        {/* Input Interactive Form Sheet */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="relative">
            <input
              type="text"
              required
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="e.g., Goa Trip, Room Expense"
              className="w-full bg-[#0a0a0a] text-[#f0ede8] border border-white/[0.08] rounded-lg px-3.5 py-2.5 text-sm outline-none placeholder:text-[#f0ede8]/20 focus:border-[#c9a96e]/50 focus:ring-1 focus:ring-[#c9a96e]/20 transition-all duration-200"
            />
          </div>

          {/* Functional Actions Trigger Tray */}
          <div className="flex gap-2.5 mt-1">
            <button
              type="submit"
              className="flex-1 bg-[#c9a96e] hover:bg-[#e8c990] text-[#0a0a0a] text-sm font-medium py-2.5 rounded-lg transition-colors duration-200 cursor-pointer active:scale-[0.99]"
            >
              Create Profile
            </button>

            <button
              type="button"
              onClick={onClose}
              className="bg-transparent text-[#f0ede8]/45 hover:text-[#f0ede8] border border-white/[0.08] hover:border-white/[0.18] px-4 py-2.5 rounded-lg text-sm transition-colors duration-200 cursor-pointer"
            >
              Close
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default CreateGroupModal;