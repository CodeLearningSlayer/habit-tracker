import useFetch from "../../hooks/useFetch";

const useUserAPI = () => {
    const { fetchNow } = useFetch();
    const baseUrl = "http://localhost:3010/api";
    const headers = new Headers({
        'content-type': 'application/json',
        'authorization': localStorage.getItem('token')})
    
    const getMe = () => {
        console.log("получаю пользователя");
        const data = fetchNow(`${baseUrl}/auth/me`, {
            method: "GET",
            headers
        });
        console.log(data);
        return data;
    }

    const registerUser = (data) => {
        const result = fetchNow(`${baseUrl}/auth/register`, {
            method: "POST",
            headers: {
                "Content-type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(data),
    });
        return result;
    }

    const loginUser = async (data) => {
        const userObj = {
            username: data.login,
            password: data.password
        };
        const result = await fetchNow(`${baseUrl}/auth/login`, {
            method: "POST",
            headers: {
                'Content-type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(userObj)
        })
        if (result.token){
            localStorage.setItem('token', result.token);
            return result.user
        }
    }

    return {getMe, registerUser, loginUser}
}

export default useUserAPI