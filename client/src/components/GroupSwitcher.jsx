import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllGroups, removeGroup } from "../features/group/groupSlice";
import Searchmodel from "./Searchmodel";
import { FiUserPlus, FiTrash2, FiUsers, FiLogOut } from "react-icons/fi";
import { leaveGroup } from "../features/user/userSlice";


const GroupSwitcher = ({
  selectedGroupProfile,
  setSelectedGroupProfile,
  setActiveTab,
}) => {

  const [showSearchUserModal, setShowSearchUserModal] = useState(false);
  const [showMembersModal, setShowMembersModal] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const { groups } = useSelector((state) => state.group)
  const { user } = useSelector((state) => state.auth)


  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllGroups())
  }, [dispatch])


  const handleRemove = async (groupId) => {
    await dispatch(removeGroup(groupId));
    dispatch(getAllGroups());
  };
  const handleLeaveGroup = async (groupId) => {
    await dispatch(leaveGroup(groupId));
    dispatch(getAllGroups());
  };

  return (
    <div className="bg-[#111111] border border-white/10 rounded-2xl p-4">

      {/* TITLE */}
      <h3 className="text-sm uppercase tracking-widest text-white/40 mb-3">
        Active Groups
      </h3>

      {/* GROUP LIST */}
      <div className="flex flex-col gap-2">
        {groups?.map((group) => {
          const isSelected = selectedGroupProfile === group?._id;
const creatorId =
  typeof group?.createdBy === "object"
    ? group?.createdBy?._id
    : group?.createdBy;
          return (
            <div
              key={group?._id}
              className={`flex items-center justify-between rounded-lg px-3 py-3 border transition-all duration-200
      ${isSelected
                  ? "border-[#c9a96e] bg-[#c9a96e]/10"
                  : "border-white/10 hover:border-white/20 hover:bg-white/5"
                }`}
            >
              {/* Group Info */}
              <div
                onClick={() => {
                  setSelectedGroupProfile(group?._id);
                  setActiveTab("group");
                }}
                className="flex-1 cursor-pointer"
              >
                <h4 className="text-sm text-[#f0ede8] font-medium">
                  {group?.name}
                </h4>

                <p className="text-xs text-white/40 mt-0.5">
                  {group.members.length} members
                </p>
              </div>

              {/* Add Member Icon */}
              <div className="flex gap-1.5">

                {/* Members List */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedMembers(group.members);
                    setShowMembersModal(true);
                  }}
                  className="p-2 rounded-full bg-blue-500/20 hover:bg-blue-500 text-white transition"
                >
                  <FiUsers size={18} />
                </button>

                {/* Add Member */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedGroupProfile(group?._id);
                    setShowSearchUserModal(true);
                  }}
                  className="p-2 rounded-full bg-yellow-500/10 hover:bg-gray-500 text-white transition"
                >
                  <FiUserPlus size={18} />
                </button>

                {/* Leave Group */}
                
                {
                user?._id !== creatorId && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLeaveGroup(group?._id);
                    }}
                    className="p-2 rounded-full bg-orange-500/20 hover:bg-orange-500 text-white transition"
                  >
                    <FiLogOut size={18} />
                  </button>
                )}

                {/* Delete Group */}
                {user?._id === creatorId && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemove(group?._id);
                    }}
                    className="p-2 rounded-full bg-red-500/40 hover:bg-red-500 text-white transition"
                  >
                    <FiTrash2 size={18} />
                  </button>
                )}

              </div>
            </div>
          );
        })}
      </div>
      <Searchmodel
        open={showSearchUserModal}
        onClose={() => setShowSearchUserModal(false)}
        selectedGroupProfile={selectedGroupProfile}
      />
      {showMembersModal && (
  <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
    <div className="bg-[#1a1a1a] w-[90%] max-w-md rounded-xl p-5 border border-white/10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-white text-lg font-semibold">
          Group Members
        </h2>

        <button
          onClick={() => setShowMembersModal(false)}
          className="text-gray-400 hover:text-white"
        >
          ✕
        </button>
      </div>

      <div className="space-y-3 max-h-80 overflow-y-auto">
        {selectedMembers?.length > 0 ? (
          selectedMembers.map((member) => (
            <div
              key={member._id}
              className="flex items-center justify-between border border-white/10 rounded-lg p-3"
            >
              <div>
                <p className="text-white font-medium">
                  {member.name}
                </p>

                <p className="text-xs text-gray-400">
                  {member.email || "No Members"}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-center">
            No Members Found
          </p>
        )}
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default GroupSwitcher;