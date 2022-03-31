import { Fragment } from "react";
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
import { Link, Redirect } from "react-router-dom";
import { LessonRepository } from "./api/LessonRepository";
import { AccountsRepository } from "./api/AccountsRepository"
import { AppContext } from './AppContext'
import { Navbar } from './Navbar'

const attachments = [{ name: "example_attachement.pdf", href: "#" }];


function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

class CreateLesson extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lesson_title: "",
      contents: "",
      AssignToMyStudents: false,
      dateTime: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
  }

  componentDidMount() {
    const token = this.context.JWT
    this.lessonRepo = new LessonRepository(token)
    this.accountRepo = new AccountsRepository(token);
  }

  handleCreate(event) {
    event.preventDefault();
    if (this.state.lesson_title === "" || this.state.contents === "") {
      alert("Please fill out the information required")
      return;
    }
    if (this.state.dateTime === "" && this.state.AssignToMyStudents === true) {
      alert("Please provide a due date for students")
      return;
    }
    this.lessonRepo.createLesson(this.state.lesson_title, 1, this.state.contents).then(lessonData => {
      if (this.state.AssignToMyStudents === true) {
        let id = lessonData.id
        this.accountRepo.getStaffStudents().then(students => {
          students.forEach(student => {
            this.lessonRepo.addLessonStudents(id, this.state.dateTime, student.id)
          })
        })
      }
      alert("Lesson created")
      this.setState({
        lesson_title: "",
        contents: "",
        AssignToMyStudents: false,
        dateTime: ""
      })
    })
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <>
        <Navbar />

        <div className="pt-5 max-w-3xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
          <div className="flex items-center space-x-5">
            <h1 className="text-3xl font-bold text-gray-900">
              Create New Lesson
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
                            value={this.state.lesson_title}
                            className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                            onChange={this.handleChange}
                          />
                        </div>
                      </div>
                    </div>

                    {/* <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label
                      htmlFor="about"
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Lesson Description
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <textarea
                        id="description"
                        name="description"
                        rows={3}
                        className="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
                        defaultValue={""}
                      />
                      <p className="mt-2 text-sm text-gray-500">
                        Briefly describe the goal of the lesson.
                      </p>
                    </div>
                  </div> */}

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
                                        onChange={this.handleChange}
                                        id="AssignToMyStudents"
                                        name="AssignToMyStudents"
                                        type="checkbox"
                                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                        checked={this.state.AssignToMyStudents}
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
                                  {/* <div>
                                  <div className="relative flex items-start">
                                    <div className="flex items-center h-5">
                                      <input
                                        id="AssignToGroup"
                                        name="AssignToGroup"
                                        type="checkbox"
                                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                      />
                                    </div>
                                    <div className="ml-3 text-sm">
                                      <label
                                        htmlFor="AssignToGroups"
                                        className="font-medium text-gray-700"
                                      >
                                        Assign To Specific Group
                                      </label>
                                      <p className="text-gray-500">
                                        Assigns the lesson to students within a
                                        specific group.
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <div className="relative flex items-start">
                                    <div className="flex items-center h-5">
                                      <input
                                        id="AssignToSpecific"
                                        name="AssignToSpecific"
                                        type="checkbox"
                                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                      />
                                    </div>
                                    <div className="ml-3 text-sm">
                                      <label
                                        htmlFor="AssignToSpecific"
                                        className="font-medium text-gray-700"
                                      >
                                        Assign To Specific Students
                                      </label>
                                      <p className="text-gray-500">
                                        Assigns the lesson to specific students.
                                      </p>
                                    </div>
                                  </div>
                                </div> */}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {this.state.AssignToMyStudents &&
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center sm:border-t sm:border-gray-200 sm:pt-5">
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
                                      onChange={this.handleChange} value={this.state.dateTime} />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                }

                <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
                  <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Lesson Contents
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                      You may upload a file or write out the lesson below.
                    </p>
                  </div>
                  <textarea
                    id="contents"
                    name="contents"
                    rows={8}
                    className="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
                    defaultValue={""}
                    value={this.state.contents}
                    onChange={this.handleChange}
                  />
                  {/* <div className="space-y-6 sm:space-y-5">
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <div className="max-w-lg flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                          >
                            <span>Upload a file</span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              className="sr-only"
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PDF, TXT, or Docx
                        </p>
                      </div>
                    </div>
                  </div>
                </div> */}
                </div>
              </div>

              <div className="pt-5">
                <div className="flex justify-end">
                  <Link to="dashStaff"
                    type="button"
                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={this.handleCreate}
                  >
                    Create Lesson
                  </button>
                </div>
              </div>
            </form>
          </main>
        </div>
      </>
    );
  }
}

CreateLesson.contextType = AppContext;


export default CreateLesson;