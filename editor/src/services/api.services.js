import http from '../http-common';
import authHeader from "@/services/auth-header";

export default class APIService {
    static createNew(formData) {
        return http.post('/create', formData, {headers: authHeader()});
    }

    static updateDocument(formData, id) {
        return http.put(`/update/${id}`, formData, {headers: authHeader()});
    }

    static async getAllDocuments(user) {
        const neededHeaders = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        };

        let response = await fetch('http://localhost:1337/graphql', {
            method: 'POST',
            headers: neededHeaders,
            body: JSON.stringify({ query: `{documents(userId: "${user}") {name,content}}`})
        });

        return await response.json();

        //return http.get(`/all/${user}`, {headers: authHeader()});
    }

    static getSpecificFile(id) {
        return http.get(`/get/${id}`, {headers: authHeader()});
    }
}