import * as React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './App.css';

import Entry from './routes/entry';
class App extends React.Component {
    // tslint:disable-next-line:no-empty
    componentDidMount() {}

    render() {
        return (
            <MuiThemeProvider>
                <Entry/>
            </MuiThemeProvider>
        );
    }
}

export default App;
