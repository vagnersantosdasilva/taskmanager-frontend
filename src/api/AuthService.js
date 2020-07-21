class AuthService{
    login(username,password){
        console.log(`Login: username = ${username}; password = ${password}`);
    }
}

export default new AuthService();