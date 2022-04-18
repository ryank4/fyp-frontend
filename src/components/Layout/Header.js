import { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Header.module.css';

const Header = props => {
    return (
        <Fragment>
            <header className={classes.header}>
                <NavLink className={classes.title} to="/"><h3>Cost Model Tool</h3></NavLink>
                <NavLink activeClassName={classes.active} to="/save">Save</NavLink>
                <NavLink activeClassName={classes.active} to="/load">Load</NavLink>
                <NavLink activeClassName={classes.active} to="/view">View</NavLink>
                <NavLink activeClassName={classes.active} to="/diagram">Diagram</NavLink>
                {/* <NavLink activeClassName={classes.active} to="/login">Login</NavLink> */}
            </header>
        </Fragment>
    );
};

export default Header;