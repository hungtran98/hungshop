import axios from "axios";
const BASE_URL = 'http://localhost:5000/'
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMzEyYWZkYzQxNGUxNTE0YTU5YjIwNiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY2NDY3NzgzNSwiZXhwIjoxNjY0NzY0MjM1fQ.Awhr-dniQHEhzdvND0iDz_-u1a0DgxEeUhNemo408Cw"


export const publicRequest = axios.create({
    baseURL: BASE_URL,

})

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: {token: `Bearer ${TOKEN}`},
})