import axios from "axios";

export default axios.create({
    //baseURL: "https://ec2-13-49-159-25.eu-north-1.compute.amazonaws.com/api",
    baseURL: "http://localhost:1337/api",
});
