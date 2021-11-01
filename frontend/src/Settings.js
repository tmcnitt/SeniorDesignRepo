import { Fragment, useState } from 'react'
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

const navigation = [
    { name: 'Home', href: '#', icon: HomeIcon },
    { name: 'Trending', href: '#', icon: FireIcon },
    { name: 'Bookmarks', href: '#', icon: BookmarkAltIcon },
    { name: 'Messages', href: '#', icon: InboxIcon },
    { name: 'Profile', href: '#', icon: UserIcon },
]
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

export default function Example() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <>
            {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-blue-gray-50">
        <body class="h-full overflow-hidden">
        ```
      */}
            <div className="h-full flex">


                <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
                    {/* Mobile top navigation */}
                    <div className="">
                        <div className="bg-gray-800 py-2 px-4 flex items-center justify-between sm:px-6">
                            <div>
                                <img
                                    className="h-8 w-auto"
                                    src="https://tailwindui.com/img/logos/workflow-mark.svg?color=white"
                                    alt="Workflow"
                                />
                            </div>
                            <div>
                                <button
                                    type="button"
                                    className="-mr-3 h-12 w-12 inline-flex items-center justify-center bg-blue-600 rounded-md text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                    onClick={() => setMobileMenuOpen(true)}
                                >
                                    <span className="sr-only">Open sidebar</span>
                                    <MenuIcon className="h-6 w-6" aria-hidden="true" />
                                </button>
                            </div>
                        </div>
                    </div>

                    <main className="flex-1 flex overflow-hidden">
                        <div className="flex-1 flex flex-col overflow-y-auto xl:overflow-hidden">
                            <div className="flex-1 flex xl:overflow-hidden">
                                {/* Main content */}
                                <div className="flex-1 xl:overflow-y-auto">
                                    <div className="max-w-3xl mx-auto py-10 px-4 sm:px-6 lg:py-12 lg:px-8">
                                        <h1 className="text-3xl font-extrabold text-blue-gray-900">Account</h1>

                                        <form className="mt-6 space-y-8 divide-y divide-y-blue-gray-200">
                                            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
                                                <div className="sm:col-span-6">
                                                    <h2 className="text-xl font-medium text-blue-gray-900">Profile</h2>
                                                    <p className="mt-1 text-sm text-blue-gray-500">
                                                        This information will be displayed publicly so be careful what you share.
                                                    </p>
                                                </div>

                                                <div className="sm:col-span-3">
                                                    <label htmlFor="first-name" className="block text-sm font-medium text-blue-gray-900">
                                                        First name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="first-name"
                                                        id="first-name"
                                                        autoComplete="given-name"
                                                        className="mt-1 block w-full border-blue-gray-300 rounded-md shadow-sm text-blue-gray-900 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                                                    />
                                                </div>

                                                <div className="sm:col-span-3">
                                                    <label htmlFor="last-name" className="block text-sm font-medium text-blue-gray-900">
                                                        Last name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="last-name"
                                                        id="last-name"
                                                        autoComplete="family-name"
                                                        className="mt-1 block w-full border-blue-gray-300 rounded-md shadow-sm text-blue-gray-900 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                                                    />
                                                </div>


                                                <div className="sm:col-span-6">
                                                    <label htmlFor="description" className="block text-sm font-medium text-blue-gray-900">
                                                        Notes
                                                    </label>
                                                    <div className="mt-1">
                                                        <textarea
                                                            id="description"
                                                            name="description"
                                                            rows={4}
                                                            className="block w-full border border-blue-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                                                            defaultValue={''}
                                                        />
                                                    </div>
                                                    <p className="mt-3 text-sm text-blue-gray-500">
                                                        Brief description for your profile.
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="pt-8 grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
                                                <div className="sm:col-span-6">
                                                    <h2 className="text-xl font-medium text-blue-gray-900">Personal Information</h2>
                                                </div>

                                                <div className="sm:col-span-3">
                                                    <label htmlFor="email-address" className="block text-sm font-medium text-blue-gray-900">
                                                        Email address
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="email-address"
                                                        id="email-address"
                                                        autoComplete="email"
                                                        className="mt-1 block w-full border-blue-gray-300 rounded-md shadow-sm text-blue-gray-900 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                                                    />
                                                </div>

                                                <div className="sm:col-span-3">
                                                    <label htmlFor="phone-number" className="block text-sm font-medium text-blue-gray-900">
                                                        Phone number
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="phone-number"
                                                        id="phone-number"
                                                        autoComplete="tel"
                                                        className="mt-1 block w-full border-blue-gray-300 rounded-md shadow-sm text-blue-gray-900 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                                                    />
                                                </div>

                                                <div className="sm:col-span-3">
                                                    <label htmlFor="country" className="block text-sm font-medium text-blue-gray-900">
                                                        Country
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="country"
                                                        id="country"
                                                        autoComplete="country"
                                                        className="mt-1 block w-full border-blue-gray-300 rounded-md shadow-sm text-blue-gray-900 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                                                    />
                                                </div>

                                                <div className="sm:col-span-3">
                                                    <label htmlFor="language" className="block text-sm font-medium text-blue-gray-900">
                                                        Language
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="language"
                                                        id="language"
                                                        className="mt-1 block w-full border-blue-gray-300 rounded-md shadow-sm text-blue-gray-900 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                                                    />
                                                </div>
                                            </div>

                                            <div className="pt-8 flex justify-end">
                                                <button
                                                    type="button"
                                                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-blue-gray-900 hover:bg-blue-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    type="submit"
                                                    className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                                >
                                                    Save
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
