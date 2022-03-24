import Card from "../UI/Card";
import classes from "./Home.module.css";

const Home = () => {
    return (
        <div className={classes.home}>
            <h1>Cloud service cost model tool</h1>
            <p>Create cost models for your AWS projects.</p>
            <p>Use the configuration components to calculate monthly costs of onDemand cloud services.</p>
            <p>The Cost Summary gives an overview of the total cost and it's breakdown by service.</p>
            <p>Save and load your cost models to easily update project running costs if requirements change. </p>
            <p>The diagram generator utilises diagrams as code to allow you to generate diagrams of your project's architecture.</p>
        </div>
    )
};

export default Home;

