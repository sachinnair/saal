import { ReactNode } from "react"
import PaginationControls from './PaginationControls'

interface IPaginatorProps {
    children: ReactNode,
    pageNo: number,
    navigationHandler: (pageNo: number) => void
}

const Paginator = ({ children, navigationHandler, pageNo }: IPaginatorProps) => {

    const navigationListener = (direction: string) => {
        if (direction === "prev" && pageNo > 1) {
            pageNo -= 1;
        } else if (direction === "next") {
            pageNo += 1;
        }

        navigationHandler(pageNo)
    }

    return (
        <div className="paginator">
            <div className="paginator__holder">
                <PaginationControls clickHandler={navigationListener} pageNo={pageNo}/>
            </div>
            {children}
            <div className="paginator__holder">
                <PaginationControls clickHandler={navigationListener} pageNo={pageNo}/>
            </div>
        </div>
    )
}
export default Paginator;