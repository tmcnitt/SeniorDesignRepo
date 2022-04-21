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
} from "@heroicons/react/solid";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { LessonRepository } from "./api/LessonRepository";
import { AccountsRepository } from "./api/AccountsRepository"
import { AppContext } from './AppContext'
import { Navbar } from './Navbar'


function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const EditLesson = () => {
  const [lesson_title, setLesson_title] = useState("")
  const [contents, setContents] = useState("")
  const [AssignToMyStudents, setAssignToMyStudents] = useState(false)
  const [dateTime, setDateTime] = useState("")
  const [AssignToSpec, setAssignToSpec] = useState(false)
  const [SelectedStudents, setSelectedStudents] = useState([])
  const [AllStudents, setAllStudents] = useState([])
  const [oldStudents, setOldStudents] = useState([])
  const [hasContents, setHasContents] = useState(false)
  const [hasStudents, setHasStudents] = useState(false)

  const params = useParams();
  const context = useContext(AppContext)
  const token = context.JWT
  const lessonRepo = new LessonRepository(token);
  const accountRepo = new AccountsRepository(token);
  const history = useHistory();
  
  useEffect(() => {
    if(!hasContents){
        accountRepo.getStaffStudents().then(students => {
          let temp = []
          students.forEach(student => {
              temp.push({student_id: student.id, name: student.full_name, checked: false})
          })
          setAllStudents(temp)
        })
        lessonRepo.getLessonSpecific(params.lessonid).then(lesson=>{
          setLesson_title(lesson.title);
          setContents(lesson.content);
        })
        setHasContents(true)
    }
  }, [AllStudents, lesson_title, contents])

  useEffect(() => {
    if(AllStudents.length !== 0 && !hasStudents){
      lessonRepo.getLessonStudents(params.lessonid).then(students => {
        setOldStudents(students)
        if(students.length === 0)
          return
        setDateTime(students[0].due)
        if(students.length === AllStudents.length){
          setAssignToMyStudents(true)
          let temp = AllStudents;
          temp.forEach(stu => stu.checked = true)
          setSelectedStudents(temp)
        }
        else {
          setAssignToSpec(true)
          let temp = AllStudents
          temp.forEach(student => {
            if(students.some(stu => stu.student_id === student.student_id)){
              student.checked = true
            }
            else{
              student.checked = false
            }
          })
          setSelectedStudents(temp)
        }
      })
      setHasStudents(true)
    }
  }, [AllStudents])
  
  const handleUpdate = (event) => {
    event.preventDefault();
    console.log(SelectedStudents)
    console.log(oldStudents)
    if (lesson_title === "" || contents === "") {
      alert("Please fill out the information required")
      return;
    }
    if (dateTime === "" && (AssignToMyStudents === true ||
       AssignToSpec == true)) {
      alert("Please provide a due date for students")
      return;
    }
    lessonRepo.updateLesson(params.lessonid, lesson_title, 1, contents).then(lessonData => {
      if (AssignToMyStudents === true || AssignToSpec === true) {
        let id = lessonData.id
        SelectedStudents.forEach(student => {
          if(student.checked === true){
            if(oldStudents.some(stu => stu.student_id === student.student_id))
              lessonRepo.updateLessonStudents(id, student.student_id, dateTime, false)
            else
              lessonRepo.addLessonStudents(id, dateTime, student.student_id)
          }
          else{
            if(oldStudents.some(stu => stu.student_id === student.student_id))
              lessonRepo.deleteLessonStudent(id, student.student_id)
          }
        })
      }
      else{
        oldStudents.forEach(student => {
          lessonRepo.deleteLessonStudent(params.lessonid, student.student_id)
        })
      }
      alert("Lesson updated")
      history.push("/lessonStaff/" + params.lessonid)
    })
  }

  const handleSelect = (event) => {
    const target = event.target;
    const name = target.name;
    let temp = SelectedStudents
    for(let i = 0; i < temp.length; i++){
      if(temp[i].student_id == name){
        temp[i].checked = !temp[i].checked
        break
      }
    }
    setSelectedStudents(temp)
  }
  
  return (
    <>
      <Navbar />
      <div className="pt-5 max-w-3xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
        <div className="flex items-center space-x-5">
          <h1 className="text-3xl font-bold text-gray-900">
            Edit Lesson
          </h1>
        </div>
        <div className="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3"></div>
      </div>
      <div className="main-box" style={{ width: "65%", margin: "auto" }}>
        <main className="py-10">
          <form className="space-y-8 divide-y divide-gray-200">
            <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
              <div>
                <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label
                      htmlFor="lesson_title"
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Lesson Title
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <div className="max-w-lg flex rounded-md shadow-sm">
                        <input
                          type="text"
                          name="lesson_title"
                          id="lesson_title"
                          autoComplete="lesson_title"
                          value={lesson_title}
                          className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                          onChange={e => setLesson_title(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center sm:border-t sm:border-gray-200 sm:pt-5">
                    <div className="space-y-6 sm:space-y-5 divide-y divide-gray-200">
                      <div className="pt-6 sm:pt-5">
                        <div role="group" aria-labelledby="label-assign">
                          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-baseline">
                            <div>
                              <div
                                className="text-base font-medium text-gray-900 sm:text-sm sm:text-gray-700"
                                id="label-assign"
                              >
                                Assign To:
                              </div>
                            </div>
                            <div className="mt-4 sm:mt-0 sm:col-span-2">
                              <div className="max-w-lg space-y-4">
                                <div className="relative flex items-start">
                                  <div className="flex items-center h-5">
                                    <input
                                      onChange={e => {
                                        setAssignToMyStudents(e.target.checked)
                                        if(AssignToSpec === true || (AssignToMyStudents === false && AssignToSpec === false)){
                                          setAssignToSpec(false)
                                          let temp = AllStudents;
                                          temp.forEach(stu => stu.checked = true)
                                          setSelectedStudents(temp)
                                        }
                                      }}
                                      id="AssignToMyStudents"
                                      name="AssignToMyStudents"
                                      type="checkbox"
                                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                      checked={AssignToMyStudents}
                                    />
                                  </div>
                                  <div className="ml-3 text-sm">
                                    <label
                                      htmlFor="AssignToMyStudents"
                                      className="font-medium text-gray-700"
                                    >
                                      Assign To My Students
                                    </label>
                                    <p className="text-gray-500">
                                      Assigns the lesson to all students
                                      assigned to you.
                                    </p>
                                  </div>
                                </div>
                                <div>
                                <div className="relative flex items-start">
                                  <div className="flex items-center h-5">
                                    <input
                                      onChange={e => {
                                        setAssignToSpec(e.target.checked)
                                        if(AssignToMyStudents === true || (AssignToMyStudents === false && AssignToSpec === false)){
                                          setAssignToMyStudents(false)
                                          let temp = AllStudents
                                          temp.forEach(stu => stu.checked = false)
                                          setSelectedStudents(temp)
                                        }
                                        else if(SelectedStudents.length === 0 ){
                                          let temp = AllStudents
                                          temp.forEach(stu => stu.checked = false)
                                          setSelectedStudents(temp)
                                        }
                                      }}
                                      id="AssignToSpec"
                                      name="AssignToSpec"
                                      type="checkbox"
                                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                      checked={AssignToSpec}
                                    />
                                  </div>
                                  <div className="ml-3 text-sm">
                                    <label
                                      htmlFor="AssignToSpec"
                                      className="font-medium text-gray-700"
                                    >
                                      Assign To Specific Students
                                    </label>
                                    <p className="text-gray-500">
                                      Assigns the lesson to specified students
                                    </p>
                                  </div>
                                </div>
                              </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {(AssignToMyStudents || AssignToSpec) && <>
                <div className="pb-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center sm:border-t sm:border-gray-200 sm:pt-5">
                  <div className="space-y-6 sm:space-y-5 divide-y divide-gray-200">
                    <div className="pt-6 sm:pt-5">
                      <div role="group" aria-labelledby="label-assign">
                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-baseline">
                          <div>
                            <label
                              htmlFor="dateTime"
                              className="text-base font-medium text-gray-900 sm:text-sm sm:text-gray-700"
                              id="label-assign"
                            >
                              Due Date:
                            </label>
                          </div>
                          <div className="mt-4 sm:mt-0 sm:col-span-2">
                            <div className="max-w-lg space-y-4">
                              <div className="relative flex items-start">
                                <div className="flex items-center h-5">
                                  <input type="datetime-local" id="dateTime" name="dateTime"
                                    onChange={e => setDateTime(e.target.value)} value={dateTime} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>}

              {AssignToSpec && <>
                <div className="text-center sm:grid sm:grid-cols-4 sm:gap-4 sm:items-center sm:border-t sm:border-gray-200 sm:pt-5">
                  {SelectedStudents.map((student, studentInd) => ( 
                    <div className="flex" key={student.student_id}>
                      <input type="checkbox" id={student.student_id} name={student.student_id} 
                      onChange={e => {handleSelect(e)}} defaultChecked={student.checked}/>
                      <label className="text-m font-medium text-gray-900 pl-2" htmlFor={student.student_id} > 
                        {student.name}
                      </label>
                    </div>
                  ))}
                </div>
              </>}

              <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Lesson Contents
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                   Write the lesson contents below.
                  </p>
                </div>
                <textarea
                  id="contents"
                  name="contents"
                  rows={8}
                  className="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
                  defaultValue={""}
                  value={contents}
                  onChange={e => setContents(e.target.value)}
                />
              </div>
            </div>

            <div className="pt-5">
              <div className="flex justify-end">
                <Link to={"/lessonStaff/" + params.lessonid}
                  type="button"
                  className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm 
                  text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={e => handleUpdate(e)}
                >
                  Update Lesson
                </button>
              </div>
            </div>
          </form>
        </main>
      </div>
    </>
  );
}

EditLesson.contextType = AppContext;


export default EditLesson;