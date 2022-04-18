import { Fragment, useState } from 'react'
import { CheckCircleIcon, ClipboardCheckIcon, ClipboardListIcon, InboxIcon, MinusCircleIcon, SearchIcon } from '@heroicons/react/solid'
import React from 'react'
import { useContext, useEffect } from 'react'
import { AccountsRepository } from './api/AccountsRepository'
import { LessonRepository } from './api/LessonRepository'
import { Link, Redirect, useParams } from 'react-router-dom'
import { AppContext } from './AppContext'
import { Navbar } from './Navbar'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const StudentDashboard = () => {
  const params = useParams();
  const context = useContext(AppContext)
  const token = context.JWT
  const accountRepo = new AccountsRepository(token)
  const lessonRepo = new LessonRepository(token)
  const user = context.user

  const [cards, setCards] = useState([]);
  const [students, setStudents] = useState([])
  const [isSet, setIsSet] = useState(false)

  const datePretty = (date) => {
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

  useEffect(() => {
    let tempCards = [];
    lessonRepo.getLessons().then(x => {
      let promises = [];
      x.forEach(data => {
        promises.push(lessonRepo.getStatus(data.id).then(y => {
          tempCards.push({ name: data.title, href: `/lessonStudent/${data.id}`, body: data.content, id: data.id, date: y.due, completed: y.completed })
        }))
      })
      Promise.all(promises).then(() => {
        setCards(tempCards)
      })
    })
    let tempStu = [];
    accountRepo.getClassmates().then(x => {
      x.forEach(data => {
        tempStu.push({ name: data.full_name })
      })
      setStudents(tempStu)
    })
  }, [])

  return (
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
                  </div>
                </section>

                {/* Lessons*/}
                <section aria-labelledby="quick-links-title">
                  <div className="rounded-lg bg-gray-200 shadow divide-gray-200 sm:grid sm:grid-cols-2 sm:gap-px">
                    {cards.map((card, cardInd) => (
                      <Link to={"lessonStudent/" + card.id}
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
                          className="pointer-events-none absolute top-6 text-gray-400"
                          aria-hidden="true"
                        >
                          <span>Due: {datePretty(card.date)}</span>
                        </span>
                        <span className="absolute top-6 right-6" aria-hidden="true">
                          {card.completed ? <CheckCircleIcon className="block h-6 w-6 text-green-600" aria-hidden="true" /> : null}
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
                        Classmates
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
              </div>
            </div>
          </div>
        </main>
      </div>
    </>)
}

export default StudentDashboard