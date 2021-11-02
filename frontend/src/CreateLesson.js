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

const user = {
  name: "Whitney Francis",
  email: "whitney@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
};
const navigation = [
  { name: "Dashboard", href: "#" },
  { name: "Students", href: "#" },
  { name: "Staff", href: "#" },
];
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];
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

export default function Example() {
  return (
    <>
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <Popover className="flex justify-between h-16">
            <div className="flex px-2 lg:px-0">
              <div className="flex-shrink-0 flex items-center">
                <a href="#">
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark-blue-600.svg"
                    alt="Workflow"
                  />
                </a>
              </div>
              <nav
                aria-label="Global"
                className="hidden lg:ml-6 lg:flex lg:items-center lg:space-x-4"
              >
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="px-3 py-2 text-gray-900 text-sm font-medium"
                  >
                    {item.name}
                  </a>
                ))}
              </nav>
            </div>
            <div className="flex items-center lg:hidden">
              {/* Mobile menu button */}
              <Popover.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
                <span className="sr-only">Open main menu</span>
                <MenuIcon className="block h-6 w-6" aria-hidden="true" />
              </Popover.Button>
            </div>
            <Transition.Root as={Fragment}>
              <div className="lg:hidden">
                <Transition.Child
                  as={Fragment}
                  enter="duration-150 ease-out"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="duration-150 ease-in"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Popover.Overlay
                    className="z-20 fixed inset-0 bg-black bg-opacity-25"
                    aria-hidden="true"
                  />
                </Transition.Child>

                <Transition.Child
                  as={Fragment}
                  enter="duration-150 ease-out"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="duration-150 ease-in"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Popover.Panel
                    focus
                    className="z-30 absolute top-0 right-0 max-w-none w-full p-2 transition transform origin-top"
                  >
                    <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y divide-gray-200">
                      <div className="pt-3 pb-2">
                        <div className="flex items-center justify-between px-4">
                          <div>
                            <img
                              className="h-8 w-auto"
                              src="https://tailwindui.com/img/logos/workflow-mark-blue-600.svg"
                              alt="Workflow"
                            />
                          </div>
                          <div className="-mr-2">
                            <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
                              <span className="sr-only">Close menu</span>
                              <XIcon className="h-6 w-6" aria-hidden="true" />
                            </Popover.Button>
                          </div>
                        </div>
                        <div className="mt-3 px-2 space-y-1">
                          {navigation.map((item) => (
                            <a
                              key={item.name}
                              href={item.href}
                              className="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800"
                            >
                              {item.name}
                            </a>
                          ))}
                        </div>
                      </div>
                      <div className="pt-4 pb-2">
                        <div className="flex items-center px-5">
                          <div className="flex-shrink-0">
                            <img
                              className="h-10 w-10 rounded-full"
                              src={user.imageUrl}
                              alt=""
                            />
                          </div>
                          <div className="ml-3">
                            <div className="text-base font-medium text-gray-800">
                              {user.name}
                            </div>
                            <div className="text-sm font-medium text-gray-500">
                              {user.email}
                            </div>
                          </div>
                          <button
                            type="button"
                            className="ml-auto flex-shrink-0 bg-white p-1 text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            <span className="sr-only">View notifications</span>
                            <BellIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                        <div className="mt-3 px-2 space-y-1">
                          {userNavigation.map((item) => (
                            <a
                              key={item.name}
                              href={item.href}
                              className="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800"
                            >
                              {item.name}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Popover.Panel>
                </Transition.Child>
              </div>
            </Transition.Root>
            <div className="hidden lg:ml-4 lg:flex lg:items-center">
              <button
                type="button"
                className="flex-shrink-0 bg-white p-1 text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <span className="sr-only">View notifications</span>
                <BellIcon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Profile dropdown */}
              <Menu as="div" className="ml-4 relative flex-shrink-0">
                <div>
                  <Menu.Button className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 w-8 rounded-full"
                      src={user.imageUrl}
                      alt=""
                    />
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {userNavigation.map((item) => (
                      <Menu.Item key={item.name}>
                        {({ active }) => (
                          <a
                            href={item.href}
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
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
          </Popover>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
        <div className="flex items-center space-x-5">
          <h1 className="text-2xl font-bold text-gray-900">
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
                      htmlFor="username"
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Lesson Title
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <div className="max-w-lg flex rounded-md shadow-sm">
                        <input
                          type="text"
                          name="lesson-title"
                          id="lesson-title"
                          autoComplete="lesson-title"
                          className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
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
                        Breifly escribe the goal of the lesson.
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
                                      Assigns the lesson to all students
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
                />
                <div className="space-y-6 sm:space-y-5">
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
                </div>
              </div>
            </div>

            <div className="pt-5">
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
