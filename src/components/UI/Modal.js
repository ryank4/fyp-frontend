import { Fragment } from "react";
import ReactDOM from "react-dom";
import Button from "./Button";
import Card from "./Card";
import classes from './Modal.module.css'


const Backdrop = props => {
    return <div className={classes.backdrop} onClick={props.onConfirm}></div>
}

const ModalOverlay = props => {
    let content = []
    content.push(<h3>{props.message?.name}</h3>)
    for (const key in props.message?.serviceDetails) {
        for (const k in props.message?.serviceDetails[key]) {
            content.push(<ul>
                <li>{k + ": " + props.message?.serviceDetails[key][k]}</li>
            </ul>)
        }
    }
    content.push(<h3>{props.message?.totalCost}</h3>)

    return (
        <Card className={classes.modal}>
            <header className={classes.header}>
                <h2>{props.title}</h2>
            </header>
            <div className={classes.content}>
                {content}
            </div>
            <footer className={classes.actions}>
                <Button onClick={props.onConfirm}>OK</Button>
            </footer>
        </Card>
    )
}

const Modal = props => {
    return (
        <Fragment>
            {ReactDOM.createPortal(
                <Backdrop onConfirm={props.onConfirm} />,
                document.getElementById('backdrop-root')
            )}
            {ReactDOM.createPortal(
                <ModalOverlay title={props.title} message={props.message} onConfirm={props.onConfirm} />,
                document.getElementById('overlay-root')
            )}
        </Fragment>
    )
}

export default Modal;