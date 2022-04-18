import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import Sidebar from "./Sidebar";

const createRouterWrapper = (history) => ({ children }) => (
    <Router history={history}>{children}</Router>
);


describe('Sidebar component', () => {
    it('navigate to ec2 component', () => {
        // render app
        const history = createMemoryHistory();
        const result = render(<Sidebar />, { wrapper: createRouterWrapper(history) });
    
        // Interact with page
        act(() => {
            // Find the link
            const ec2Link = result.container.querySelector('#ec2Link');
    
            // Click it
            fireEvent.click(ec2Link);
        });
    
        expect(history.location.pathname).toBe('/ec2');
    });


    it('navigate to s3 component', () => {
        // render app
        const history = createMemoryHistory();
        const result = render(<Sidebar />, { wrapper: createRouterWrapper(history) });
    
        // Interact with page
        act(() => {
            // Find the link
            const s3Link = result.container.querySelector('#s3Link');
    
            // Click it
            fireEvent.click(s3Link);
        });
    
        expect(history.location.pathname).toBe('/s3');
    });

    it('navigate to elb component', () => {
        // render app
        const history = createMemoryHistory();
        const result = render(<Sidebar />, { wrapper: createRouterWrapper(history) });
    
        // Interact with page
        act(() => {
            // Find the link
            const elbLink = result.container.querySelector('#elbLink');
    
            // Click it
            fireEvent.click(elbLink);
        });
    
        expect(history.location.pathname).toBe('/elb');
    });

    it('navigate to rds component', () => {
        // render app
        const history = createMemoryHistory();
        const result = render(<Sidebar />, { wrapper: createRouterWrapper(history) });
    
        // Interact with page
        act(() => {
            // Find the link
            const rdsLink = result.container.querySelector('#rdsLink');
    
            // Click it
            fireEvent.click(rdsLink);
        });
    
        expect(history.location.pathname).toBe('/rds');
    });

    it('navigate to cloudwatch component', () => {
        // render app
        const history = createMemoryHistory();
        const result = render(<Sidebar />, { wrapper: createRouterWrapper(history) });
    
        // Interact with page
        act(() => {
            // Find the link
            const cloudwatchLink = result.container.querySelector('#cloudwatchLink');
    
            // Click it
            fireEvent.click(cloudwatchLink);
        });
    
        expect(history.location.pathname).toBe('/cloudwatch');
    });
})

