import axios from "axios";
import {URL} from "./index"

axios.defaults.withCredentials = true;

export class SubmissionRepository {
    url = URL;

    constructor(authorization) {
        this.authorization = authorization;
    }
    
    config = {
        withCredentials: true        
    };

    getSubmissions(lesson_id){
        return new Promise((resolve, reject) =>{
            axios.get(`${this.url}/api/v1/lessons/${lesson_id}/submissions`, {
                headers:{
                    Authorization: this.authorization
                }
            })
            .then(x => resolve(x.data))
            .catch(error => {
                reject(error)
            });
        })
    }

    getStatus(lesson_id){
        return new Promise((resolve, reject) =>{
            axios.get(`${this.url}/api/v1/lessons/${lesson_id}/submissions/submitted`, {
                headers:{
                    Authorization: this.authorization
                }
            })
            .then(x => resolve(x.data))
            .catch(error => {
                reject(error)
            });
        })
    }

    makeSubmission(lesson_id, content){
        return new Promise((resolve, reject) =>{
            axios.post(`${this.url}/api/v1/lessons/${lesson_id}/submissions`, {content}, {
                headers:{
                    Authorization: this.authorization
                }
            })
            .then(x => resolve(x.data))
            .catch(error => {
                reject(error)
            });
        })
    }

    getSummary(lesson_id){
        return new Promise((resolve, reject) =>{
            axios.get(`${this.url}/api/v1/lessons/${lesson_id}/students/summary`, {
                headers:{
                    Authorization: this.authorization
                }
            })
            .then(x => resolve(x.data))
            .catch(error => {
                reject(error)
            });
        })
    }
}