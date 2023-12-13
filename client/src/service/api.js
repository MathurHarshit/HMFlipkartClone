import axios from 'axios';
const URL='https://hm-flipkart-clone-backend.vercel.app';
export async function authenticateSignup(data){
    try {
        return await axios.post(`${URL}/signup`,data)
    } catch (error) {
        console.log('Error while calling signup api',error);
        return error.response;
    }
}

export async function authenticateLogin(data){
    try {
        return await axios.post(`${URL}/login`,data)
    } catch (error) {
        console.log('Error while calling login api',error);
        return error.response;
    }
}

export async function payWithCashfreePayments(amount){
    try {
        let response=await axios.post(`${URL}/payment`,amount);
        return response;
    } catch (error) {
        console.log(error);
    }
}




