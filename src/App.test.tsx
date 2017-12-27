import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
describe('初始化程序', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
  
    ReactDOM.render(<App />, div);
    
  });
  it('app 是否挂在成功', () => {
    const div = document.createElement('div');
  
    ReactDOM.render(<App />, div, () => {
      setTimeout(() => {
        expect(document.getElementById('app')).toBeInstanceOf(String);
        
      }, 300)
    });
  });

  it ('sum 1 + 1 = 2', () => {
    expect(1 + 1).toBe(2);
  });
});