import axios from "axios";

const API_URL = `https://ai-splitter-0y72.onrender.com/api/ai`;

// SELF AI CHAT
const selfChat = async (prompt, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    `${API_URL}/chat`,
    { prompt },
    config
  );

  return response.data;
};

// GROUP AI CHAT
const groupChat = async (data, token) => {
 console.log(data)
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    `${API_URL}/chat/group`,
    {
      message: data.message,
      groupId: data.groupId,
    },
    config
  );

  return response.data;
};

const aiService = {
  selfChat,
  groupChat,
};

export default aiService;