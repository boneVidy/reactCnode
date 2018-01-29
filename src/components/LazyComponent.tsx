import * as React from 'react';
import { ReactNode } from 'react';
import NotFoundComponent from './NotFoundComponent';
import { AppTab } from '../pages/tabPage/AppTab';

interface State {
    // tslint:disable-next-line:no-any
    c: ReactNode;
}
// tslint:disable-next-line:no-any
export type AsyncLoadComponent = () => Promise < any >;

export function LazyComponent(asyncComponent: AsyncLoadComponent) {
    return class extends React.Component <{},
    State > {
        constructor(props: {}) {
            super(props);
            console.log(props, 'lazy');
            this.state = {
                c: <div>loading</div>
            };
        }
        async componentDidMount() {
            try {
                const AsyncComponent = await asyncComponent();
                console.dir(AsyncComponent, NotFoundComponent, AppTab);
                // console.log(<AsyncComponent {...this.props} />);
                this.setState({c: <AsyncComponent {...this.props} />});
            } catch (error) {
                this.setState({c: <NotFoundComponent/>});
                console.dir(error);
            }

        }
        render() {
            const {c: C} = this.state;
            return C;
        }
    };
}