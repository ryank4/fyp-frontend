import { useReducer } from "react";
import { act } from "react-dom/cjs/react-dom-test-utils.production.min";

import CostModelContext from "./cost-model-context";

const defaultCostModelState = {
    name: '',
    services: [],
    totalCost: 0
};

const costModelReducer = (state, action) => {
    if (action.type === 'ADD_SERVICE') {
        // concat returns new array - better than editing old array in memory
        // const updatedItems = state.items.concat(action.item);
        const updatedTotalCost = state.totalCost + action.service.price;
        const existingCostModelServiceIndex = state.services.findIndex(service => service.id === action.service.id);
        const existingCostModelService = state.services[existingCostModelServiceIndex];

        let updatedServices;

        if (existingCostModelService) {
            const updatedService = {
                ...existingCostModelService,
                price: +existingCostModelService.price + action.service.price
            }
            updatedServices = [...state.services];
            updatedServices[existingCostModelServiceIndex] = updatedService;
        }
        else {
            updatedServices = state.services.concat(action.service);
        }

        return {
            services: updatedServices,
            totalCost: updatedTotalCost
        };
    }

    if (action.type === 'REMOVE_SERVICE'){
        const existingServieIndex = state.services.findIndex(service => service.id === action.id); 
        const existingService = state.services[existingServieIndex];
        const updatedTotalcost = state.totalCost - existingService.price;
        let updatedServices;

        if(existingService.amount === 1){
            updatedServices = state.services.filter(service => service.id !== action.id);
        }
        else{
            const updatedService = { ...existingService, amount: existingService.amount - 1}
            updatedServices = [...state.services];
            updatedServices[existingServieIndex] = updatedService;
        }

        return {
            services: updatedServices,
            totalCost: updatedTotalcost
        }
    }

    if(action.type === 'CLEAR'){
        return defaultCostModelState;
    }

    if(action.type === 'ADD_NAME'){
        return {
            name: action.name,
            services: state.services,
            totalCost: state.totalCost
        };
    }

    return defaultCostModelState;
}

const CostModelProvider = props => {

    const [costModelState, dispatchCostModelAction] = useReducer(costModelReducer, defaultCostModelState);

    const addServiceHandler = (service) => {
        // forward service to reducer 
        dispatchCostModelAction({ type: 'ADD_SERVICE', service: service });
    };

    const removeServiceHandler = (id) => {
        dispatchCostModelAction({ type: 'REMOVE_ITEM', id: id });
    };

    const addNameHandler = (name) => {
        dispatchCostModelAction({ type: 'ADD_NAME', name: name });
    };

    const clearCostModelHandler = () => {
        dispatchCostModelAction({ type: 'CLEAR' });
    };

    const costModelContext = {
        name: costModelState.name,
        services: costModelState.services,
        totalCost: costModelState.totalCost,
        addService: addServiceHandler,
        removeService: removeServiceHandler,
        addName: addNameHandler,
        clearCostModel: clearCostModelHandler
    };

    return (
        <CostModelContext.Provider value={costModelContext}>
            {props.children}
        </CostModelContext.Provider>
    );
};

export default CostModelProvider;
