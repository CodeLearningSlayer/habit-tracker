import useFetch from "../../hooks/useFetch";

const useUserAPI = () => {

    const  {fetchNow} = useFetch();
    const baseUrl = "http://localhost:3010/api";
    const headers = new Headers({
        'content-type': 'application/json',
        'authorization': localStorage.getItem('token')})

    const getMe = () => {
        const data = fetchNow(`${baseUrl}/auth/me`, {
            method: "GET",
            headers
        });
        return data;
    }

    return {getMe}
}

export default useUserAPI