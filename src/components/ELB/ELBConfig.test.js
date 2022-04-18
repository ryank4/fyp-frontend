import ELBConfig from "./ELBConfig";
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('ELBConfig component', () => {
    test('renders ELBConfig', () => {
        render(<ELBConfig />);
        
        const regionElement = screen.getByText('Region');
        expect(regionElement).not.toBeNull();

        const tcpElement = screen.getByText('TCP Traffic');
        expect(tcpElement).not.toBeNull();

        const udpElement = screen.getByText('UDP Traffic');
        expect(udpElement).not.toBeNull();

        const tlsElement = screen.getByText('TLS Traffic');
        expect(tlsElement).not.toBeNull();

    });
});
