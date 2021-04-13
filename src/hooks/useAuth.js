/* eslint-disable react-hooks/rules-of-hooks */
import {AUTH_ENDPOINT, CREDENTIALS_NAME} from '../constants.js';
import axios from "axios";
import { createContext,useEffect,useState } from "react";

export const AuthContext = createContext();

export const useAuth =() =>{
    const [credentials,setCredentials] = useState({username:null,displayName:null,token:null});
    const [error,setError] = useState(null);
    const [processing,setProcessing] = useState(false);

    useEffect(()=>{
        loadCredentials();
    },[]);
    
    const login = async(username,password)=>{

       const loginInfo = {username:username,password:password};
       setProcessing(true);
       
       try{
            const response = await axios.post(`${AUTH_ENDPOINT}`,loginInfo);
            const jwtToken = response.headers[`authorization`].replace("Bearer ","");
            console.log("jwtToken : "+jwtToken);
            storeCredentials(jwtToken);
            setProcessing(false);
       }catch(error){
           console.log(error);
           setError("O login não pode der realizado.");
           setProcessing(false);
       }
    }

    const storeCredentials = (token)=>{
        const tokenData = JSON.parse(atob(token.split(".")[1]));
        const credentials_ = {username:tokenData.sub,displayName:tokenData.displayName,token:token};
        sessionStorage.setItem(CREDENTIALS_NAME,JSON.stringify(credentials_));
        setCredentials(credentials_);
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
        if (credentials!==null){
           setCredentials(JSON.parse(storeCredentials));
        }
    }

    return {login,logout,isAuthenticated,credentials,error,processing};
}