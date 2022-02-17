import classes from './HeaderButton.module.css';

const HeaderLoadButton = props => {
    return (
        <button className={classes.button} onClick={props.onClick}>
            Load
        </button>
    );
};

export default HeaderLoadButton;