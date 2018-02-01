import * as React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import './App.css';

import Entry from './routes/entry';
import { deepPurple500, deepPurple900 } from 'material-ui/styles/colors';

const vidyTheme = getMuiTheme({
    tabs: {
        textColor: '#fff',
        backgroundColor: deepPurple500
    },
    inkBar:{
        backgroundColor: deepPurple900
    }
});
class App extends React.Component {
    // tslint:disable-next-line:no-empty
    componentDidMount() {}

    render() {
        return (
            <MuiThemeProvider muiTheme={Object.assign(getMuiTheme(lightBaseTheme), vidyTheme)}>
                <Entry/>
            </MuiThemeProvider>
        );
    }
}

export default App;
