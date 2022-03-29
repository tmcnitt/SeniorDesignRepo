import axios from "axios";

axios.defaults.withCredentials = true;

export class LessonRepository {
    url = 'http://ec2-54-176-1-242.us-west-1.compute.amazonaws.com';

    authorization = 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDkyNjg2MTIsInN1YiI6IjEiLCJ1c2VyX3R5cGUiOiJzdGFmZiJ9.YHnpvPDQnNcWOrk-eq60YgAIcRQVBVzNtU69gcDx-50'

    config = {
        withCredentials: true        
    };

    getLessons(){
        return new Promise((resolve, reject) =>{
            axios.get(`${this.url}/api/v1/lessons`, {
                headers:{
                    Authorization: this.authorization
                }
            })
            .then(x => resolve(x.data))
            .catch(error => {
                alert("error getting lessons");
                reject(error)
            });
        })
    }

    createLesson(title, staff_id, content){
        return new Promise((resolve, reject) =>{
            axios.post(`${this.url}/api/v1/lessons`, {title, staff_id, content}, {
                headers:{
                    Authorization: this.authorization
                }
            })
            .then(x => resolve(x.data))
            .catch(error => {
                alert("error creating lessons");
                reject(error)
            });
        })
    }

    updateLesson(lessonId, title, staff_id, content){
        return new Promise((resolve, reject) =>{
            axios.put(`${this.url}/api/v1/lessons/${lessonId}`, {title, staff_id, content}, {
                headers:{
                    Authorization: this.authorization
                }
            })
            .then(x => resolve(x.data))
            .catch(error => {
                alert("error updating lessons");
                reject(error)
            });
        })
    }

    deleteLesson(lessonId){
        return new Promise((resolve, reject) =>{
            axios.delete(`${this.url}/api/v1/lessons/${lessonId}`, {
                headers:{
                    Authorization: this.authorization
                }
            })
            .then(x => resolve(x.data))
            .catch(error => {
                alert("error deleting lesson");
                reject(error)
            });
        })
    }

    getLessonStudents(lessonID){
        return new Promise((resolve, reject) =>{
            axios.get(`${this.url}/api/v1/lessons/${lessonID}/students`, {
                headers:{
                    Authorization: this.authorization
                }
            })
            .then(x => resolve(x.data))
            .catch(error => {
                alert("error getting lesson students");
                reject(error)
            });
        })
    }

    addLessonStudents(lessonID, due, student_id){
        return new Promise((resolve, reject) =>{
            axios.post(`${this.url}/api/v1/lessons/${lessonID}/students/`, {due, student_id}, {
                headers:{
                    Authorization: this.authorization
                }
            })
            .then(x => resolve(x.data))
            .catch(error => {
                alert("error adding student to lesson");
                reject(error)
            });
        })
    }

    updateLessonStudents(lessonID, studentID, due){
        return new Promise((resolve, reject) =>{
            axios.put(`${this.url}/api/v1/lessons/${lessonID}/students/${studentID}`, {due}, {
                headers:{
                    Authorization: this.authorization
                }
            })
            .then(x => resolve(x.data))
            .catch(error => {
                alert("error updating student lesson");
                reject(error)
            });
        })
    }

    deleteLesson(lessonID, studentID){
        return new Promise((resolve, reject) =>{
            axios.delete(`${this.url}/api/v1/lessons/${lessonID}/students/${studentID}`, {
                headers:{
                    Authorization: this.authorization
                }
            })
            .then(x => resolve(x.data))
            .catch(error => {
                alert("error deleting student from lesson");
                reject(error)
            });
        })
    }
}