import config from "../config";
import axios from 'axios';


// const https = require('https');
//
// const agent = new https.Agent({
//     rejectUnauthorized: false,
// });

const instance = axios.create({
    baseURL: config.WS_BASE_URL
});



export const register = async (firstname, lastname, email,password, grade, Emailresponsable) => (
    await instance.post('/employee/', {firstname, lastname, email,password, grade, Emailresponsable})
);
export const updateStateAccountToActive = async (id_e) => (
   // await instance.put('/employee/active/${id_e}')
    await instance.put(`/employee/active/${id_e}`)
)
export const DeleteEmployee = async (id_e) => (
    // await instance.put('/employee/active/${id_e}')
     await instance.delete(`/employee/delete/${id_e}`)
 )
