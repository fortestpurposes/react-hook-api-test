import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import MockAdapter from 'axios-mock-adapter';
import {mount, configure} from 'enzyme';
import axios from 'axios';
import { act } from "react-dom/test-utils";
import App from './App';

configure({adapter: new Adapter()});
test('renders list element', () => {
  const app = mount(<App />);
  console.log(app.debug())
  expect(app.find('.list')).toHaveLength(1);
});

const response ={
  data: {
    hits: [
      {
        objectID: 0,
        url: 'test0url',
        title: 'test0title'
      },
      {
        objectID: 1,
        url: 'test1url',
        title: 'test1title'
      },
      {
        objectID: 2,
        url: 'test2url',
        title: 'test2title'
      }
    ]
  }
}

test('check if API requests successfully done', async () => {
  const mockAPICall = new MockAdapter(axios);
  mockAPICall.onGet('https://hn.algolia.com/api/v1/search?query=hooks').reply(200, response.data)

  let component = null;
  await act(async () => {
    component = mount(<App />);
  })
  setImmediate( () => {
    component.update();
    expect(component.find('a').first().prop('href')).toEqual('test0url');
    expect(component.find('a').at(1).prop('href')).toEqual('test1url');
    expect(component.find('a').at(2).prop('href')).toEqual('test2url');
  })
});