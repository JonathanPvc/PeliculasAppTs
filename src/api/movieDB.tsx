import axios from "axios";

const movieDB = axios.create({
    baseURL: "https://api.themoviedb.org/3/movie",
    params: {
        api_key: "926d46aeee903410524a22cf8072abbf",
        language: "es-ES"
    }
});

export default movieDB;