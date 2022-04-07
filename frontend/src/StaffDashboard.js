import { Fragment, useState } from 'react'
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
import { useContext, useEffect } from 'react'
import { AccountsRepository } from './api/AccountsRepository'
import { LessonRepository } from './api/LessonRepository'
import {Link, Redirect, useParams} from 'react-router-dom'
import { AppContext } from './AppContext'
import { Navbar } from './Navbar'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const StaffDashboard = () => {
  const params = useParams();
  const context = useContext(AppContext)
  const token = context.JWT
  const accountRepo = new AccountsRepository(token)
  const lessonRepo = new LessonRepository(token) 
  const user = context.user

  const [studentEmail, setStudentEmail] = useState('');
  const [studentName, setStudentName] = useState('');
  const [staffEmail, setStaffEmail] = useState('');
  const [staffName, setStaffName] = useState('');
  const [cards, setCards] = useState([]);
  const [students, setStudents] = useState([])
  const [isSet, setIsSet] = useState(false)

  useEffect(() => {
    if(!isSet){
      let tempCards = [];
      lessonRepo.getLessons().then(x =>{
        x.forEach(data =>{
          tempCards.push({name: data.title, href: `/lessonStaff/${data.id}`, body: data.content, id: data.id})
        })
        setCards( tempCards)
      })
      let tempStu = [];
      accountRepo.getStaffStudents().then(x =>{
        x.forEach(data => {
          tempStu.push({name:data.full_name})
        })
        setStudents(tempStu)
        setIsSet(true)
    })}
  }, [isSet])

  const handleStudentSubmit = (event) => {
    alert(`Created account for ${studentName} with email ${studentEmail}. Default password: 123`);
    accountRepo.addStudent(studentEmail, studentName, '123');
    setStudentEmail('')
    setStudentName('')
    event.preventDefault();
  }

  const handleStaffSubmit = (event) => {
    alert(`Created account for ${staffName} with email ${staffEmail}. Default password: 123`);
    accountRepo.addStaff(staffEmail, staffName, '123');
    setStaffEmail('')
    setStaffName('')
    event.preventDefault();
  }

    return(
    <>
      <div className="min-h-full">
        <Navbar />
        <main className=" pb-8">
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
                          <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                            <p className="text-l font-medium text-gray-600">Hello,</p>
                            <p className="text-xl font-bold text-gray-900 sm:text-2xl">{user.user.full_name}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="border-t border-gray-200 bg-gray-50 grid grid-cols-1 divide-y divide-gray-200">
                        <div className="px-6 py-5 text-sm font-medium text-center">
                          <Link to="createLesson" className="text-gray-900">Create New Lesson</Link>
                        </div>
                    </div>
                  </div>
                </section>

                {/* Lessons*/}
                <section aria-labelledby="quick-links-title">
                  <div className="rounded-lg bg-gray-200 shadow divide-gray-200 sm:grid sm:grid-cols-2 sm:gap-px">
                    {cards.map((card, cardInd) => (
                      <Link to={"lessonStaff/" + card.id}
                        key={card.name}
                        className={classNames(
                          cardInd === 0 ? 'rounded-tl-lg rounded-tr-lg sm:rounded-tr-none' : '',
                          cardInd === 1 ? 'sm:rounded-tr-lg' : '',
                          cardInd === cards.length - 2 ? 'sm:rounded-bl-lg' : '',
                          cardInd === cards.length - 1 ? 'rounded-bl-lg rounded-br-lg sm:rounded-bl-none' : '',
                          'relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-cyan-500'
                        )}
                      >
                        <div className="mt-8">
                          <h3 className="text-lg font-medium truncate">
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
                {/* Students */}
                <section aria-labelledby="recent-hires-title">
                  <div className="rounded-lg bg-white overflow-hidden shadow">
                    <div className="p-6">
                      <h2 className="text-base font-medium text-gray-900" id="recent-hires-title">
                        Students
                      </h2>
                      <div className="flow-root mt-6">
                        <ul role="list" className="-my-5 divide-y divide-gray-200">
                          {students.map((person) => (
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
                            value={studentEmail}
                            className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                            onChange={(e) => setStudentEmail(e.target.value)}
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
                            value={studentName}
                            className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                            onChange={(e) => setStudentName(e.target.value)}
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
                          onClick={(e) => handleStudentSubmit(e)}
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
                            value={staffEmail}
                            className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                            onChange={(e) => setStaffEmail(e.target.value)}
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
                            value={staffName}
                            className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                            onChange={(e) => setStaffName(e.target.value)}
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
                          onClick={(e) => handleStaffSubmit(e)}
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

StaffDashboard.contextType = AppContext;

export default StaffDashboard