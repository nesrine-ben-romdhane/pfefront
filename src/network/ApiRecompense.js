import config from "../config";
import axios from 'axios';


const instance = axios.create({
    baseURL: config.WS_BASE_URL
});


export const getAllEmployeeRecomponses = async (id_r) => (
    await instance.get(`/rewards/getAllRecomponsesInactive/${id_r}`)
)
export const getAllrewardsvalidate = async (id_r) => (
    await instance.get(`/rewards/rewardsValidate/${id_r}`)
)
export const updaterewardstatus = async (id_r,nom_rsp,prenom_rsp,nomE,PrenomE,nomR,PrenomR,EmailE,EmailR,date_attribuation,nbr_points,id_e,id_e_r) => (
    await instance.put(`/rewards/updaterewardstatus/${id_r}`,{nom_rsp,prenom_rsp,nomE,PrenomE,nomR,PrenomR,EmailE,EmailR,date_attribuation,nbr_points,id_e,id_e_r})
)
export const Deletereward = async (id_r) => (
   
     await instance.delete(`/rewards/delete/${id_r}`)
 )
