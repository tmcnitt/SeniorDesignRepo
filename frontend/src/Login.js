import { LockClosedIcon } from '@heroicons/react/solid'
import React from 'react'
import { AccountsRepository } from './api/AccountsRepository'
import logo from './assets/mta.png'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom' 
import { AppContext } from './AppContext'

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      inputUser: '',
      inputPassword: '',
      scope: '',
      loginError: false,
      redirect: false,
    };
    this.accountRepo = new AccountsRepository();
    this.handleChange = this.handleChange.bind(this);
    this.handleScopeChange = this.handleScopeChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({[name]: value});
  }

  handleScopeChange(event){
    this.setState({scope: event.target.value}) 
  }

  handleLogin(event){
    //call controller
    this.accountRepo.checkLogin(this.state.inputUser, this.state.inputPassword, this.state.scope)
    .then(value => {
      this.context.setJWT(value)
      localStorage.setItem("jwt", value)

      this.accountRepo.checkToken(value).then((user) => {
        this.context.setUser(user)
        // fulfillment
          this.setState({redirect: true})
      })

     
    }, reason => {
      // rejection
      //display failed login error message
      this.setState({
        inputUser: '',
        inputPassword: '',
        scope: '',
        loginError: true
      });
    })
    event.preventDefault();
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
        {this.state.redirect &&
          <Redirect to="dashboard"></Redirect>}
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div>
              <img
                className="mx-auto h-12 w-auto"
                src={logo}
                alt="Mind the Agape"
              />
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to Mind the Agape</h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                To create an account, contact a staff member.
              </p>
            </div>
            { this.state.loginError &&
              <div className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"> 
              There was an error getting your account. Please check that your login credentials are correct. </div> }
            <form className="mt-8 space-y-6" action="#" method="POST">
              <input type="hidden" name="remember" defaultValue="true" />
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="username" className="sr-only">
                    Username
                  </label>
                  <input
                    id="inputUser"
                    name="inputUser"
                    type="text"
                    autoComplete="inputUser"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                    placeholder="Username"
                    value={this.state.inputUser}
                    onChange={this.handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="inputPassword"
                    name="inputPassword"
                    type="password"
                    autoComplete="inputPassword"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                    placeholder="Password"
                    value={this.state.inputPassword}
                    onChange={this.handleChange}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {/* <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label> */}
                  <fieldset onChange={this.handleScopeChange}>
                    <label className="ml-2 text-sm text-gray-900"><input type="radio" name="scope-option" value="student" 
                    className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded mr-1"
                    checked={this.state.scope === 'student'}/>Student</label>
                    <label className="ml-2 text-sm text-gray-900"><input type="radio" name="scope-option" value="staff" 
                    className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded mr-1"
                    checked={this.state.scope === 'staff'}/>Staff</label>
                  </fieldset>
                </div>

                <Link to="/forgot">
                  <div className="text-sm">
                    <a href="#" className="font-medium text-red-600 hover:text-red-500">
                      Forgot your password?
                    </a>
                  </div>
                </Link>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-900 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  onClick={this.handleLogin}
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <LockClosedIcon className="h-5 w-5 text-blue-600 group-hover:text-blue-500" aria-hidden="true" />
                  </span>
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    )
  }
}

Login.contextType = AppContext;


export default Login
