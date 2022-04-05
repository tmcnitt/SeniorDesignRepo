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
import { CheckCircleIcon, ClipboardCheckIcon, ClipboardListIcon, InboxIcon, LogoutIcon, MinusCircleIcon, SearchIcon } from '@heroicons/react/solid'
import { useContext, React } from 'react'
import { AccountsRepository } from './api/AccountsRepository'
import { LessonRepository } from './api/LessonRepository'
import { Link, Redirect, useHistory } from 'react-router-dom'
import { AppContext } from './AppContext'
import logo from './assets/mta.png'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export function Navbar() {
    const { user, signout } = useContext(AppContext);
    const history = useHistory();


    const settings = () => {
        history.push('/settings')
    }

    const logout = () => {
        signout()
        history.push('/login')
    }

    const userActions = [
        { name: 'Settings', cb: settings },
        { name: 'Sign out', cb: logout },
    ]

    return (
        <Popover as="header" className="pb-24 bg-gradient-to-r from-sky-800 to-cyan-600">
            {({ open }) => (
                <>
                    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                        <div className="relative flex flex-wrap items-center justify-center lg:justify-between">
                            {/* Logo, need to make it go to different dashboards */}
                            <Link to="dashboard"
                                    type="button"
                                    className="absolute left-0 py-5 flex-shrink-0 lg:static"
                                >
                                    <span className="sr-only">Workflow</span>
                                    {/* https://tailwindui.com/img/logos/workflow-mark-cyan-200.svg */}
                                    <img
                                    className="mx-auto h-12 w-auto"
                                    src={logo}
                                    alt="Mind the Agape"
                                    />
                            </Link>

                            {/* Right section on desktop */}
                            <div className="hidden lg:ml-4 lg:flex lg:items-center lg:py-5 lg:pr-0.5">
                                <p className='text-sm pr-2'>{user.user.full_name}</p>
                                
                                <Link to="inbox"
                                    type="button"
                                    className="flex-shrink-0 p-1 text-cyan-200 rounded-full hover:text-white hover:bg-white hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-white"
                                >
                                    <span className="sr-only">View notifications</span>
                                    <InboxIcon className="h-6 w-6" aria-hidden="true" />
                                </Link>


                                {/* Profile dropdown */}
                                <Menu as="div" className="ml-4 relative flex-shrink-0">
                                    <div>
                                        <Menu.Button className="bg-white rounded-full flex text-sm ring-2 ring-white ring-opacity-20 focus:outline-none focus:ring-opacity-100">
                                            <p>Menu</p>
                                        </Menu.Button>
                                    </div>
                                    <Transition
                                        as={Fragment}
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="origin-top-right z-40 absolute -right-2 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            {userActions.map((item) => (
                                                <Menu.Item key={item.name}>
                                                    {({ active }) => (
                                                        <a
                                                            onClick={item.cb}
                                                            className={classNames(
                                                                active ? 'bg-gray-100' : '',
                                                                'block px-4 py-2 text-sm text-gray-700'
                                                            )}
                                                        >
                                                            {item.name}
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                            ))}
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </Popover>
    )
}