import { Fragment } from "react/cjs/react.production.min";
import CostSummary from "../cost-model/CostSummary";
import Sidebar from "./Sidebar";
import classes from "./ConfigLayout.module.css";

const ConfigLayout = (props) => {
    return (
        <Fragment>
            <main className={classes.main}>
                <Sidebar />
                {props.children}
                <CostSummary />
            </main>
        </Fragment>
    );
};

export default ConfigLayout;