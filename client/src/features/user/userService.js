import axios from "axios";

const API_URL = "https://ai-splitter-0y72.onrender.com/api/user";

const searchUser = async (query, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(
    `${API_URL}/find/${query}`,
    config
  );

  return response.data;
};

const sendRequest = async (data, token) => {

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    `${API_URL}/invite`,
    data,
    config
  );

  return response.data;
};

const acceptRequest = async (requestId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    `${API_URL}/invite/${requestId}/accept`,
    {},
    config
  );

  return response.data;
};

const rejectRequest = async (requestId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    `${API_URL}/invite/${requestId}/reject`,
    {},
    config
  );

  return response.data;
};

const leaveGroup = async (groupID, token)=>{
 const config = {
  headers:{
    Authorization :`Bearer ${token}`
  }
 }
  const response = await axios.put( `${API_URL}/exit/${groupID}`,{},config)
  return response.data
}

const getInvites = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(
    `${API_URL}/my-invites`,
    config
  );

  return response.data;
};


const friendService = {
  searchUser,
  sendRequest,
  acceptRequest,
  getInvites,
  rejectRequest,
  leaveGroup
};

export default friendService;