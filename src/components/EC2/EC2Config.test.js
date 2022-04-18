import EC2Config from "./EC2Config";
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('EC2Config component', () => {
    test('renders EC2Config', () => {
        render(<EC2Config />);

        const instanceTypeElement = screen.getByText('Instance Type');
        expect(instanceTypeElement).not.toBeNull();

        const osElement = screen.getByText('Operating System');
        expect(osElement).not.toBeNull();

        const regionElement = screen.getByText('Region');
        expect(regionElement).not.toBeNull();
    });
});
