import { Fragment, useState, useContext, React } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {
    BellIcon,
    BookmarkAltIcon,
    CashIcon,
    CogIcon,
    FireIcon,
    HomeIcon,
    InboxIcon,
    KeyIcon,
    MenuIcon,
    PhotographIcon,
    SearchCircleIcon,
    UserIcon,
    ViewGridAddIcon,
    XIcon,
} from '@heroicons/react/outline'
import { ChevronLeftIcon } from '@heroicons/react/solid'
import { AppContext } from './AppContext'
import { Navbar } from './Navbar'
import { AccountsRepository } from "./api/AccountsRepository"
import { Redirect, Link } from 'react-router-dom' 

const subNavigation = [
    {
        name: 'Account',
        description: 'Ullamcorper id at suspendisse nec id volutpat vestibulum enim. Interdum blandit.',
        href: '#',
        icon: CogIcon,
        current: true,
    },
    {
        name: 'Notifications',
        description: 'Enim, nullam mi vel et libero urna lectus enim. Et sed in maecenas tellus.',
        href: '#',
        icon: BellIcon,
        current: false,
    },
    {
        name: 'Security',
        description: 'Semper accumsan massa vel volutpat massa. Non turpis ut nulla aliquet turpis.',
        href: '#',
        icon: KeyIcon,
        current: false,
    },
    {
        name: 'Appearance',
        description: 'Magna nulla id sed ornare ipsum eget. Massa eget porttitor suscipit consequat.',
        href: '#',
        icon: PhotographIcon,
        current: false,
    },
    {
        name: 'Billing',
        description: 'Orci aliquam arcu egestas turpis cursus. Lectus faucibus netus dui auctor mauris.',
        href: '#',
        icon: CashIcon,
        current: false,
    },
    {
        name: 'Integrations',
        description: 'Nisi, elit volutpat odio urna quis arcu faucibus dui. Mauris adipiscing pellentesque.',
        href: '#',
        icon: ViewGridAddIcon,
        current: false,
    },
    {
        name: 'Additional Resources',
        description: 'Quis viverra netus donec ut auctor fringilla facilisis. Nunc sit donec cursus sit quis et.',
        href: '#',
        icon: SearchCircleIcon,
        current: false,
    },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Settings() {
    const context = useContext(AppContext)
    const token = context.JWT
    const user = context.user
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [full_name, set_full_name] = useState(user.user.full_name)
    const [email, set_email] = useState(user.user.email)
    const [password, set_password] = useState(user.user.password)
    const [success, set_success] = useState(false)
    const accountRepo = new AccountsRepository(token);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (full_name === "" || email === "") {
          alert("Please fill out full name and email fields")
          return;
        }
        accountRepo.changeSettings(full_name, email, password, user.user_type).then(value => {
          alert("Settings changed successfully")
          set_success(true)
        })
      }

    return (
        <>
            {success &&
            <Redirect to="dashboard"></Redirect>}
            <div className="h-full flex">  
                <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
                    <Navbar />
                    <main className="flex-1 flex overflow-hidden">
                        <div className="flex-1 flex flex-col overflow-y-auto xl:overflow-hidden">
                            <div className="flex-1 flex xl:overflow-hidden">
                                {/* Main content */}
                                <div className="flex-1 xl:overflow-y-auto">
                                    <div className="max-w-3xl mx-auto py-1 px-4 sm:px-6 lg:py-1 lg:px-8">
                                        <h1 className="text-3xl font-extrabold text-blue-gray-900">Account information</h1>

                                        <form className="mt-6 space-y-8 divide-y divide-y-blue-gray-200">
                                            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">

                                                <div className="sm:col-span-full">
                                                    <label htmlFor="full_name" className="block text-sm font-medium text-blue-gray-900">
                                                        Full name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={full_name}
                                                        required
                                                        name="full_name"
                                                        id="full_name"
                                                        onChange={e => set_full_name(e.target.value)}
                                                        className="mt-1 block w-full border-blue-gray-300 rounded-md shadow-sm text-blue-gray-900 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                                                    />
                                                </div>

                                                <div className="sm:col-span-full">
                                                    <label htmlFor="email" className="block text-sm font-medium text-blue-gray-900">
                                                        Email
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={email}
                                                        required
                                                        name="email"
                                                        id="email"
                                                        onChange={e => set_email(e.target.value)}
                                                        className="mt-1 block w-full border-blue-gray-300 rounded-md shadow-sm text-blue-gray-900 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                                                    />
                                                </div>

                                                <div className="sm:col-span-6">
                                                    <p className="mt-1 text-sm font-medium text-blue-gray-900">
                                                        This is a {user.user_type} account.
                                                    </p>
                                                </div>

                                                <div className="sm:col-span-full">
                                                    <label htmlFor="password" className="block text-sm font-medium text-blue-gray-900">
                                                        Change password
                                                    </label>
                                                    <input
                                                        type="password"
                                                        value={password}
                                                        name="password"
                                                        id="password"
                                                        onChange={e => set_password(e.target.value)}
                                                        className="mt-1 block w-full border-blue-gray-300 rounded-md shadow-sm text-blue-gray-900 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                                                    />
                                                </div>
                                            </div>

                                            <div className="pt-8 flex justify-end">
                                                <Link
                                                    to="/dashboard"
                                                    className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                                >
                                                    Cancel
                                                </Link>
                                                <button
                                                    type="submit"
                                                    onClick={handleSubmit}
                                                    className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                                >
                                                    Save changes
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}