import Card from "../UI/Card";
import classes from "./Home.module.css";

const Home = () => {
    return (
        <div className={classes.home}>
            <h1>Cloud service cost model tool</h1>
            <p>Create cost models for your AWS projects. Selecting a cloud service from the sidebar on the left hand side of the screen will open it's configuration component.</p>
            <p>Use the configuration components to calculate monthly costs of onDemand cloud services.</p>
            <p>The Cost Summary on the right gives an overview of the total cost and it's breakdown by service.</p>
            <p>Save and load your cost models to easily update project running costs. </p>
            <p>Use the View component to get a detailed breakdown of the project's details.</p>
            <p>The diagram generator utilises diagrams as code to allow you to generate diagrams of your project's architecture.</p>
        </div>
    )
};

export default Home;

