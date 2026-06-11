import axios from "axios";

const API_URL = "http://localhost:8080/api/group";

// CREATE GROUP
const createGroup = async (groupData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    `${API_URL}/create`,
    groupData,
    config
  );

  return response.data;
};

// GET ALL GROUPS
const getAllGroups = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(
    `${API_URL}/all`,
    config
  );

  return response.data;
};

// REMOVE GROOUP 

const removeGroup = async(groupId,token)=>{

  const config = {
    headers:{
      Authorization :`Bearer ${token}`
    }
  }
  const response = await axios.delete(
    `${API_URL}/remove/${groupId}`,
    config
  )
  return response.data
}

const groupService = {
  createGroup,
  getAllGroups,
  removeGroup
};

export default groupService;