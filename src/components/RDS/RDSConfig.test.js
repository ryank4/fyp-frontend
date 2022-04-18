import RDSConfig from "./RDSConfig";
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('RDSConfig component', () => {
    test('renders RDSConfig', () => {
        render(<RDSConfig />);
        
        const regionElement = screen.getByText('Region');
        expect(regionElement).not.toBeNull();

        const instanceTypeElement = screen.getByText('Instance Type');
        expect(instanceTypeElement).not.toBeNull();

        const deploymentElement = screen.getByText('Deployment option');
        expect(deploymentElement).not.toBeNull();

        const storageTypeElement = screen.getByText('Storage Type');
        expect(storageTypeElement).not.toBeNull();

        const storageAmountElement = screen.getByText('Storage Amount');
        expect(storageAmountElement).not.toBeNull();

    });
});
