import CloudWatch from "./CloudWatch";
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('CloudWatch component', () => {
    test('renders CloudWatch', () => {
        render(<CloudWatch />);

        const regionElement = screen.getByText('Region');
        expect(regionElement).not.toBeNull();

        const metricsElement = screen.getByText('Metrics');
        expect(metricsElement).not.toBeNull();

        const apisElement = screen.getByText('APIs');
        expect(apisElement).not.toBeNull();

        const logsElement = screen.getByText('Logs');
        expect(logsElement).not.toBeNull();


    });
});
