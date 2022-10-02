import http from '../http-common';
import authHeader from "@/services/auth-header";

export default class APIService {
    static createNew(formData) {
        return http.post('/create', formData, {headers: authHeader()});
    }

    static updateDocument(formData, id){
        return http.put(`/update/${id}`, formData,{headers: authHeader()});
    }

    static getAllDocuments(user){
        return http.get(`/all/${user}`, {headers: authHeader()});
    }

    static getSpecificFile(id){
        return http.get(`/get/${id}`,{headers: authHeader()});
    }
}