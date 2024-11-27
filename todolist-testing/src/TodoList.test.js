import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import App from './App';

test('adds a new task to the list', () => {
  render(<App />);
  const inputElement = screen.getByPlaceholderText('Add a new task');
  const buttonElement = screen.getByText('Add Task');
  fireEvent.change(inputElement, { target: { value: 'New Task' } });
  fireEvent.click(buttonElement);
  const newTaskElement = screen.getByText('New Task');
  expect(newTaskElement).toBeInTheDocument();
});

test('edits an existing task', () => {
  render(<App />);
  const inputElement = screen.getByPlaceholderText('Add a new task');
  const addButton = screen.getByText('Add Task');
  fireEvent.change(inputElement, { target: { value: 'Old Task' } });
  fireEvent.click(addButton);
  const taskElement = screen.getByText('Old Task');
  expect(taskElement).toBeInTheDocument();
  fireEvent.change(inputElement, { target: { value: 'Updated Task' } });
  fireEvent.click(addButton);
  const updatedTaskElement = screen.getByText('Updated Task');
  expect(updatedTaskElement).toBeInTheDocument();
});

test('deletes a task based on id', async () => {
  render(<App />);
  const taskToBeDeleted = screen.getByText('Task to be deleted');
  const taskItem = taskToBeDeleted.closest('.task-item');
  const deleteButton = within(taskItem).getByRole('button', { name: /delete/i });
  fireEvent.click(deleteButton);
  await waitFor(() => expect(screen.queryByText('Task to be deleted')).not.toBeInTheDocument());
});

test('toggles task completion with checkbox', () => {
  render(<App />);
  const inputElement = screen.getByPlaceholderText('Add a new task');
  const addButton = screen.getByText('Add Task');
  fireEvent.change(inputElement, { target: { value: 'Task to toggle completion' } });
  fireEvent.click(addButton);
  const taskElement = screen.getByText('Task to toggle completion');
  expect(taskElement).toBeInTheDocument();
  const checkboxElement = screen.getByRole('checkbox');
  fireEvent.click(checkboxElement);
  const completedTaskElement = screen.getByText('Task to toggle completion');
  expect(completedTaskElement).toHaveClass('completed');
});

test('filters tasks correctly by completion status', () => {
  render(<App />);
  const inputElement = screen.getByPlaceholderText('Add a new task');
  const addButton = screen.getByText('Add Task');
  fireEvent.change(inputElement, { target: { value: 'Task 1' } });
  fireEvent.click(addButton);
  fireEvent.change(inputElement, { target: { value: 'Task 2' } });
  fireEvent.click(addButton);
  const filterButton = screen.getByText('Completed');
  fireEvent.click(filterButton);
  const task1Element = screen.getByText('Task 1');
  const task2Element = screen.getByText('Task 2');
  expect(task1Element).toBeInTheDocument();
  expect(task2Element).toBeInTheDocument();
});
