import axios from "axios";

export default axios.create({
    baseURL: "https://jsramverk-editor-macl16.azurewebsites.net",
    //baseURL: "http://localhost:1337",
});
