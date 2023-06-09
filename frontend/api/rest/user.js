export default class UserAPI {
    constructor(user){
        this.user = user;
        this.baseUrl = "http://localhost:3010/api";
        this.headers = new Headers({
            'content-type': 'application/json',
            'authorization': localStorage.getItem('token')})
    }

    getMe = async () => {
        const res = await fetch("http://localhost:3010/api/auth/me", {
            method: "GET",
            headers: new Headers(
              {'content-type': 'application/json',
              'authorization': localStorage.getItem('token')})
            });
    }
}