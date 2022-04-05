import { useContext, React } from 'react'
import { AppContext } from './AppContext'
import StaffDash from './StaffDashboard'
import StudentDash from './StudentDash'

export default function Dashboard() {
    const { user } = useContext(AppContext);
    return(
        <div>
            {user.user_type === 'staff' ? (
                <StaffDash />
            ) : user.user_type === 'student' ? (
                <StudentDash />
            ) : null}
        </div>
    )
}