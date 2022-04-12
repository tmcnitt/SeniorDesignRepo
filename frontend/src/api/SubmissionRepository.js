import axios from "axios";

axios.defaults.withCredentials = true;

export class SubmissionRepository {
    url = 'http://ec2-54-176-1-242.us-west-1.compute.amazonaws.com';

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
}