import { useEffect, useState } from "react"

import useQueryParams from 'src/common/hooks/useQueryParams';

import SearchBar from 'src/common/components/SearchBar'
import Paginator from 'src/common/components/Paginator'
import UserRow from './UserRow'
import useFetch from "src/common/hooks/useFetch";
import makeid from "src/common/helper/randomString";
import "./styles.scss";

export interface IPageDetails {
    page: number,
    results?: number,
    seed?: string
}

const UserListing = () => {
    const [users, setUsers] = useState([]);
    const [fetchUrl, setFetchUrl] = useState('')
    
    const [pageDetail, setPageDetails] = useQueryParams<IPageDetails>("users_list")

    useEffect(() => {    
        if(!pageDetail) {
            setPageDetails({
                page: 1,
                results: 10,
                seed: makeid(3)
            })
        } else {
            setFetchUrl(getUsersUrl(pageDetail))
        }
    }, [pageDetail])

    const [status, data] = useFetch(fetchUrl)
    
    useEffect(() => {
        setUsers(data.results)
    }, [data])

    return (
        <>
            {status === "fetched" ? <div className="userlisting">
                {users?.length > 0 && <SearchBar textOnly={true}/>}
                <Paginator pageNo={pageDetail?.page!} navigationHandler={(newPageNo: number): void =>
                    setPageDetails({ ...pageDetail, page: newPageNo }, { replace: true })
                }
                >
                    {users?.map((user: Record<string, any>) => {
                        return (<UserRow key={user.registered.date} user={user}/>)
                    })}
                </Paginator>
            </div> : <>Loading</>}
        </>
    )
}

export default UserListing

function getUsersUrl({ page, results, seed}: IPageDetails={page: 0}) {
    if (page) {
        return  `https://randomuser.me/api/?page=${page}&results=${results}&seed=${seed}`
    }

    return ''
}
