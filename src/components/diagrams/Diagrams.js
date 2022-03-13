import React, { useState } from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-github";
import loader from "../../assets/loader.gif";
import classes from "./Diagrams.module.css";
import useHttpDiagrams from "../../hooks/use-http-diagrams";

const Ace = () => {
    const [value, setValue] = useState("");
    const [response, setResponse] = useState("");

    const handleResponse = (res) => {
        setResponse(res);
    }

    const generate = () => {
        sendDiagramCode({
            url: 'http://localhost:5001/diagram',
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: value
        }, handleResponse);
    }

    const change = (val) => {
        setValue(val);
    }

    // array destructuring; using fetchTasks as alias for sendRequest function
    const { isLoading, error, sendRequest: sendDiagramCode } = useHttpDiagrams();
    console.log(response);
    error ? console.log(error) : console.log("none");
    // Render editor
    return (
        <div>
            <p className={classes.info}>Enter diagram source code into editor and click Generate to generate diagram.<br></br>
                Click <a href="https://diagrams.mingrammer.com/docs/getting-started/examples">here</a> for examples.
                <i>*Note: do not include imports</i><br></br>
            </p>
            <button onClick={generate}>Generate</button>
            <div className={classes.container}>
                <AceEditor
                    placeholder="Type your code here..."
                    mode="python"
                    theme="github"
                    onChange={change}
                    value={value}
                    name="UNIQUE_ID_OF_DIV"
                    editorProps={{ $blockScrolling: true }}
                    highlightActiveLine={true}
                    setOptions={{
                        showLineNumbers: true,
                        tabSize: 2
                    }}
                />
                <div className={classes.content}>
                    {isLoading && <img className={classes.loader} src={loader} />}
                    {error ? <p className={classes.error}>{error.message}</p> : <img className={classes.diagram} src={response} />}
                </div>
            </div>
        </div>
    );
}

export default Ace;
