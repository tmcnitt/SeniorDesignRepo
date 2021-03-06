import { Fragment, useEffect, useState } from "react";
import { Menu, Popover, Transition } from "@headlessui/react";
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
  CheckCircleIcon
} from "@heroicons/react/solid";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import React from "react";
import { Navbar } from './Navbar'
import { useContext } from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'
import { AppContext } from './AppContext'
import { LessonRepository } from './api/LessonRepository'
import { AccountsRepository } from './api/AccountsRepository'
import { SubmissionRepository } from './api/SubmissionRepository'

const user = {
  name: "Whitney Francis",
  email: "whitney@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
};

const eventTypes = {
  lessonComplete: { icon: BookOpenIcon, bgColorClass: "bg-gray-300" },
  assignmentComplete: { icon: PencilAltIcon, bgColorClass: "bg-gray-300" },
  lessonIncomplete: { icon: BookOpenIcon, bgColorClass: "bg-black" },
  assignmentIncomplete: { icon: PencilAltIcon, bgColorClass: "bg-black" },
  applied: { icon: UserIcon, bgColorClass: "bg-gray-400" },
  advanced: { icon: ThumbUpIcon, bgColorClass: "bg-blue-500" },
  completed: { icon: CheckIcon, bgColorClass: "bg-green-500" },
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const StudentLesson = () => {
  const [title, setTitle] = useState("Lesson Title")
  const [content, setContent] = useState("Lesson Content")
  const [lessons, setLessons] = useState([])
  const [date, setDate] = useState("")
  const [complete, setComplete] = useState(false)
  const [status, setStatus] = useState(undefined)
  const [submission, setSubmission] = useState("")
  
  const params = useParams();
  const context = useContext(AppContext)
  const token = context.JWT
  const lessonRepo = new LessonRepository(token);
  const accountRepo = new AccountsRepository(token);
  const subRepo = new SubmissionRepository(token);
  const history = useHistory();

  const makeSubmission = (e) => {
    e.preventDefault()
    subRepo.makeSubmission(params.lessonid, submission).then(() => {
      setStatus({content: submission})
    })
  }

  useEffect(()=>{
    lessonRepo.getStatus(params.lessonid).then(status =>{
      setDate(status.due);
      setComplete(status.completed);
    })
    lessonRepo.getLessonSpecific(params.lessonid).then(lesson=>{
        setTitle(lesson.title);
        setContent(lesson.content);
    })
    subRepo.getStatus(params.lessonid).then((stat) => {
      if(stat){
        setStatus(stat)
      }
    })
  }, [title, content, date, complete]);

  useEffect(() =>{
      lessonRepo.getLessons().then(data =>{
          let temp = []
          data.forEach(lesson => temp.push({title: lesson.title, id: lesson.id,  type: eventTypes.lessonComplete}))
          setLessons(temp)
      })
  }, [])

  const datePretty = (date) => {
    if(!date){
      return
    }

    let tokens = date.split("-")
    let tokens2 = tokens[2].split("T")
    let tokens3 = tokens2[1].split(":")
    let time = "a.m."
    if (tokens3[0] > 12) {
      time = "p.m."
      tokens3[0] = tokens3[0] - 12
    }
    return tokens[1] + "/" + tokens2[0] + "/" + tokens[0] + " at " + tokens3[0] + ":" + tokens3[1] + " " + time
  }

  return(
    <>
      <div className="min-h-full">
        <Navbar />

        <main className="py-10">
          {/* Page header */}
          <div className="max-w-3xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
            <div className="flex items-center space-x-5">
              <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            </div>
          </div>

          <div className="mt-8 max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
            <div className="space-y-6 lg:col-start-1 lg:col-span-2">
              {/* Description list*/}
              <section aria-labelledby="applicant-information-title">
                <div className="bg-white shadow sm:rounded-lg">
                  <div className="relative px-4 py-8 sm:px-6">
                    <span
                      className="absolute pointer-events-none top-6 text-gray-600"
                      aria-hidden="true"
                    >
                      <span>Due: {datePretty(date)}</span>
                    </span>
                    <span className="absolute top-6 right-6" aria-hidden="true">
                      {complete ? <CheckCircleIcon className="block h-6 w-6 text-green-600" aria-hidden="true" /> : null}
                    </span>
                  </div>
                  <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                    <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                      <div className="sm:col-span-2">
                        <p className="mt-1 text-sm text-gray-900 display-line">
                          {content}
                        </p>
                      </div>
                    </dl>
                  </div>
                </div>
              </section>

              {/* Comments*/}
              <section aria-labelledby="notes-title">
                <div className="bg-white shadow sm:rounded-lg sm:overflow-hidden">
                  <div className="divide-y divide-gray-200">
                    <div className="px-4 py-5 sm:px-6">
                      <h2
                        id="notes-title"
                        className="text-lg font-medium text-gray-900"
                      >
                        Response
                      </h2>
                    </div>
                    
                  </div>
                  <div className="bg-gray-50 px-4 py-6 sm:px-6">
                    <div className="flex space-x-3">
                      <div className="min-w-0 flex-1">
                          <div>
                            <label htmlFor="comment" className="sr-only">
                              About
                            </label>
                            <textarea
                              id="comment"
                              name="comment"
                              rows={3}
                              className={
                                "shadow-sm block w-full focus:ring-blue-500 focus:border-blue-500 sm:text-sm border border-gray-300 rounded-md "
                                + (!!status ? 'bg-gray-200 text-gray-500 border-gray-200 shadow-none' : ' ')
                              }

                              placeholder="Add a response"
                              defaultValue={(status && status.content) || ""}
                              onChange={e => setSubmission(e.target.value)}
                              disabled={!!status}
                            />
                          </div>
                          <div className="mt-3 flex items-right justify-between">
                            <button
                              type="submit"
                              className={
                                "ml-3 inline-flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 "
                                + (!!status ? 'bg-gray-200 text-gray-500 border-gray-200 shadow-none' : 'bg-blue-900')
                            }
                              onClick={(e) => makeSubmission(e)}
                              disabled={!!status}
                            >
                              Comment
                            </button>
                          </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <section
              aria-labelledby="timeline-title"
              className="lg:col-start-3 lg:col-span-1"
            >
              <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
                <h2
                  id="timeline-title"
                  className="text-lg font-medium text-gray-900"
                >
                  Lessons
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
                                        <a href={"/lessonStudent/" + item.id} className="text-sm text-gray-500 truncate">
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
    </>
  );
}

export default StudentLesson
