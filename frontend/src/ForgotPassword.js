import { LockClosedIcon } from '@heroicons/react/solid'
import React from 'react'
import logo from './assets/mta.png'
import { Link } from 'react-router-dom'

//can update this page later when we decide what to do about a forgotten password
class ForgotPassword extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        {/*
          This example requires updating your template:

          ```
          <html class="h-full bg-gray-50">
          <body class="h-full">
          ```
        */}
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div>
              <img
                className="mx-auto h-12 w-auto"
                src={logo}
                alt="Mind the Agape"
              />
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Forgot Password</h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                If you have forgotten your password, please contact a system administrator.
              </p>
            </div>
            <div className="mt-8 space-y-6">
              <Link to="/login">
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-900 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <LockClosedIcon className="h-5 w-5 text-blue-600 group-hover:text-blue-500" aria-hidden="true" />
                  </span>
                  Return to login
                </button>
              </Link>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default ForgotPassword