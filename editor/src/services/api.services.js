import http from '../http-common';

export default class APIService {
    static createNew(formData) {
        return http.post('/create', formData);
    }

    static updateDocument(formData, id){
        return http.put(`/update/${id}`, formData);
    }

    static getAllDocuments(){
        return http.get('/all');
    }

    static getSpecificFile(id){
        return http.get(`/get/${id}`);
    }
}