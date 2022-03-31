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
  InboxIcon
} from "@heroicons/react/solid";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import React from "react";
import { Link } from "react-router-dom";
import { Navbar } from './Navbar'

const attachments = [{ name: "example_attachement.pdf", href: "#" }];
const eventTypes = {
  lessonComplete: { icon: BookOpenIcon, bgColorClass: "bg-gray-300" },
  assignmentComplete: { icon: PencilAltIcon, bgColorClass: "bg-gray-300" },
  lessonIncomplete: { icon: BookOpenIcon, bgColorClass: "bg-black" },
  assignmentIncomplete: { icon: PencilAltIcon, bgColorClass: "bg-black" },
  applied: { icon: UserIcon, bgColorClass: "bg-gray-400" },
  advanced: { icon: ThumbUpIcon, bgColorClass: "bg-blue-500" },
  completed: { icon: CheckIcon, bgColorClass: "bg-green-500" },
};
const timeline = [
  {
    id: 1,
    type: eventTypes.lessonComplete,
    content: "Lesson 1",
    target: "Lesson Title",
    date: "Sep 20",
    datetime: "2020-09-20",
  },
  {
    id: 2,
    type: eventTypes.assignmentComplete,
    content: "Assignment 1",
    target: "Assignment Title",
    date: "Sep 22",
    datetime: "2020-09-22",
  },
  {
    id: 3,
    type: eventTypes.lessonComplete,
    content: "Lesson 2",
    target: "Lesson Title",
    date: "Sep 28",
    datetime: "2020-09-28",
  },
  {
    id: 4,
    type: eventTypes.assignmentComplete,
    content: "Assignment 2",
    target: "Assignment Title",
    date: "Sep 30",
    datetime: "2020-09-30",
  },
  {
    id: 5,
    type: eventTypes.lessonComplete,
    content: "Lesson 3",
    target: "Lesson Title",
    date: "Oct 4",
    datetime: "2020-10-04",
  },
];
const comments = [
  {
    id: 1,
    name: "Leslie Alexander",
    date: "4d ago",
    imageId: "1494790108377-be9c29b29330",
    body: "Ducimus quas delectus ad maxime totam doloribus reiciendis ex. Tempore dolorem maiores. Similique voluptatibus tempore non ut.",
  },
  {
    id: 2,
    name: "Michael Foster",
    date: "4d ago",
    imageId: "1519244703995-f4e0f30006d5",
    body: "Et ut autem. Voluptatem eum dolores sint necessitatibus quos. Quis eum qui dolorem accusantium voluptas voluptatem ipsum. Quo facere iusto quia accusamus veniam id explicabo et aut.",
  },
  {
    id: 3,
    name: "Dries Vincent",
    date: "4d ago",
    imageId: "1506794778202-cad84cf45f1d",
    body: "Expedita consequatur sit ea voluptas quo ipsam recusandae. Ab sint et voluptatem repudiandae voluptatem et eveniet. Nihil quas consequatur autem. Perferendis rerum et.",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

class CreateAssignment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleChange = this.handleChange.bind(this);
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

        <div className="max-w-3xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
          <div className="flex items-center space-x-5">
            <h1 className="text-2xl font-bold text-gray-900">
              Create New Assignment
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
                        htmlFor="AssignmentTitle"
                        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                      >
                        Assignment Title
                      </label>
                      <div className="mt-1 sm:mt-0 sm:col-span-2">
                        <div className="max-w-lg flex rounded-md shadow-sm">
                          <input
                            type="text"
                            name="assignment-title"
                            id="assignment-title"
                            autoComplete="assignment-title"
                            className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                      <label
                        htmlFor="AssignmentDescription"
                        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                      >
                        Assignment Description
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
                          (Optional) Briefly describe the goal of the assignment.
                        </p>
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
                                        id="AssignToMyStudents"
                                        name="AssignToMyStudents"
                                        type="checkbox"
                                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                      />
                                    </div>
                                    <div className="ml-3 text-sm">
                                      <label
                                        htmlFor="myStudents"
                                        className="font-medium text-gray-700"
                                      >
                                        Assign To My Students
                                      </label>
                                      <p className="text-gray-500">
                                        Assigns the assignment to all students
                                        assigned to you.
                                      </p>
                                    </div>
                                  </div>
                                  <div>
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
                                          Assigns the assignment to students
                                          within a specific group.
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
                                          Assigns the assignment to specific
                                          students.
                                        </p>
                                      </div>
                                    </div>
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
                                          Assign To Specific Lesson
                                        </label>
                                        <p className="text-gray-500">
                                          Assigns the assignment to a specific
                                          lesson.
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

                <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
                  <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Assignment Details
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                      Input number of questions then create them below.
                    </p>
                  </div>
                </div>
              </div>
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="postal-code"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Number of Questions
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    type="text"
                    name="QuestionNumber"
                    id="QuestionNumber"
                    autoComplete="postal-code"
                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    defaultValue={1}
                  />
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="type"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Question Type
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <select
                    id="type"
                    name="type"
                    autoComplete="question-type"
                    className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                  >
                    <option>True/False</option>
                    <option>Open Response</option>
                    <option>Multiple Choice</option>
                  </select>
                </div>
                <label
                  htmlFor="AssignmentTitle"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Question
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <div className="max-w-lg flex rounded-md shadow-sm">
                    <input
                      type="text"
                      name="assignment-title"
                      id="assignment-title"
                      autoComplete="assignment-title"
                      className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <label
                  htmlFor="type"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Correct Answer
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <select
                    id="answer"
                    name="answer"
                    autoComplete="answer"
                    className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                  >
                    <option>True</option>
                    <option>False</option>
                  </select>
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
                  >
                    Create Assignment
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

export default CreateAssignment
