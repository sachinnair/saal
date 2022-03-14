import moment from 'moment';
import { useContext, useState } from 'react';
import ReactDOM from 'react-dom';
import UserContext from 'src/common/app/contexts/UserContext'

interface IUserRowProps {
    user: Record<string, any>
}

const UserRow = ({ user }: IUserRowProps) => {
    const userInstanceContext = useContext(UserContext)

    const [showLightBox, setShowLightBox] = useState(false);

    const {name, picture, login, location, dob, email, phone, cell, gender } = user
    const { title, first, last } = name


    function nameClickHandler() {
        userInstanceContext.setUser({
            gender: gender,
            email: email,
            phoneNumber: phone || cell,
            userName: login.username,
        })
    }
    }

    return (
        <>
            <div className="userrow">
                <div className="userrow__imageholder loader">
                    <div>
                        <img src={ picture.thumbnail } />
                        <div> { moment(dob.date.toString()).format('DD/MM/YYYY')  } </div>
                    </div>
                </div>
                <div className="userrow__name">
                    <strong onClick={nameClickHandler}>
                        <u>
                            {title} {first} {last}
                        </u>
                    </strong> | { login.username } 
                    <div className="userrow__information">
                        <span> <b>Addr</b>: { location.street.name } | </span>
                        <span> { location.city } | </span>
                        <span> { location.country } | </span>
                        <span> { location.postcode } </span>
                    </div>
                    <div>    
                        <div>Email: {email} </div>
                        <div>Contact: {phone?.replace(/-/g, '')} {phone && "|"} {cell?.replace(/-/g, '')} </div>
                    </div>
                </div>
                
            </div>    
        </>
    )
}

export default UserRow;