import React, {  useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchUser, sendRequest } from '../features/user/userSlice';
import { toast } from 'react-toastify';

const SearchUserModal = ({  open, onClose, onSearch, onSendRequest,selectedGroupProfile }) => {

  
  const [query, setQuery] = useState('');
 
 const {searchedUser,message} = useSelector((state)=>state.user)


 const dispatch = useDispatch();
  useEffect(() => {
    if (message) {
      toast.success(message);
    }
  }, [message]);

  if (!open) return null;



const handleInputChange = (e) => {
  const value = e.target.value;
  setQuery(value);

  if (!value.trim()) {
    if (onSearch) onSearch("");
    return;
  }

  dispatch(searchUser(value));

  if (onSearch) {
    onSearch(value.trim());
  }
};

  const handleSendRequest = (user_id) => {
  
  dispatch(
    sendRequest({
      groupId: selectedGroupProfile,
      user_id,
    })
  );
};


  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center z-[1000] p-4 font-dm animate-fade-in">
      
      {/* Search Terminal Component Box Container */}
      <div className="bg-[#111111] border border-white/[0.08] w-full max-w-[440px] rounded-2xl p-7 relative shadow-2xl">
        
        {/* Typographic Layout Header */}
        <h3 className="font-serif-disp text-2xl md:text-3xl text-[#f0ede8] mb-1.5 tracking-tight">
          Search <em className="text-[#c9a96e] not-italic">Global Users</em>
        </h3>
        
        <p className="text-xs text-[#f0ede8]/45 mb-5 leading-relaxed font-light">
          Search by name or email parameters to send out cross-group join requests.
        </p>

        {/* Search Field Box Input Wrapper */}
        <div className="relative mb-4">
          <input 
            type="text" 
            value={query}
            onChange={handleInputChange}
            placeholder="Search by name or verified email..." 
            className="w-full bg-[#0a0a0a] text-[#f0ede8] border border-white/[0.08] rounded-lg px-4 py-3 text-sm outline-none placeholder:text-[#f0ede8]/20 focus:border-[#c9a96e]/50 focus:ring-1 focus:ring-[#c9a96e]/20 transition-all duration-200"
          />
        </div>

        {/* Dynamic Database Query Mapping Result Tree View */}
        {searchedUser?.length > 0  ? (
          <div className="flex flex-col gap-2 max-h-[180px] overflow-y-auto mb-5 pr-1 custom-scrollbar">
            {searchedUser.map((user) => (
              <div 
                key={user._id} 
                className="flex items-center justify-between bg-[#171717] px-4 py-3 rounded-xl border border-white/[0.06] group hover:border-white/[0.12] transition-colors duration-150"
              >
                <div>
                  <span className="text-sm font-medium text-[#f0ede8] block tracking-tight">{user.name}</span>
                  <span className="text-xs text-[#f0ede8]/30 font-light font-mono block mt-0.5">{user.email}</span>
                </div>
                
                <button 
                  onClick={() => handleSendRequest(user.user_id)}
                  className="bg-transparent border border-[#c9a96e] hover:bg-[#c9a96e] text-[#c9a96e] hover:text-[#0a0a0a] text-xs font-semibold px-3 py-1.5 rounded-md transition-all duration-200 cursor-pointer active:scale-[0.98]"
                >
                  Send Request
                </button>
              </div>
            ))}
          </div>
        ) : (
          query.trim() && (
            <p className="text-center text-xs text-[#f0ede8]/25 my-6 font-light uppercase tracking-wider">
              No matching records discovered
            </p>
          )
        )}

        {/* Bottom Escape Operations Action Row Container */}
        <div className="flex justify-end pt-1 border-t border-white/[0.06]">
          <button 
            type="button"
            onClick={() => { setQuery(''); onClose(); }}
            className="bg-transparent text-[#f0ede8]/45 hover:text-[#f0ede8] border border-white/[0.08] hover:border-white/[0.18] px-5 py-2 rounded-lg text-sm transition-colors duration-200 cursor-pointer"
          >
            Close Terminal
          </button>
        </div>

      </div>
    </div>
  );
};

export default SearchUserModal;