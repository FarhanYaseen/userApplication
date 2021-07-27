import axios from 'axios';
const config = {
  baseURL: `http://localhost:8080/`,
  headers: {
    'Content-Type': 'application/json',
  },
};

export async function registerUser(requestData) {
  const loginConfig = {
    ...config,
    url: 'app/signup',
    method: 'post',
    data: requestData,
  }
  return await makeRequest(loginConfig);
};

export async function loginUser(requestData) {
  const loginConfig = {
    ...config,
    url: 'app/signin',
    method: 'post',
    data: requestData,
  }
  return await makeRequest(loginConfig);
};

export async function updateUser(requestData, id, token) {
  const editUserConfig = {
    ...config,
    url: `app/users/${id}`,
    method: 'put',
    data: requestData,
  }
  editUserConfig.headers["x-access-token"] = token;
  return await makeRequest(editUserConfig);
}

export async function getUserByID(id, token) {
  const getUserConfig = {
    ...config,
    url: `app/users/${id}`,
    method: 'get',
  }
  getUserConfig.headers["x-access-token"] = token;
  return await makeRequest(getUserConfig);
}

export async function deleteUser(id, token) {

  const deleteUserConfig = {
    ...config,
    method: 'delete',
    url: `app/users/${id}`,
  }
  deleteUserConfig.headers["x-access-token"] = token;
  return await makeRequest(deleteUserConfig);
}

export async function getUsers(token) {
  const getUserConfig = {
    ...config,
    url: `app/users`,
    method: 'get',
  }
  getUserConfig.headers["x-access-token"] = token;
  return await makeRequest(getUserConfig);
}

const makeRequest = async (axiosConfig) => {
  try {
    const { data } = await axios(axiosConfig);
    return { data };
  }
  catch (error) {
    return { error };
  }
}