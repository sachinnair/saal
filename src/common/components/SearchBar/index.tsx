import { ChangeEvent, useState } from "react";
import "./styles.scss"

interface ISearchBarProps {
    textOnly: boolean,
    searchTextHandler: <T>(newQuery: T) => void
}

const SearchBar = ({ textOnly, searchTextHandler }: ISearchBarProps) => {
    const [inputText, setInputText] = useState("");
    const [isValidationError, setIsValidationError] = useState(false)

    function validateInput(e: ChangeEvent<HTMLInputElement>) {
        let regexPattern = /^[a-zA-Z\s\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF]*$/g

        const newInput = e.target.value
        
        if (textOnly && newInput.match(regexPattern) === null) {
            setIsValidationError(true); 
        } else {
            setIsValidationError(false); 
        }

        setInputText(newInput);
    }

    return (
        <div className="searchbar">
            <div>
                <input className="searchbar__input" onChange={validateInput} type="text" value={inputText} />
                <button onClick={() => { searchTextHandler(inputText) }} className="searchbar__button">Search Name</button>
            </div>
            {isValidationError && <div className="searchbar__validator">
                <span>Please enter only names</span>
            </div>}
        </div>
    )
}

export default SearchBar