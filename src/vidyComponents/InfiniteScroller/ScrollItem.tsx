import * as React from 'react';
export interface ScrollItemProps  {
    key?: number | string;
    index: number;
    // renderItem: () => React.ReactElement<Object>;
    content?: React.ReactNode;
    afterMount: ScrollItemAfterMount;
}
export type ScrollItemAfterMount = (index: number, boundrect: ClientRect) => void;
export class ScrollItem extends React.Component<ScrollItemProps, {}> {
    private dom: HTMLDivElement;
    componentDidMount() {
      const {index, afterMount} = this.props;
      const boundrect = this.dom.getBoundingClientRect();
      afterMount(index, boundrect);
    }
    render() {
        const {content} = this.props;
        
        return <div ref={dom => this.dom = dom!}>{content}</div>;
    }
}