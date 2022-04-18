import axios from "axios";

axios.defaults.withCredentials = true;

export class LessonRepository {
    url = 'http://ec2-54-176-1-242.us-west-1.compute.amazonaws.com';

    constructor(authorization) {
        this.authorization = authorization;
    }
    
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
                reject(error)
            });
        })
    }

    deleteLesson(lesson_id){
        return new Promise((resolve, reject) =>{
            axios.delete(`${this.url}/api/v1/lessons/${lesson_id}`, {
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

    getLessonStudents(lessonID){
        return new Promise((resolve, reject) =>{
            axios.get(`${this.url}/api/v1/lessons/${lessonID}/students`, {
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

    addLessonStudents(lessonID, due, student_id){
        return new Promise((resolve, reject) =>{
            axios.post(`${this.url}/api/v1/lessons/${lessonID}/students/`, {due, student_id}, {
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

    updateLessonStudents(lesson_id, student_id, due, completed){
        return new Promise((resolve, reject) =>{
            axios.put(`${this.url}/api/v1/lessons/${lesson_id}/students/${student_id}`, {due, completed, lesson_id, student_id}, {
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

    deleteLessonStudent(lessonID, studentID){
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

    getLessonSpecific(lessonID){
        return new Promise((resolve, reject) =>{
            axios.get(`${this.url}/api/v1/lessons/${lessonID}`, {
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

    getStatus(lessonID){
        return new Promise((resolve, reject) =>{
            axios.get(`${this.url}/api/v1/lessons/${lessonID}/students/status`, {
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