import axios from 'axios';
export const ScriptPost=async(data)=>
{
    try {
        const response = await  axios.post(`http://127.0.0.1:8002/api/scripts/`,data);
        return response;
      }
      catch (err) {
        // Handle error
        console.log(err);
        return err;
    }
}