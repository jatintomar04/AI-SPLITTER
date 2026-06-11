import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllGroups, removeGroup } from "../features/group/groupSlice";
import Searchmodel from "./Searchmodel";
import { FiUserPlus } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";


const GroupSwitcher = ({
  selectedGroupProfile,
  setSelectedGroupProfile,
  setActiveTab,
}) => {

  const [showSearchUserModal, setShowSearchUserModal] = useState(false);

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
              <div className=" flex gap-1.5">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedGroupProfile(group?._id); // current group select
                    setShowSearchUserModal(true);
                  }}
                  className="p-2 rounded-full bg-yellow-500/10 hover:bg-gray-500 text-white transition"
                >
                  <FiUserPlus size={18} />
                </button>
                {user?._id === group?.createdBy && (
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
    </div>
  );
};

export default GroupSwitcher;