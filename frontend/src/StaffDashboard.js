import { Fragment } from 'react'
import { Menu, Popover, Transition } from '@headlessui/react'
import {
  AcademicCapIcon,
  BadgeCheckIcon,
  BellIcon,
  CashIcon,
  ClockIcon,
  MenuIcon,
  ReceiptRefundIcon,
  UsersIcon,
  XIcon,
} from '@heroicons/react/outline'
import { CheckCircleIcon, ClipboardCheckIcon, ClipboardListIcon, InboxIcon, MinusCircleIcon, SearchIcon } from '@heroicons/react/solid'
import React from 'react'
import { AccountsRepository } from './api/AccountsRepository'
import { LessonRepository } from './api/LessonRepository'
import {Link, Redirect} from 'react-router-dom'
import { AppContext } from './AppContext'
import { Navbar } from './Navbar'

const user = {
  name: 'Staff',
  email: 'staffEmail@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

class StaffDashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      studentEmail: '',
      studentName: '',
      staffEmail: '',
      staffName: '',
      cards: [],
      students: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleStudentSubmit = this.handleStudentSubmit.bind(this);
    this.handleStaffSubmit = this.handleStaffSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({[name]: value});
  }

  handleStudentSubmit(event) {
    alert(`Created account for ${this.state.studentName} with email ${this.state.studentEmail}. Default password: 123`);
    this.accountRepo.addStudent(this.state.studentEmail, this.state.studentName, '123');
    this.setState({
      studentEmail: '',
      studentName: ''
    });
    event.preventDefault();
  }

  handleStaffSubmit(event) {
    alert(`Created account for ${this.state.staffName} with email ${this.state.staffEmail}. Default password: 123`);
    this.accountRepo.addStaff(this.state.staffEmail, this.state.staffName, '123');
    this.setState({
      staffEmail: '',
      staffName: ''
    });
    event.preventDefault();
  }

  render() {
    return(
    <>
      <div className="min-h-full">
        <Navbar />
        <main className="-mt-24 pb-8">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <h1 className="sr-only">Profile</h1>
            {/* Main 3 column grid */}
            <div className="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8">
              {/* Left column */}
              <div className="grid grid-cols-1 gap-4 lg:col-span-2">
                {/* Welcome panel */}
                <section aria-labelledby="profile-overview-title">
                  <div className="rounded-lg bg-white overflow-hidden shadow">
                    <h2 className="sr-only" id="profile-overview-title">
                      Profile Overview
                    </h2>
                    <div className="bg-white p-6">
                      <div className="sm:flex sm:items-center sm:justify-between">
                        <div className="sm:flex sm:space-x-5">
                          <div className="flex-shrink-0">
                            <img className="mx-auto h-20 w-20 rounded-full" src={user.imageUrl} alt="" />
                          </div>
                          <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                            <p className="text-sm font-medium text-gray-600">Hello,</p>
                            <p className="text-xl font-bold text-gray-900 sm:text-2xl">{user.name}</p>
                            <p className="text-sm font-medium text-gray-600">{user.role}</p>
                          </div>
                        </div>
                        {/* <div className="mt-5 flex justify-center sm:mt-0">
                          <Link
                            to="/settings"
                            className="flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                          >
                            View profile
                          </Link>
                        </div> */}
                      </div>
                    </div>
                    <div className="border-t border-gray-200 bg-gray-50 grid grid-cols-1 divide-y divide-gray-200 sm:grid-cols-2 sm:divide-y-0 sm:divide-x">
                        <div className="px-6 py-5 text-sm font-medium text-center">
                          <Link to="createLesson" className="text-gray-900">Create New Lesson</Link>
                        </div>
                        <div className="px-6 py-5 text-sm font-medium text-center">
                          <Link to="createAssignment" className="text-gray-900">Create New Assignment</Link>
                        </div>
                    </div>
                  </div>
                </section>

                {/* Actions panel */}
                <section aria-labelledby="quick-links-title">
                  <div className="rounded-lg bg-gray-200 shadow divide-gray-200 sm:grid sm:grid-cols-2 sm:gap-px">
                    <h2 className="sr-only" id="quick-links-title">
                      Quick links
                    </h2>
                    {this.state.cards.map((card, cardInd) => (
                      <Link to={"lessonStaff/" + card.id}
                        key={card.name}
                        className={classNames(
                          cardInd === 0 ? 'rounded-tl-lg rounded-tr-lg sm:rounded-tr-none' : '',
                          cardInd === 1 ? 'sm:rounded-tr-lg' : '',
                          cardInd === this.state.cards.length - 2 ? 'sm:rounded-bl-lg' : '',
                          cardInd === this.state.cards.length - 1 ? 'rounded-bl-lg rounded-br-lg sm:rounded-bl-none' : '',
                          'relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-cyan-500'
                        )}
                      >
                        <div className="mt-8">
                          <h3 className="text-lg font-medium">
                            <a href={card.href} className="focus:outline-none">
                              {/* Extend touch target to entire panel */}
                              <span className="absolute inset-0" aria-hidden="true" />
                              {card.name}
                            </a>
                          </h3>
                          <p className="mt-2 text-sm text-gray-500 truncate">
                            {card.body}
                          </p>
                        </div>
                        <span
                          className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
                          aria-hidden="true"
                        >
                          <ClipboardListIcon className="block h-6 w-6 text-gray-400" aria-hidden="true"/>
                        </span>
                      </Link>
                    ))}
                  </div>
                </section>
              </div>

              {/* Right column */}
              <div className="grid grid-cols-1 gap-4">

                {/* Recent Hires */}
                <section aria-labelledby="recent-hires-title">
                  <div className="rounded-lg bg-white overflow-hidden shadow">
                    <div className="p-6">
                      <h2 className="text-base font-medium text-gray-900" id="recent-hires-title">
                        Students
                      </h2>
                      <div className="flow-root mt-6">
                        <ul role="list" className="-my-5 divide-y divide-gray-200">
                          {this.state.students.map((person) => (
                            <li key={person.name} className="py-4">
                              <div className="flex items-center space-x-4">
                                <div className="flex-1 min-w-0">
                                  <p className="text-m font-medium text-gray-900 truncate">{person.name}</p>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                      {/* <div className="mt-6">
                        <a
                          href="#"
                          className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                          View all
                        </a>
                      </div> */}
                    </div>
                  </div>
                </section>
                <section aria-labelledby="add-new-student">
                  <div className="rounded-lg bg-white overflow-hidden shadow">
                    <div className="p-6">
                      <h2 className="text-base font-medium text-gray-900" id="add-new-student">
                        Add new Student
                      </h2>
                      <div className="flow-root mt-6">
                      <label
                        htmlFor="studentEmail"
                        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                      >
                      Student Email
                      </label>
                      <div className="mt-1 sm:mt-0 sm:col-span-2">
                        <div className="max-w-lg flex rounded-md shadow-sm">
                          <input
                            type="text"
                            name="studentEmail"
                            id="studentEmail"
                            autoComplete="studentEmail"
                            value={this.state.studentEmail}
                            className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                            onChange={this.handleChange}
                          />
                        </div>
                        </div>
                      <label
                      htmlFor="studentName"
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                      >
                      Student Name
                      </label>
                      <div className="mt-1 sm:mt-0 sm:col-span-2">
                        <div className="max-w-lg flex rounded-md shadow-sm">
                          <input
                            type="text"
                            name="studentName"
                            id="studentName"
                            autoComplete="studentName"
                            value={this.state.studentName}
                            className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                            onChange={this.handleChange}
                          />
                        </div>
                        </div>
                      </div>
                    </div>
                    <div className="pt-5">
                      <div className="flex justify-end">
                        <button
                          type="submit"
                          className="mx-3 mb-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          onClick={this.handleStudentSubmit}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </section>
                <section aria-labelledby="add-new-staff">
                  <div className="rounded-lg bg-white overflow-hidden shadow">
                    <div className="p-6">
                      <h2 className="text-base font-medium text-gray-900" id="add-new-staff">
                        Add new Staff
                      </h2>
                      <div className="flow-root mt-6">
                      <label
                        htmlFor="staffEmail"
                        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                      >
                      Staff Email
                      </label>
                      <div className="mt-1 sm:mt-0 sm:col-span-2">
                        <div className="max-w-lg flex rounded-md shadow-sm">
                          <input
                            type="text"
                            name="staffEmail"
                            id="staffEmail"
                            autoComplete="staffEmail"
                            value={this.state.staffEmail}
                            className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                            onChange={this.handleChange}
                          />
                        </div>
                        </div>
                      <label
                      htmlFor="staffName"
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                      >
                      Staff Name
                      </label>
                      <div className="mt-1 sm:mt-0 sm:col-span-2">
                        <div className="max-w-lg flex rounded-md shadow-sm">
                          <input
                            type="text"
                            name="staffName"
                            id="staffName"
                            autoComplete="staffName"
                            value={this.state.staffName}
                            className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                            onChange={this.handleChange}
                          />
                        </div>
                        </div>
                      </div>
                    </div>
                    <div className="pt-5">
                      <div className="flex justify-end">
                        <button
                          type="submit"
                          className="mx-3 mb-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          onClick={this.handleStaffSubmit}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </main>
        <footer>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
            <div className="border-t border-gray-200 py-8 text-sm text-gray-500 text-center sm:text-left">
              <span className="block sm:inline">&copy; 2021 Tailwind Labs Inc.</span>{' '}
              <span className="block sm:inline">All rights reserved.</span>
            </div>
          </div>
        </footer>
      </div>
    </>)
  }

  componentDidMount(){
    const token = this.context.JWT
    this.lessonRepo = new LessonRepository(token)
    this.accountRepo = new AccountsRepository(token);

    this.setState({cards: []})
    let tempCards = [];
    this.lessonRepo.getLessons().then(x =>{
      x.forEach(data =>{
        tempCards.push({name: data.title, href: "#", body: data.content, id: data.id})
      })
      this.setState({cards: tempCards})
    })

    this.setState({students: []})
    let tempStu = [];
    this.accountRepo.getStaffStudents().then(x =>{
      x.forEach(data => {
        tempStu.push({name:data.full_name})
      })
      this.setState({students: tempStu})
    })
  }
}

StaffDashboard.contextType = AppContext;

export default StaffDashboard