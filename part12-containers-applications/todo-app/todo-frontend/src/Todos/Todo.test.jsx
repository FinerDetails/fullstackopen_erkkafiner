import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Todo from './Todo'

describe('Todo', () => {
    const todo = { _id: '1', text: 'Buy milk', done: false };
    const deleteTodo = vi.fn();
    const completeTodo = vi.fn();
    
    // eslint-disable-next-line no-unused-vars
    let component;
    beforeEach(() => {
        component = render(
            <Todo todo={todo} deleteTodo={deleteTodo} completeTodo={completeTodo} />
        );
    });

    test('clicking on delete calls deleteTodo', async () => {
        const user = userEvent.setup();
        const deleteButton = component.getByText('Delete');
        await user.click(deleteButton);
        expect(deleteTodo.mock.calls).toHaveLength(1);
    });
    
    test('clicking on done calls completeTodo', async () => {
        const user = userEvent.setup();
        const doneButton = component.getByText('Set as done');
        await user.click(doneButton);
        expect(completeTodo.mock.calls).toHaveLength(1);
    });
});


