import { fireEvent, render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import TableRow from '../components/table-row';

it('Render TableRow component and match snapshot', () => {
  const data = { id: 'abc', name: 'Demo' };
  const component = renderer.create(<TableRow data={data} />);
  let tree = component.toJSON();
  console.log(tree.props);
  expect(tree).toMatchSnapshot();
});

it('Renders rows from data and onValidate function', () => {
  const data = { id: 'abc', name: 'Demo' };
  const onValidateMock = jest.fn();

  render(<TableRow data={data} onValidate={onValidateMock} />);

  expect(screen.getByText('abc')).toBeInTheDocument();
  expect(screen.getByText('Demo')).toBeInTheDocument();

  const button = screen.getByRole('button');
  fireEvent.click(button);

  expect(onValidateMock).toHaveBeenCalled();
});
