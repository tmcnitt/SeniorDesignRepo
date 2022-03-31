import { AppContext } from "./AppContext.js";
import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
//https://reactrouter.com/web/example/auth-workflow
export function PrivateRoute({ children, ...rest }) {
    let auth = useContext(AppContext);
    return (
        <Route
            {...rest}
            render={({ location }) =>
                auth.user ? (
                    children
                ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: location }
                            }}
                        />
                    )
            }
        />
    );
}
