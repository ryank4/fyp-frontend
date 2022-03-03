import { useContext } from "react";
import CostModelContext from "../../store/cost-model-context";
import Card from "../UI/Card";
import classes from "./CostSummary.module.css";

const CostSummary = () => {
    const costModelCtx = useContext(CostModelContext);

    const { services, totalCost } = costModelCtx;

    let tableContent = [];
    let row = "";

    for (const key in services) {
        row = <tr><td>{services[key].service}</td><td>{services[key].price}</td></tr>
        tableContent.push(row)
    }

    return (
        <div className={classes.summary}>
            <h3 className={classes.total}>Total: ${totalCost.toFixed(2)}</h3>
            {services.length === 0 ? <p>No services added.</p>
                : <table>
                    <tbody>
                        <tr>
                            <th>Service</th>
                            <th>Price</th>
                        </tr>
                        {tableContent}
                    </tbody>
                </table>
            }
        </div>
    )
};

export default CostSummary;