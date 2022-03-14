import { createContext } from 'react';

export const blankUser = {
    gender: "",
    email: "",
    phoneNumber: "",
    userName: ""
} 

export const userInstance = {
    user: blankUser,
    setUser: (val: typeof blankUser) => {}
}

const UserContext = createContext(userInstance)

export default UserContext