import * as React from 'react';
import './contentComponent.css';
interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    html: string;
}

export class ContentComponent extends React.Component < Props, {} > {
    render() {
        return (
        <div
            className={`content-component ${this.props.className}`}
            dangerouslySetInnerHTML={{
            __html: this.props.html
            }}
        />
    );
    }
}