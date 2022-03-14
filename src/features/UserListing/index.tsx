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
    seed?: string,
    filter?: {
        name?: string
    }
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


    function searchTextHandler <T extends unknown>(newValue: T): void {
        setPageDetails(({ ...pageDetail, filter: { name: newValue }} as IPageDetails), { replace: true }!)
    }

    return (
        <>
            {status === "fetched" ? <div className="userlisting">
                {users?.length > 0 && <SearchBar textOnly={true} searchTextHandler={searchTextHandler} />}
                <Paginator pageNo={pageDetail?.page!} navigationHandler={(newPageNo: number): void =>
                    setPageDetails({ ...pageDetail, page: newPageNo }, { replace: true })
                }
                >
                    <div className="userlisting__scroll">
                        {users?.map((user: Record<string, any>) => {
                            return (<UserRow key={user.registered.date} user={user}/>)
                        })}
                    </div>



                </Paginator>
            </div> : <div className="loader">...Loading</div>}
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
