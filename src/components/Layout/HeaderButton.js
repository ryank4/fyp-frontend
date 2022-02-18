import { useContext, useEffect, useState } from 'react';

import CostModelContext from '../../store/cost-model-context';
import classes from './HeaderButton.module.css';

const HeaderButton = props => {
    const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
   const costModelCtx = useContext(CostModelContext);

   const { services } = costModelCtx;


    const totalCost = services.reduce((currentCost, service) => {
        return currentCost + service.price;
    }, 0);

    const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`;

    useEffect(() => {
        if (costModelCtx.services.length === 0){
            return;
        }
        setBtnIsHighlighted(true);

        const timer = setTimeout(() => {
            setBtnIsHighlighted(false);
        }, 300);

        return () => {
            clearTimeout(timer);
        };
    }, [services]);

    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span>Total:</span>
            <span className={classes.badge}>
                {totalCost.toFixed(2)}
            </span>
        </button>
    );
};

export default HeaderButton;