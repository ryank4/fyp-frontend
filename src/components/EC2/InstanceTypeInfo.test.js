import { render, screen } from '@testing-library/react';
import InstanceTypeInfo from './InstanceTypeInfo';

describe('InstanceTypeInfo component', () => {
    test('renders instance type info if request is successful', async () => {
        // override fetch with dummy function
        window.fetch = jest.fn();
        // simulate API request
        // reduces network problems, server issues etc. 
        window.fetch.mockResolvedValueOnce({
            json: async () => ['cpu: 1', 'gpu: 1', 'network: 5Gbs', 'memory: 4']
        });
        render(<InstanceTypeInfo />);

        // find returns a promise 
        const instanceTypeInfo = await screen.findAllByTestId('info');
        expect(instanceTypeInfo).not.toHaveLength(0);
    });
});