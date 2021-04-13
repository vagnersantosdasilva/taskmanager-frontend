/* eslint-disable react-hooks/rules-of-hooks */
import {AUTH_ENDPOINT, CREDENTIALS_NAME} from '../constants.js';
import axios from "axios";
import { createContext,useEffect,useState } from "react";

export const AuthContext = createContext();

export const useAuth =() =>{
    const [cretendials,setCredentials] = useState({username:null,displayName:null,token:null});
    const [error,setError] = useState(null);
    const [processing,setProcessing] = useState(false);

    useEffect(()=>{
        loadCredentials();
    },[]);
    
    const login = async(username,password)=>{

       const loginInfo = {username:username,password:password};
       setProcessing(true);
       
       try{
            const response = await axios.post(`${AUTH_ENDPOINT}/login`,loginInfo);
            const jwtToken = response.headers[`authorization`].replace("Bearer ","");
            storeCredentials(jwtToken);
            setProcessing(false);
       }catch(error){
            setError("O login não pode der realizado.");
            setProcessing(false);
       }
    }

    const storeCredentials = (token)=>{
        const tokenData = atob(token.split(".")[1]);
        const credentials = {username:tokenData.sub,displayName:tokenData.displayName,token:token};
        sessionStorage.setItem(CREDENTIALS_NAME,JSON.stringify(credentials));
        setCredentials(credentials);
    }

    const logout = ()=>{
        sessionStorage.removeItem(CREDENTIALS_NAME);
        setCredentials({username:null,displayName:null,token:null});
    }

    const isAuthenticated = ()=> {
        return sessionStorage.getItem(CREDENTIALS_NAME)!==null;
    }

    const loadCredentials =() =>{
        const storeCredentials = sessionStorage.getItem(CREDENTIALS_NAME);
        if (setCredentials!==null){
            /*
            const username = storeCredentials.username;
            const displayName = storeCredentials.displayName;
            const token = sotreCredentials.token;
            setCredentials({username:username,displayName:displayName,token:token})*/
            setCredentials(JSON.parse(storeCredentials));
        }
    }

    return {login,logout,isAuthenticated,cretendials,error,processing};
}