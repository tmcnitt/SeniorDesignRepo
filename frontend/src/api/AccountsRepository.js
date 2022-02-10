import axios from "axios";

axios.defaults.withCredentials = true;

export class AccountsRepository {

    url = 'http://ec2-54-176-1-242.us-west-1.compute.amazonaws.com';

    config = {
        withCredentials: true        
    };

    getStaffStudents(){
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/api/v1/staff/students`, {
                headers: {
                    Authorization: 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDUxNDI3NDUsInN1YiI6IjEiLCJ1c2VyX3R5cGUiOiJzdGFmZiJ9.GLmrCljO_ax3d1__cMPHQ9trjzYBmc_zEhLAxmLbY04'
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
                    Authorization: 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDUxNDI3NDUsInN1YiI6IjEiLCJ1c2VyX3R5cGUiOiJzdGFmZiJ9.GLmrCljO_ax3d1__cMPHQ9trjzYBmc_zEhLAxmLbY04'
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
                    Authorization: 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDUxNDI3NDUsInN1YiI6IjEiLCJ1c2VyX3R5cGUiOiJzdGFmZiJ9.GLmrCljO_ax3d1__cMPHQ9trjzYBmc_zEhLAxmLbY04'
                }
            })
                .then(x => resolve(x))
                .catch(error => {
                    reject(error);
                });
        });
    }
}