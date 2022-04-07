import { useContext, React } from 'react'
import { AppContext } from './AppContext'
import Dashboard from './Dashboard'
import Login from './Login'

export default function Homepage() {
    const { user } = useContext(AppContext);
    return(
        <div>
            {(() => {
                if (typeof(user) !== 'undefined'){
                    <Dashboard />
                }
                else{
                    <Login />
                }
            })()}
        </div>
    )
}