import Diagrams from "./Diagrams";
import { render, screen } from '@testing-library/react';

describe('Diagrams component', () => {
    test('renders Diagrams', () => {
        render(<Diagrams />);
        
        const regionElement = screen.getByText(/Enter diagram source code/i, {exact:false});
        expect(regionElement).not.toBeNull();

        const tcpElement = screen.getByRole('button', {name:'Generate'})
        expect(tcpElement).not.toBeNull();

    });
});
