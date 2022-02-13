import React from "react";

const CostModelContext = React.createContext({
    name: "",
    services: [],
    totalCost: 0,
    addService: () => {},
    removeService: () => {},
    addName: () => {},
    clearCostModel: () => {}
});

export default CostModelContext;
