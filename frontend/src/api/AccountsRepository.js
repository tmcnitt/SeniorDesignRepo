import axios from "axios";

axios.defaults.withCredentials = true;

export class AccountsRepository {

    url = 'http://ec2-54-176-1-242.us-west-1.compute.amazonaws.com';

    config = {
        withCredentials: true        
    };

    authorization = 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDkyNjg2MTIsInN1YiI6IjEiLCJ1c2VyX3R5cGUiOiJzdGFmZiJ9.YHnpvPDQnNcWOrk-eq60YgAIcRQVBVzNtU69gcDx-50'
    
    getStaffStudents(){
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/api/v1/staff/students`, {
                headers: {
                    Authorization: this.authorization
                }
            })
                .then(x => resolve(x.data))
                .catch(error => {
                    alert("Error getting Students!");
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

    checkLogin(username, password, scope){
        //code 200 = success, code 422 = error
        let params = new URLSearchParams();
        params.append('username', username);
        params.append('password', password);
        params.append('scope', scope);
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/api/v1/login/access-token`, params)
                .then(x => resolve(x.data))
                .catch(error => {
                    reject(error);
                });
        })
    }
}