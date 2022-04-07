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
import { Link, useParams } from 'react-router-dom'
import { Navbar } from './Navbar'
import { AppContext } from './AppContext'
import { LessonRepository } from './api/LessonRepository'

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

    const params = useParams();
    const context = useContext(AppContext)
    const token = context.JWT
    const lessonRepo = new LessonRepository(token);

    useEffect(()=>{
        lessonRepo.getLessonSpecific(params.lessonid).then(lesson=>{
            setTitle(lesson.title);
            setContent(lesson.content);
        })
        
    }, [title, content]);

    useEffect(() =>{
        lessonRepo.getLessons().then(data =>{
            let temp = []
            data.forEach(lesson => temp.push({title: lesson.title, id: lesson.id,  type: eventTypes.lessonComplete}))
            setLessons(temp)
        })
    }, [])

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
                                                            <p className="text-sm text-gray-500 truncate">
                                                                {item.title}              
                                                            </p>
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