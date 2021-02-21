import React from 'react'; 
import renderer from 'react-test-renderer';
import { fireEvent, render, cleanup } from '@testing-library/react';

import Input from '../input'; 
import TodoContext from '../../../../contexts/todo.context';

afterEach(cleanup);

test('renders correctly', () => {
    const { queryByTestId, queryByPlaceholderText } = render(
        <TodoContext.Provider>
            <Input />
        </TodoContext.Provider>
    );
    expect((queryByTestId("Input--test"))).toBeInTheDocument();
    expect(queryByPlaceholderText('Please enter todo here')).toBeTruthy();

});

describe('on input change', () => {
    it('changes value correctly', () => {
        const { getByTestId } = render(
            <TodoContext.Provider>
                <Input />
            </TodoContext.Provider>
        )

        const todoInput = getByTestId("Input--box__test");
        
        fireEvent.change(todoInput, { target: { value : 'test' } });

        expect(todoInput).toHaveValue('test');
    });

    it('matches changed value to the state', () => {
        const tree = renderer.create(
            <TodoContext.Provider>
                <Input />
            </TodoContext.Provider>
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});