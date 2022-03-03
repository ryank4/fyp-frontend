import { Fragment } from 'react';
import { NavLink } from 'react-router-dom';

//import mealsImage from '../../assets/meals.jpg';
import classes from './Header.module.css';
import HeaderButton from './HeaderButton';
import HeaderLoadButton from './HeaderLoadButton';

const Header = props => {
    return (
        <Fragment>
            <header className={classes.header}>
                <h1>Cost Model Tool</h1>
                <NavLink activeClassName={classes.active} to="/save">Save</NavLink>
                <NavLink activeClassName={classes.active} to="/load">Load</NavLink>
                <NavLink activeClassName={classes.active} to="/view">View</NavLink>
                <NavLink activeClassName={classes.active} to="/diagram">Diagram</NavLink>
                <NavLink activeClassName={classes.active} to="/login">Login</NavLink>
            </header>
        </Fragment>
    );
};

export default Header;