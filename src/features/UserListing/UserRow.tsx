import moment from 'moment';

interface IUserRowProps {
    user: Record<string, any>
}

const UserRow = ({ user }: IUserRowProps) => {
    const {name, picture, login, location, dob, email, phone, cell } = user
    const { title, first, last } = name

    function clickHandler() {
        alert('test');
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
                    <strong onClick={clickHandler}>
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