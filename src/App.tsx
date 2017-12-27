import * as React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './App.css';
import { AppTab } from './pages/AppTab';

class App extends React.Component {
  // tslint:disable-next-line:no-empty
  componentDidMount() {}

  render() {
    return (
      <MuiThemeProvider>
        <AppTab />
      </MuiThemeProvider>
    );
  }
}

export default App;
