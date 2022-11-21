import axios from 'axios';

export const fetch = async (url) => {
  try {
    const response = await axios.get(url)
    return await response.data
  } catch (error) {
    const status = await error
    if (error.response) {
      return { status, message: error.response.data.message }
    } else if (error.request) {
      return error.request;
    } else {
      return { 'Error': error.message };
    }
  }
}
