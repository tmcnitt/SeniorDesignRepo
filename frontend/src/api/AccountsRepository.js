import axios from "axios";

axios.defaults.withCredentials = true;

export class AccountsRepository {
    
    constructor(authorization) {
        this.authorization = authorization;
    }

    url = 'http://ec2-54-176-1-242.us-west-1.compute.amazonaws.com';

    getStaffStudents(){
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/api/v1/staff/students`, {
                headers: {
                    Authorization: this.authorization
                }
            })
                .then(x => resolve(x.data))
                .catch(error => {
                    reject(error);
                });
        })
    }

    addStudent(email, full_name, password){
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/api/v1/students`, {email, full_name, password}, {
                headers: {
                    Authorization: this.authorization
                }
            })
                .then(x => resolve(x))
                .catch(error => {
                    reject(error);
                });
        });
    }

    addStaff(email, full_name, password){
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/api/v1/staff`, {email, full_name, password}, {
                headers: {
                    Authorization: this.authorization
                }
            })
                .then(x => resolve(x))
                .catch(error => {
                    reject(error);
                });
        });
    }

    checkToken(token){
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/api/v1/login/test-token`,{},{
                headers: {
                    Authorization: token
                }
            })
            .then(x => {
                resolve(x.data)
            })
            .catch(error => {
                reject(error);
            });
        })
    }

    checkLogin(username, password, scope){
        //code 200 = success, code 422 = error
        let params = new URLSearchParams();
        params.append('username', username);
        params.append('password', password);
        params.append('scope', scope);
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/api/v1/login/access-token`, params)
                .then(x => {
                    const token = 'bearer ' + x.data.access_token
                    this.authorization = token
                    resolve(token)
                })
                .catch(error => {
                    reject(error);
                });
        })
    }

    changeSettings(full_name, email, password, scope){
        if(scope == "staff"){
            return new Promise((resolve, reject) => {
                axios.put(`${this.url}/api/v1/staff`, {email, full_name, password}, {
                    headers: {
                        Authorization: this.authorization
                    }
                })
                    .then(x => resolve(x))
                    .catch(error => {
                        reject(error);
                    });
            });
        }
        else if(scope == "student"){
            return new Promise((resolve, reject) => {
                axios.put(`${this.url}/api/v1/students`, {email, full_name, password}, {
                    headers: {
                        Authorization: this.authorization
                    }
                })
                    .then(x => resolve(x))
                    .catch(error => {
                        reject(error);
                    });
            });
        }
    }
}