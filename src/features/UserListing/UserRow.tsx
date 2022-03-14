interface IUserRowProps {
    user: Record<string, any>
}

const UserRow = ({ user }: IUserRowProps) => {
    const {name, img} = user
    const { title, first, last } = name
    return (
        <div>
            <span>{title} {first} {last}</span>
        </div>    
    )
}

export default UserRow; 