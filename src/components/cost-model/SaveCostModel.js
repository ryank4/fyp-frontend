import { useState } from "react";
import useHttp from "../../hooks/use-http";
import Button from "../UI/Button";

const SaveCostModel = (props) => {
    const { isLoading, error, sendRequest: saveCostModel } = useHttp();

    const printData = (obj) => {
        console.log(obj);
    };

    
    const onSaveHandler = () => {
        saveCostModel({
          url: 'http://localhost:5000/pricing/save',
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: props.costModel
        }, printData);
      };

    return (
        <Button onClick={onSaveHandler}>Save</Button>
    );
};

export default SaveCostModel;