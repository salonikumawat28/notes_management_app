const BACKEND_URL = process.env.NODE_ENV === "dev" ? "http://localhost:9000/": "https://notes-management-app-server-d246095aa0a9.herokuapp.com/";

const config = {
    BACKEND_URL,
};

export default config;