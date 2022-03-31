import React, { useState } from "react";
import axios from "axios";
import { AccountsRepository } from "./api/AccountsRepository";

export const AppContext = React.createContext("app");

export function useProvideAppContext() {
    const ec2_url = "http://ec2-54-176-1-242.us-west-1.compute.amazonaws.com";

    //Change to false if running local docker instance
    const ec2 = true;

    const baseURL = ec2 ? ec2_url : "http://localhost";

    const [JWT, setJWT] = useState(null);
    const [user, setUser] = useState(null);
    const [setup, setSetup] = useState(false);

    const signout = () => {
        localStorage.setItem('jwt', "")
    }

    return {
        user,
        setUser,

        JWT,
        setJWT,

        baseURL,

        setup,
        setSetup,

        signout
    }
}

export function setupLogin(context) {
    let stored = localStorage.getItem('jwt')
    if (stored) {
        context.setJWT(stored)

        let repo = new AccountsRepository()
        repo.checkToken(stored) 
        .then((res) => {
            context.setUser(res)
            context.setSetup(true);
        }).catch(() => {
            context.setSetup(true);
        })
    } else {
        context.setSetup(true);
    }
}