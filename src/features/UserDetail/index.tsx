import { useContext } from 'react'
import UserContext, { blankUser } from 'src/common/app/contexts/UserContext'
import './styles.scss'

const UserDetail = () => {
    const userDetails = useContext(UserContext)
    
    const { gender, email, userName, phoneNumber } = userDetails.user

    function clickHandler() {
        userDetails.setUser(blankUser)
    }

    return (<>
        <div className="loader userdetail__overlay">
            <div className="userdetail__infocard">
                <div> User: <strong>{userName}</strong> </div>
                <div> Gender: {gender} </div>
                <div><strong> Email: {email} </strong></div>
                <div> Contact Number: {phoneNumber} </div>
            </div>
            <button onClick={clickHandler} >Close</button>
        </div>
    </>)
}

export default UserDetail