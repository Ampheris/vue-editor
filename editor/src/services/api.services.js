import http from '../http-common';
import authHeader from "@/services/auth-header";


export default class APIService {
    static createNew(formData) {
        return http.post('/api/create', formData, {headers: authHeader()});
    }

    static updateDocument(formData, id) {
        return http.put(`/api/update/${id}`, formData, {headers: authHeader()});
    }

    static async getAllDocuments(user) {
        const neededHeaders = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        };

        const graphqlQuery = {
            "query": `query  {yourDocuments(userId: "${user}") {_id,name,content}}`,
        };

        return await http.post('/graphql', graphqlQuery, {headers: neededHeaders});

        //return http.get(`/all/${user}`, {headers: authHeader()});
    }

    static getSpecificFile(id) {
        return http.get(`/api/get/${id}`, {headers: authHeader()});
    }

    static sendEmail(mailOptions) {
        return http.post(`/api/sendEmail`, mailOptions,{headers: authHeader()});
    }
}