import { Fragment } from 'react';

//import mealsImage from '../../assets/meals.jpg';
import classes from './Header.module.css';
import HeaderButton from './HeaderButton';

const Header = props => {
    return (
        <Fragment>
            <header className={classes.header}>
                <h1>Cost Model Tool</h1>
                <HeaderButton onClick={props.onShowCostModel}/>
            </header>
            {/* <div className={classes['main-image']}>
                <img src={mealsImage} alt="A table full of delicious food!"/>
            </div> */}
        </Fragment>
    );
};

export default Header;