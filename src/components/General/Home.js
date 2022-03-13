import classes from "./Home.module.css";

const Home = () => {
    return (
        <div className={classes.home}>
            <h1>Cloud service cost model tool</h1>
            <p>Create cost models for your AWS projects.</p>
            <p>Save and load your cost models so that you can update on future iterations.</p>
            <p>The diagram generator utilises diagrams as code to allow you to generate diagrams of your project's architecture.</p>
        </div>
    )
};

export default Home;

