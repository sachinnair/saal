import './styles.scss'

interface IPaginationControlsProps {
    pageNo: number,
    clickHandler: (direction: string) => void
}


const PaginationControls = ({ pageNo, clickHandler }: IPaginationControlsProps) => {
    function handleClick(buttonValue: string) {
        clickHandler(buttonValue) 
    }
    
    return (
        <div className="controls">
            <button className="controls__button" onClick={() => handleClick("prev")}>Previous</button>
            <span>Page: { pageNo }</span>
            <button className="controls__button" onClick={() => handleClick("next")}>Next</button>
        </div>
    )
}

export default PaginationControls