import axios from "axios";
import {AUTH_ENDPOINT, JWT_TOKEN_NAME} from '../constants.js';

class AuthService{
    login(username,password,onLogin){
        axios
            .post(`${AUTH_ENDPOINT}/login`,{username:username,password:password})
            .then(response =>{
                const jwtToken = response.headers['authorization'].replace("Bearer ","");
                sessionStorage.setItem(JWT_TOKEN_NAME,jwtToken);
                onLogin(true);
            }).catch(error=>{
                console.error('Um erro ocorreru :'+error);
                onLogin(false);
            });
    }

    getJWTToken(){
        return sessionStorage.getItem(JWT_TOKEN_NAME);
    }

    isAuthenticated(){
        if ((this.getJWTToken()) == null) return false;
        return true;
    }

    logout(){
        sessionStorage.removeItem(JWT_TOKEN_NAME);
    }

}

export default new AuthService();