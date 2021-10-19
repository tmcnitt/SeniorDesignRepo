import { Fragment, useState } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import {
    ArchiveIcon as ArchiveIconSolid,
    ChevronDownIcon,
    ChevronUpIcon,
    DotsVerticalIcon,
    FolderDownloadIcon,
    PencilIcon,
    ReplyIcon,
    SearchIcon,
    UserAddIcon,
} from '@heroicons/react/solid'
import {
    ArchiveIcon as ArchiveIconOutline,
    BanIcon,
    BellIcon,
    FlagIcon,
    InboxIcon,
    MenuIcon,
    PencilAltIcon,
    UserCircleIcon,
    XIcon,
} from '@heroicons/react/outline'

const user = {
    name: 'Whitney Francis',
    email: 'whitneyfrancis@example.com',
    imageUrl:
        'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
const navigation = [
    {
        name: 'Inboxes',
        href: '#',
        children: [
            { name: 'Technical Support', href: '#' },
            { name: 'Sales', href: '#' },
            { name: 'General', href: '#' },
        ],
    },
    { name: 'Reporting', href: '#', children: [] },
    { name: 'Settings', href: '#', children: [] },
]
const sidebarNavigation = [
    { name: 'Open', href: '#', icon: InboxIcon, current: true },
    { name: 'Archive', href: '#', icon: ArchiveIconOutline, current: false },
    { name: 'Customers', href: '#', icon: UserCircleIcon, current: false },
    { name: 'Flagged', href: '#', icon: FlagIcon, current: false },
    { name: 'Spam', href: '#', icon: BanIcon, current: false },
    { name: 'Drafts', href: '#', icon: PencilAltIcon, current: false },
]
const userNavigation = [
    { name: 'Your Profile', href: '#' },
    { name: 'Sign out', href: '#' },
]
const messages = [
    {
        id: 1,
        subject: 'Velit placeat sit ducimus non sed',
        sender: 'Gloria Roberston',
        href: '#',
        date: '1d ago',
        datetime: '2021-01-27T16:35',
        preview:
            'Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum natus facere. Enim rerum eaque qui facilis. Numquam laudantium sed id dolores omnis in. Eos reiciendis deserunt maiores et accusamus quod dolor.',
    },
    {
        id: 2,
        subject: 'Nemo mollitia repudiandae adipisci explicabo optio consequatur tempora ut nihil',
        sender: 'Virginia Abshire',
        href: '#',
        date: '1d ago',
        datetime: '2021-01-27T16:35',
        preview:
            'Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum natus facere. Enim rerum eaque qui facilis. Numquam laudantium sed id dolores omnis in. Eos reiciendis deserunt maiores et accusamus quod dolor.',
    },
    {
        id: 3,
        subject: 'Doloremque reprehenderit et harum quas explicabo nulla architecto dicta voluptatibus',
        sender: 'Kyle Gulgowski',
        href: '#',
        date: '1d ago',
        datetime: '2021-01-27T16:35',
        preview:
            'Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum natus facere. Enim rerum eaque qui facilis. Numquam laudantium sed id dolores omnis in. Eos reiciendis deserunt maiores et accusamus quod dolor.',
    },
    {
        id: 4,
        subject: 'Eos sequi et aut ex impedit',
        sender: 'Hattie Haag',
        href: '#',
        date: '1d ago',
        datetime: '2021-01-27T16:35',
        preview:
            'Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum natus facere. Enim rerum eaque qui facilis. Numquam laudantium sed id dolores omnis in. Eos reiciendis deserunt maiores et accusamus quod dolor.',
    },
    {
        id: 5,
        subject: 'Quisquam veniam explicabo',
        sender: 'Wilma Glover',
        href: '#',
        date: '1d ago',
        datetime: '2021-01-27T16:35',
        preview:
            'Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum natus facere. Enim rerum eaque qui facilis. Numquam laudantium sed id dolores omnis in. Eos reiciendis deserunt maiores et accusamus quod dolor.',
    },
    {
        id: 6,
        subject: 'Est ratione molestiae modi maiores consequatur eligendi et excepturi magni',
        sender: 'Dolores Morissette',
        href: '#',
        date: '1d ago',
        datetime: '2021-01-27T16:35',
        preview:
            'Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum natus facere. Enim rerum eaque qui facilis. Numquam laudantium sed id dolores omnis in. Eos reiciendis deserunt maiores et accusamus quod dolor.',
    },
    {
        id: 7,
        subject: 'Commodi deserunt aut veniam rem ipsam',
        sender: 'Guadalupe Walsh',
        href: '#',
        date: '1d ago',
        datetime: '2021-01-27T16:35',
        preview:
            'Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum natus facere. Enim rerum eaque qui facilis. Numquam laudantium sed id dolores omnis in. Eos reiciendis deserunt maiores et accusamus quod dolor.',
    },
    {
        id: 8,
        subject: 'Illo illum aut debitis earum',
        sender: 'Jasmine Hansen',
        href: '#',
        date: '1d ago',
        datetime: '2021-01-27T16:35',
        preview:
            'Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum natus facere. Enim rerum eaque qui facilis. Numquam laudantium sed id dolores omnis in. Eos reiciendis deserunt maiores et accusamus quod dolor.',
    },
    {
        id: 9,
        subject: 'Qui dolore iste ut est cumque sed',
        sender: 'Ian Volkman',
        href: '#',
        date: '1d ago',
        datetime: '2021-01-27T16:35',
        preview:
            'Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum natus facere. Enim rerum eaque qui facilis. Numquam laudantium sed id dolores omnis in. Eos reiciendis deserunt maiores et accusamus quod dolor.',
    },
    {
        id: 10,
        subject: 'Aut sed aut illum delectus maiores laboriosam ex',
        sender: 'Rafael Klocko',
        href: '#',
        date: '1d ago',
        datetime: '2021-01-27T16:35',
        preview:
            'Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum natus facere. Enim rerum eaque qui facilis. Numquam laudantium sed id dolores omnis in. Eos reiciendis deserunt maiores et accusamus quod dolor.',
    },
]
const message = {
    subject: 'Re: New pricing for existing customers',
    sender: 'joearmstrong@example.com',
    status: 'Open',
    items: [
        {
            id: 1,
            author: 'Joe Armstrong',
            date: 'Yesterday at 7:24am',
            datetime: '2021-01-28T19:24',
            body: "<p>Thanks so much! Can't wait to try it out.</p>",
        },
        {
            id: 2,
            author: 'Monica White',
            date: 'Wednesday at 4:35pm',
            datetime: '2021-01-27T16:35',
            body: `
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Malesuada at ultricies tincidunt elit et, enim. Habitant nunc, adipiscing non fermentum, sed est a, aliquet. Lorem in vel libero vel augue aliquet dui commodo.</p>
        <p>Nec malesuada sed sit ut aliquet. Cras ac pharetra, sapien purus vitae vestibulum auctor faucibus ullamcorper. Leo quam tincidunt porttitor neque, velit sed. Tortor mauris ornare ut tellus sed aliquet amet venenatis condimentum. Convallis accumsan et nunc eleifend.</p>
        <p><strong style="font-weight: 600;">Monica White</strong><br/>Customer Service</p>
      `,
        },
        {
            id: 3,
            author: 'Joe Armstrong',
            date: 'Wednesday at 4:09pm',
            datetime: '2021-01-27T16:09',
            body: `
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Malesuada at ultricies tincidunt elit et, enim. Habitant nunc, adipiscing non fermentum, sed est a, aliquet. Lorem in vel libero vel augue aliquet dui commodo.</p>
        <p>Nec malesuada sed sit ut aliquet. Cras ac pharetra, sapien purus vitae vestibulum auctor faucibus ullamcorper. Leo quam tincidunt porttitor neque, velit sed. Tortor mauris ornare ut tellus sed aliquet amet venenatis condimentum. Convallis accumsan et nunc eleifend.</p>
        <p>– Joe</p>
      `,
        },
    ],
}

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Example() {
    const [open, setOpen] = useState(false)

    return (
        <>
            {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-100">
        <body class="h-full overflow-hidden">
        ```
      */}
            <div className="h-full flex flex-col">
                {/* Top nav*/}
                <header className="flex-shrink-0 relative h-16 lg:bg-gray-800  flex items-center">
                    {/* Logo area */}
                    <div className="absolute inset-y-0 left-0 lg:static lg:flex-shrink-0">
                        <a
                            href="#"
                            className="flex items-center justify-center h-16 w-16 bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-600 lg:w-20"
                        >
                            <img
                                className="h-8 w-auto"
                                src="https://tailwindui.com/img/logos/workflow-mark.svg?color=white"
                                alt="Workflow"
                            />
                        </a>
                    </div>

                </header>

                {/* Bottom section */}
                <div className="min-h-0 pl-2 pr-2 flex-1 flex overflow-hidden">
                    {/* Main area */}
                    <main className="min-w-0 flex-1 border-t border-gray-200 xl:flex">
                        <section
                            aria-labelledby="message-heading"
                            className="min-w-0 flex-1 h-full flex flex-col overflow-hidden xl:order-last"
                        >
                            {/* Top section */}
                            <div className="flex-shrink-0 bg-white border-b border-gray-200">
                                {/* Toolbar*/}
                                <div className="h-16 flex flex-col justify-center">
                                    <div className="px-4 sm:px-6 lg:px-8">
                                        <div className="py-3 flex justify-between">
                                            {/* Left buttons */}
                                            <div>
                                                <span className="relative z-0 inline-flex shadow-sm rounded-md sm:shadow-none sm:space-x-3">
                                                    <span className="inline-flex sm:shadow-sm">
                                                        <button
                                                            type="button"
                                                            className="relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-900 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                                                        >
                                                            <ReplyIcon className="mr-2.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                                                            <span>Reply</span>
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="hidden sm:inline-flex -ml-px relative items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-900 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                                                        >
                                                            <UserAddIcon className="mr-2.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                                                            <span>Delete</span>
                                                        </button>
                                                    </span>



                                                    <Menu as="span" className="-ml-px relative block sm:shadow-sm lg:hidden">
                                                        <div>
                                                            <Menu.Button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-900 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 sm:rounded-md sm:px-3">
                                                                <span className="sr-only sm:hidden">More</span>
                                                                <span className="hidden sm:inline">More</span>
                                                                <ChevronDownIcon
                                                                    className="h-5 w-5 text-gray-400 sm:ml-2 sm:-mr-1"
                                                                    aria-hidden="true"
                                                                />
                                                            </Menu.Button>
                                                        </div>
                                                    </Menu>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Message header */}
                            </div>

                            <div className="min-h-0 flex-1 overflow-y-auto">
                                <div className="bg-white pt-5 pb-6 shadow">
                                    <div className="px-4 sm:flex sm:justify-between sm:items-baseline sm:px-6 lg:px-8">
                                        <div className="sm:w-0 sm:flex-1">
                                            <h1 id="message-heading" className="text-lg font-medium text-gray-900">
                                                {message.subject}
                                            </h1>
                                            <p className="mt-1 text-sm text-gray-500 truncate">{message.sender}</p>
                                        </div>
                                    </div>
                                </div>
                                {/* Thread section*/}
                                <ul role="list" className="py-4 space-y-2 sm:px-6 sm:space-y-4 lg:px-8">
                                    {message.items.map((item) => (
                                        <li key={item.id} className="bg-white px-4 py-6 shadow sm:rounded-lg sm:px-6">
                                            <div className="sm:flex sm:justify-between sm:items-baseline">
                                                <h3 className="text-base font-medium">
                                                    <span className="text-gray-900">{item.author}</span>{' '}
                                                    <span className="text-gray-600">wrote</span>
                                                </h3>
                                                <p className="mt-1 text-sm text-gray-600 whitespace-nowrap sm:mt-0 sm:ml-3">
                                                    <time dateTime={item.datetime}>{item.date}</time>
                                                </p>
                                            </div>
                                            <div
                                                className="mt-4 space-y-6 text-sm text-gray-800"
                                                dangerouslySetInnerHTML={{ __html: item.body }}
                                            />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </section>

                        {/* Message list*/}
                        <aside className="hidden xl:block xl:flex-shrink-0 xl:order-first">
                            <div className="h-full relative flex flex-col w-96 border-r border-gray-200 bg-gray-100">
                                <div className="flex-shrink-0">
                                    <div className="h-16 bg-white px-6 flex flex-col justify-center">
                                        <div className="flex items-baseline space-x-3">
                                            <h2 className="text-lg font-medium text-gray-900">Inbox</h2>
                                            <p className="text-sm font-medium text-gray-500">{messages.length} messages</p>
                                        </div>
                                    </div>
                                    <div className="border-t border-b border-gray-200 bg-gray-50 px-6 py-2 text-sm font-medium text-gray-500">
                                        Sorted by date
                                    </div>
                                </div>
                                <nav aria-label="Message list" className="min-h-0 flex-1 overflow-y-auto">
                                    <ul role="list" className="border-b border-gray-200 divide-y divide-gray-200">
                                        {messages.map((message) => (
                                            <li
                                                key={message.id}
                                                className="relative bg-white py-5 px-6 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600"
                                            >
                                                <div className="flex justify-between space-x-3">
                                                    <div className="min-w-0 flex-1">
                                                        <a href={message.href} className="block focus:outline-none">
                                                            <span className="absolute inset-0" aria-hidden="true" />
                                                            <p className="text-sm font-medium text-gray-900 truncate">{message.sender}</p>
                                                            <p className="text-sm text-gray-500 truncate">{message.subject}</p>
                                                        </a>
                                                    </div>
                                                    <time
                                                        dateTime={message.datetime}
                                                        className="flex-shrink-0 whitespace-nowrap text-sm text-gray-500"
                                                    >
                                                        {message.date}
                                                    </time>
                                                </div>
                                                <div className="mt-1">
                                                    <p className="line-clamp-2 text-sm text-gray-600">{message.preview}</p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </nav>
                            </div>
                        </aside>
                    </main>
                </div>
            </div>
        </>
    )
}
