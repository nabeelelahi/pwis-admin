import { BASE_URL } from '@constants'

const http = async (url, options) => {
  try {
    let response 
    
    if(!options) response = await fetch(`${BASE_URL}/${url}`);

    if(options) response = await fetch(`${BASE_URL}/${url}`, options);

    response = await response?.json();

    return response;
    
  } catch (error) {
    console.log(`network request failed ${error}`);
  }
};

export default http