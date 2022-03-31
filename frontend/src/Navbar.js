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
                            {/* Logo */}
                            <div className="absolute left-0 py-5 flex-shrink-0 lg:static">
                                <a href="#">
                                    <span className="sr-only">Workflow</span>
                                    {/* https://tailwindui.com/img/logos/workflow-mark-cyan-200.svg */}
                                    <svg className="h-8 w-auto" fill="none" viewBox="0 0 35 32" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            fill="#A5F3FC"
                                            d="M15.258 26.865a4.043 4.043 0 01-1.133 2.917A4.006 4.006 0 0111.253 31a3.992 3.992 0 01-2.872-1.218 4.028 4.028 0 01-1.133-2.917c.009-.698.2-1.382.557-1.981.356-.6.863-1.094 1.47-1.433-.024.109.09-.055 0 0l1.86-1.652a8.495 8.495 0 002.304-5.793c0-2.926-1.711-5.901-4.17-7.457.094.055-.036-.094 0 0A3.952 3.952 0 017.8 7.116a3.975 3.975 0 01-.557-1.98 4.042 4.042 0 011.133-2.918A4.006 4.006 0 0111.247 1a3.99 3.99 0 012.872 1.218 4.025 4.025 0 011.133 2.917 8.521 8.521 0 002.347 5.832l.817.8c.326.285.668.551 1.024.798.621.33 1.142.826 1.504 1.431a3.902 3.902 0 01-1.504 5.442c.033-.067-.063.036 0 0a8.968 8.968 0 00-3.024 3.183 9.016 9.016 0 00-1.158 4.244zM19.741 5.123c0 .796.235 1.575.676 2.237a4.01 4.01 0 001.798 1.482 3.99 3.99 0 004.366-.873 4.042 4.042 0 00.869-4.386 4.02 4.02 0 00-1.476-1.806 3.994 3.994 0 00-5.058.501 4.038 4.038 0 00-1.175 2.845zM23.748 22.84c-.792 0-1.567.236-2.226.678a4.021 4.021 0 00-1.476 1.806 4.042 4.042 0 00.869 4.387 3.99 3.99 0 004.366.873A4.01 4.01 0 0027.08 29.1a4.039 4.039 0 00-.5-5.082 4 4 0 00-2.832-1.18zM34 15.994c0-.796-.235-1.574-.675-2.236a4.01 4.01 0 00-1.798-1.483 3.99 3.99 0 00-4.367.873 4.042 4.042 0 00-.869 4.387 4.02 4.02 0 001.476 1.806 3.993 3.993 0 002.226.678 4.003 4.003 0 002.832-1.18A4.04 4.04 0 0034 15.993z M5.007 11.969c-.793 0-1.567.236-2.226.678a4.021 4.021 0 00-1.476 1.807 4.042 4.042 0 00.869 4.386 4.001 4.001 0 004.366.873 4.011 4.011 0 001.798-1.483 4.038 4.038 0 00-.5-5.08 4.004 4.004 0 00-2.831-1.181z"
                                        />
                                    </svg>
                                </a>
                            </div>

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