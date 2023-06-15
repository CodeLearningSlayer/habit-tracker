import {useState, useCallback} from "react";

const useFetch = () => {
    const [process, setProcess] = useState("waiting");
    const fetchNow = useCallback(async (url, options) => {
        setProcess("loading");
        try {
            const res = await fetch(url, options);
            if (!res.ok) {
                throw new Error(`couldn't fetch ${url}, status: ${res.status}`);
            }
            const data = await res.json();
            return data;
        } catch(e) {
            console.log(e);
            setProcess("error");
        }
        
    }, [])

    return {process, setProcess, fetchNow}
}

export default useFetch;