import { ReactNode } from 'react'
import ReactDOM from 'react-dom';

interface IPopupProps {
    children: ReactNode
}
const Popup = ({ children }: IPopupProps) => {
       
    return (
        <>
            {ReactDOM.createPortal(children, document.getElementById("modal-area") || document.body)}
        </>
    )
}

export default Popup;