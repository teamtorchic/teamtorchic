import React from 'react';
import renderer from 'react-test-renderer';
import Submit from '../submit';


it('renders correctly', () => {
  const submit = renderer
    .create(<Submit>Submit</Submit>)
    .toJSON();
  expect(submit).toMatchSnapshot();
});