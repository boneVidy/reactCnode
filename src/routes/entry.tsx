import {BrowserRouter as Router, Route } from 'react-router-dom';
import { AppTab } from '../pages/tabPage/AppTab';
import * as React from 'react';
// import { DetailPage } from '../pages/detailPage/DetailPage';
// import { AnimatedSwitch } from 'react-router-transition/lib/AnimatedSwitch';
import { LazyComponent } from '../components/LazyComponent';
import createBrowserHistory  from 'history/createBrowserHistory';
const history = createBrowserHistory();
const asyncDetailPage = LazyComponent(async() => {
    const module = await import ('../pages/detailPage/DetailPage');
    return module.DetailPage;
});
const Entry = () => {
    return (
        <Router {...history}>
            <div className={'page'}>
                <Route exact={true} path="/" component={AppTab}/>
                <Route component={asyncDetailPage} path={'/detail/:id'}/>
            </div>
        </Router>
    );
};

export default Entry;