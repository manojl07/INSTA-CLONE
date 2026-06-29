import API from './axios'

/* --------------------------
   GET USER PROFILE
---------------------------*/

export const getUserProfile = aync (userId) => {
  const {data} = await API.get(`/users/${userId}`);

  return data;
}

/* --------------------------
   FOLLOW / UNFOLLOW
---------------------------*/

export const toggleFollow = async (userId) => {
  const {data} = await API.patch(`/users/${userId}/follow`)

  return data;
}

/* --------------------------
   SEARCH USERS
---------------------------*/

export const searchUsers = async (querry) => {
  const {data} = await API.get(`/users/search?q=${query}`)

  return data;
}