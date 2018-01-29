import {HashRouter as Router, Route } from 'react-router-dom';
import { AppTab } from '../pages/tabPage/AppTab';
import * as React from 'react';
// import { DetailPage } from '../pages/detailPage/DetailPage';
import { LazyComponent } from '../components/LazyComponent';
const asyncDetailPage = LazyComponent(async() => {
    const module = await import ('../pages/detailPage/DetailPage');
    return module.DetailPage;
});
const Entry = () => {
    return (
        <Router>
            <div>
                <Route exact={true} path="/" component={AppTab}/>
                <Route component={asyncDetailPage} path={'/detail/:id'}/>
            </div>
        </Router>
    );
};

export default Entry;