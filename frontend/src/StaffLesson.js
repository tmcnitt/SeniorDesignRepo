import { Fragment, useEffect, useState } from 'react'
import { Menu, Popover, Transition } from '@headlessui/react'
import {
    ArrowNarrowLeftIcon,
    BanIcon,
    BookOpenIcon,
    CheckIcon,
    HomeIcon,
    PaperClipIcon,
    PencilAltIcon,
    QuestionMarkCircleIcon,
    SearchIcon,
    ThumbUpIcon,
    UserIcon,
} from '@heroicons/react/solid'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'
import React from 'react'
import { useContext } from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'
import { Navbar } from './Navbar'
import { AppContext } from './AppContext'
import { LessonRepository } from './api/LessonRepository'
import { AccountsRepository } from './api/AccountsRepository'
import { SubmissionRepository } from './api/SubmissionRepository'

const eventTypes = {
    lessonComplete: { icon: BookOpenIcon, bgColorClass: 'bg-gray-300' },
    assignmentComplete: { icon: PencilAltIcon, bgColorClass: 'bg-gray-300' },
    lessonIncomplete: { icon: BookOpenIcon, bgColorClass: 'bg-black' },
    assignmentIncomplete: { icon: PencilAltIcon, bgColorClass: 'bg-black' },
    applied: { icon: UserIcon, bgColorClass: 'bg-gray-400' },
    advanced: { icon: ThumbUpIcon, bgColorClass: 'bg-blue-500' },
    completed: { icon: CheckIcon, bgColorClass: 'bg-green-500' },
}

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const StaffLesson = () => {
    const [title, setTitle] = useState("Lesson Title")
    const [content, setContent] = useState("Lesson Content")
    const [lessons, setLessons] = useState([])
    const [allStudents, setAllStudents] = useState([])
    const [isSet, setIsSet] = useState(false)
    
    const params = useParams();
    const context = useContext(AppContext)
    const token = context.JWT
    const lessonRepo = new LessonRepository(token);
    const accountRepo = new AccountsRepository(token);
    const subRepo = new SubmissionRepository(token);
    const history = useHistory();

    const getDate = (currDateFull) =>{
        let str = currDateFull.getFullYear() + "-";
        if(currDateFull.getMonth() < 10)
            str += "0"
        str += (currDateFull.getMonth() + 1) + "-" 
        if(currDateFull.getDate() < 10)
            str += "0"
        str += currDateFull.getDate() + "T"
        + currDateFull.getHours() + ":" + currDateFull.getMinutes() + ":" + currDateFull.getSeconds()
        return str
    }

    useEffect(()=>{
        lessonRepo.getLessonSpecific(params.lessonid).then(lesson=>{
            setTitle(lesson.title);
            setContent(lesson.content);
        })
        lessonRepo.getLessonStudents(params.lessonid).then(student => {
            let temp = []
            student.forEach(stu => {
                temp.push({student_id: stu.student_id, due: stu.due, complete: stu.completed, submission: "", full_name: stu.full_name})
            })
            setAllStudents(temp)
        })
    }, [title, content]);

    useEffect(() => {
        if(!isSet && allStudents.length !== 0){
            subRepo.getSubmissions(params.lessonid).then(submissions => {
                let temp = allStudents
                submissions.forEach(sub => {
                    for(let i = 0; i < temp.length; i++){
                        if(temp[i].student_id === sub.student_id){
                            temp[i].submission = sub.content
                            continue
                        }
                    }
                })
                setAllStudents(temp)
            })
            setIsSet(true)
        }
    }, [allStudents])

    useEffect(() =>{
        lessonRepo.getLessons().then(data =>{
            let temp = []
            data.forEach(lesson => temp.push({title: lesson.title, id: lesson.id,  type: eventTypes.lessonComplete}))
            setLessons(temp)
        })
    }, [])

    const onDelete = () => {
        if(window.confirm("Delete lesson? Click OK to confirm.")){
            lessonRepo.deleteLesson(params.lessonid).then(data=>{
            history.push("/dashStaff")
            })
        }
    }

    const datePretty = (date) => {
        let tokens = date.split("-")
        let tokens2 = tokens[2].split("T")
        let tokens3 = tokens2[1].split(":")
        let time = "a.m."
        if(tokens3[0] > 12){
            time = "p.m."
            tokens3[0] = tokens3[0] - 12
        }
        return tokens[1] + "/" + tokens2[0] + "/" + tokens[0] + " at " + tokens3[0] + ":" + tokens3[1] + " " + time
    }

    const onToggle = (e) => {
        let target = e.target
        if(target.innerHTML === "Mark as complete"){
            target.className = "bg-gray-500 text-white font-bold px-2 rounded-full float-right"
            target.innerHTML = "Mark as incomplete"
        }
        else{
            target.className = "bg-blue-500 hover:bg-blue-700 text-white font-bold px-2 rounded-full float-right"
            target.innerHTML = "Mark as complete"
        }
    }

    return (<>
        <div className="min-h-full">
            <Navbar />

            <main className="pb-10 ">
                {/* Page header */}
                <div className="max-w-3xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
                    <div className="flex items-center space-x-5">
                        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
                    </div>
                    <div className="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3">
                        <Link to={"/" + "editLesson/" + params.lessonid}
                            type="button"
                            className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
                        >
                            Edit Lesson
                        </Link>
                        <button
                            type="button"
                            className="bg-red-600 text-white inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
                            onClick={onDelete}
                        >
                            Delete Lesson
                        </button>
                    </div>
                    
                </div>

                <div className="mt-8 max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                    <div className="space-y-6 lg:col-start-1 lg:col-span-2">
                        {/* Description list*/}
                        <section aria-labelledby="applicant-information-title">
                            <div className="bg-white shadow sm:rounded-lg">
                                <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                                    <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                                        <div className="sm:col-span-2">
                                            <p className="mt-1 text-sm text-gray-900">
                                                {content}   
                                            </p>
                                        </div>
                                    </dl>
                                </div>
                            </div>
                        </section>
                        <div className="space-y-6 lg:col-start-1 lg:col-span-2">
                        {/* Description list*/}
                        <section aria-labelledby="applicant-information-title">
                            <div className="bg-white shadow sm:rounded-lg">
                                <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                                    <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                                        <div className="sm:col-span-2">
                                            <h2 className="mt-1 text-gray-900">
                                                Student Submissions:  
                                            </h2>
                                            <div>
                                                {isSet && allStudents.map((student, studentInd) => (<>
                                                    <div key={student.student_id} className="pt-2">
                                                        {student.student_id}{": "}
                                                        <span className={classNames(
                                                            student.completed === true ? 'text-green-600' : 'text-red-400'
                                                            )}>
                                                            {student.completed ? <span>Complete</span> : <span>Incomplete</span>}
                                                        </span>
                                                        {", "}
                                                        <span className='text-gray-900'>{"Due: "} 
                                                            <span className={classNames(
                                                                getDate(new Date()) > student.due ? 'text-red-400' : 'text-gray-900'
                                                                )}>
                                                                {datePretty(student.due)}
                                                            </span>
                                                        </span>
                                                        <button onClick={e => onToggle(e)} id={student.student_id}
                                                            className='bg-blue-500 hover:bg-blue-700 text-white font-bold px-2 rounded-full float-right'>
                                                            Mark as {student.complete ? "incomplete" : "complete"}
                                                        </button>
                                                        {student.submission === "" ? <p>Student has not made a submission</p> : <p>{student.submission}</p>}
                                                        <p className='pb-1'></p>
                                                    </div>
                                                </>))}
                                                {!isSet && <p>No students assigned to this lesson.</p>}
                                            </div>
                                        </div>
                                    </dl>
                                </div>
                            </div>
                        </section>
                    </div>
                    </div>

                    <section aria-labelledby="timeline-title" className="lg:col-start-3 lg:col-span-1">
                        <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
                            <h2 id="timeline-title" className="text-lg font-medium text-gray-900">
                                Lessons:
                            </h2>
                            {/* Activity Feed */}
                            <div className="mt-6 flow-root">
                                <ul role="list" className="-mb-8">
                                     {lessons.map((item, itemIdx) => (
                                        <li key={item.id}>
                                            <div className="relative pb-8">
                                                {itemIdx !== lessons.length - 1 ? (
                                                    <span
                                                        className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                                                        aria-hidden="true"
                                                    />
                                                ) : null}
                                                <div className="relative flex space-x-3">
                                                    <div>
                                                        <span
                                                            className={classNames(
                                                                item.type.bgColorClass,
                                                                'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white'
                                                            )}
                                                        >
                                                            <item.type.icon className="w-5 h-5 text-white" aria-hidden="true" />
                                                        </span>
                                                    </div>
                                                    <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4 truncate">
                                                        <div>
                                                            <a href={"/lessonStaff/" + item.id} className="text-sm text-gray-500 truncate">
                                                                {item.title}              
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    ))} 
                                </ul>
                            </div>
                        </div>
                    </section>
                </div>
                
            </main>
        </div>
    </>)
}


export default StaffLesson