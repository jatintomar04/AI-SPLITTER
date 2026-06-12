
import { useDispatch, useSelector } from "react-redux";
import { acceptRequest, getInvites, rejectRequest } from "../features/user/userSlice";
import { useEffect } from "react";
import { getAllGroups } from "../features/group/groupSlice";


const RequestPanel = () => {
  const{invites}= useSelector((state)=>state.user)
  console.log(invites)
 
  
  const dispatch = useDispatch()

 useEffect(() => {
    dispatch(getInvites());
  }, [dispatch]);


  if (!invites?.length) {
    return (
      <div className="p-10 text-center text-gray-500">
        No pending requests
      </div>
    );
  }
  
  return (
    <div className="flex flex-col gap-3">
      {invites.map((r) => (
        <div
          key={r._id}
          className="flex justify-between items-center bg-zinc-900 border border-zinc-800 rounded-lg p-4"
        >
          <div>
            <h4 className="text-white">From : {r.user.name}</h4>
            <p className="text-xs text-gray-500">
                  Request for {r.group?.name}  Group.
            </p>
          </div>

          <div className="flex gap-2">
            <button
  onClick={async () => {
    await dispatch(acceptRequest(r._id));
    dispatch(getAllGroups());
    dispatch(getInvites());
  }}
  className="bg-yellow-500 text-black px-3 py-1 rounded text-sm"
>
  Accept
</button>
            <button onClick={()=> {dispatch(rejectRequest(r._id))}}
            className="border border-zinc-700 text-gray-400 px-3 py-1 rounded text-sm">
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RequestPanel;