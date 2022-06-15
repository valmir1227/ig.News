import axios from "axios";

export const api = axios.create({
    baseURL: "/api" //https://localhost:3000/api
})