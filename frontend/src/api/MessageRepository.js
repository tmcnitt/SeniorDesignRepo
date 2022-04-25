import axios from "axios";
import {URL} from "./index"

axios.defaults.withCredentials = true;

export class MessageRepository {

    url = URL;

    constructor(authorization) {
        this.authorization = authorization;
    }

    config = {
        withCredentials: true        
    };

    getInbox(){
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/api/v1/messages/`, {
                headers: {
                    Authorization: this.authorization
                }
            })
                .then(x => resolve(x.data))
                .catch(error => {
                    alert("Error getting Inbox!");
                    reject(error);
                });
        })
    }

    getSent(){
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/api/v1/messages/sent`, {
                headers: {
                    Authorization: this.authorization
                }
            })
                .then(x => resolve(x.data))
                .catch(error => {
                    alert("Error getting Sent Messages!");
                    reject(error);
                });
        })
    }

    sendMessage(message, to_user_type, to_user_id){
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/api/v1/messages`, {message, to_user_type, to_user_id}, {
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