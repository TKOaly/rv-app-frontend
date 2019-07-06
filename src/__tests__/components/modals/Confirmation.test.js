import { Confirmation } from '../../../components/modals/Confirmation';
import React from 'react';
import renderer from 'react-test-renderer';

describe('<Confirmation />', () => {
    it('should match snapshot', () => {
        const cmpnt = renderer
            .create(<Confirmation />, {
                createNodeMock: () => {
                    return {
                        focus: () => {}
                    };
                }
            })
            .toJSON();
        expect(cmpnt).toMatchSnapshot();
    });
});

