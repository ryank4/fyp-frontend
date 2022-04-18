import S3Config from "./S3Config";
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('S3Config component', () => {
    test('renders S3Config', () => {
        render(<S3Config />);

        const regionElement = screen.getByText('Region');
        expect(regionElement).not.toBeNull();

        const storageElement = screen.getByText('S3 Standard storage');
        expect(storageElement).not.toBeNull();

        const dataTransferElement = screen.getByText('Outbound Data Transfer');
        expect(dataTransferElement).not.toBeNull();

    });
});
