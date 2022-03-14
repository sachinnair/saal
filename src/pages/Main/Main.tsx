import { Route, Routes } from "react-router-dom";
import UserListing from 'src/features/UserListing';

const Main = () => {
    return (
        <Routes>
            <Route index element={<UserListing />}></Route>
        </Routes>
    )
}

export default Main;