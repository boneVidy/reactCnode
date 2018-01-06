import * as React from 'react';
import { ScrollItem, ScrollItemAfterMount } from './ScrollItem';

export interface ItemRenderProps {
    // itemHeight: number;
}
export interface InfiniteScrollComponentProps<T> {
    list: T[];
    itemHeight?: number;
    scrollHeight?: number;
    renderItem: (item: T) => React.ReactElement<Object>;
    onScrollEnd?: () => Promise<boolean> | boolean;
}
interface InfiniteScrollComponentState {
    paddingTop: number;
    paddingBottom: number;
    startIndex: number;
    endIndex: number;
    containerHeight: number | string;
    isLoading: boolean;
}

export class InfiniteScrollComponent<T> extends 
React.Component<InfiniteScrollComponentProps<T>, InfiniteScrollComponentState> {
  public state = {
        paddingTop: 0,
        paddingBottom: 0,
        visibleItems: [],
        startIndex: 0,
        endIndex: 10,
        containerHeight: 0,
        isLoading: false,
  };
  private positionMap = new Map<number, ClientRect>();
  private scrollContainer: HTMLDivElement;
  // private startIndex = 0;
  // private endIndex = 10;
  private scrollTop = 0;
  private parentHeight = 0;

  // private itemLenForRender = 3;
  private initHeight = 0;
  // componentWillMount(): void {
  // }
  componentDidMount() {
    console.log(this.scrollContainer.scrollTop);
    this.parentHeight = this.scrollContainer.offsetParent.getBoundingClientRect().height;
    let containerHeight: number;
    if (this.props.scrollHeight) {
      containerHeight = this.props.scrollHeight;
      
    } else {
      containerHeight = this.parentHeight;
    }
    this.setState({containerHeight: containerHeight});
    this.initHeight = containerHeight;
  }
  componentWillReceiveProps(nextProps: InfiniteScrollComponentProps<T>) {
    //   if (nextProps.list !== this.props.list) {
    //       this.setState({visibleItems:});
    //   }
    //   this.setState
  }
  
  up () {
    // const endPos = this.positionMap.get(this.state.endIndex);
    // console.log(endPos);
    // if (!endPos) {
    //   return;
    // }
    // const step = Math.floor((endPos!.top - this.scrollContainer.scrollTop 
    //   - this.scrollContainer.getBoundingClientRect().height) / this.props.itemHeight!);

    // const padding = Math.max((this.state.startIndex - step), 0) * this.props.itemHeight!;
    // if (step >= this.itemLenForRender) {
    //   this.setState({
    //     startIndex: Math.max(this.state.startIndex - step, 0),
    //     endIndex: Math.max(this.state.endIndex - step, 10),
    //     paddingTop: padding,
    //     paddingBottom: this.state.paddingBottom + step * this.props.itemHeight!
    //     // containerHeight: this.initHeight + padding
        
    //   });
    // }

  }
  down () {
    try {
      const startPos = this.positionMap.get(this.state.startIndex);
      const dist = this.scrollContainer.scrollTop - startPos!.top;
      if (dist >= startPos!.height) {
      // const padding = 
      this.setState({
        startIndex: this.state.startIndex + 1,
        endIndex: this.state.endIndex + 1,
        paddingTop: this.state.paddingTop + startPos!.height
      });
    }
    } catch (error) {
      console.error(this.state.startIndex);
    }
    
    // this.positionMap.get(1).top;
    // startPos.top;
    // const step = Math.floor((this.scrollContainer.scrollTop - startPos!.top) / this.props.itemHeight!);
    // // console.log(step);
    // if (step >= this.itemLenForRender) {
    //   const padding = (this.state.startIndex + step) * this.props.itemHeight!;
    //   this.setState({
    //     startIndex: this.state.startIndex + step,
    //     endIndex: this.state.endIndex + step,
    //     paddingTop: padding,
    //     paddingBottom: Math.max(this.state.paddingBottom - step * this.props.itemHeight!, 0)
        
    //     // containerHeight: this.initHeight + padding
    //   });
      // let endIndex = this.state.endIndex;
    
      // for (let i = endIndex; i <= endIndex + step; i++) {
      //   console.log('add to map');
      //   this.positionMap.set(i, {top: i * this.props.itemHeight!});
      // }
    // }
    if (this.scrollContainer.scrollHeight !== this.state.containerHeight + this.scrollContainer.scrollTop) {
      return;
    }
    this.onScrollEnd();
    // console.log('down');
    // if (this.scrollContainer.scrollTop)
  }
  scrollHandler = async (ev: {}) => {

      // ev.stopPropagation();
    //   console.log(ev);
      if (this.scrollContainer.scrollTop > this.scrollTop) {
        this.down();
      } else {
          this.up();
      }
      this.scrollTop = this.scrollContainer.scrollTop;
      
  }
  onScrollEnd () {
    
    console.log('end');
    
    if (this.state.isLoading) {
      console.log('重复到底部!!!');
      return;
    }
    if (!this.props.onScrollEnd) {
      return;
    }
    this.setState({isLoading: true});
    const result = this.props.onScrollEnd();
    if (result instanceof Promise) {
      result.then(res => res && this.setState({isLoading: false}));
      return;
    }

    this.setState({isLoading: false});
  }
  renderRows = (item: T, index: number) => {
    return this.props.renderItem(item);
  }
  afterItemMount: ScrollItemAfterMount = (index, rect) => {
    this.positionMap.set(index, rect);
    console.log(this.positionMap);
  }
  render() {
    const {paddingTop, startIndex, endIndex, containerHeight, paddingBottom} = this.state;
    const {list} = this.props;  
    const containerStyle: React.CSSProperties = {
      height: containerHeight,
       overflow: 'auto', 
      //  paddingTop,
      //  paddingBottom: paddingTop,
       boxSizing: 'content-box',
       WebkitOverflowScrolling: 'touch',
    };
    
    return (
    <div 
        className={'scroll-container'}
        ref={div => this.scrollContainer = div!}
        style={containerStyle}
        onScroll={this.scrollHandler}
    >
      <div style={{display: 'flex', width: '100%', flexDirection: 'column'}}>
        {/* <div style={{height:paddingTop}}/> */}
        <div className="scroll-run-way" style={{paddingTop: paddingTop}}>
          <div />
          {list.slice(startIndex, endIndex)
              .map((item, index) => 
                                    <ScrollItem 
                                      index={index}
                                      content={this.renderRows(item, index)}
                                      key={index}
                                      afterMount={this.afterItemMount}
                                    />
                                    )}
          <div style={{height: paddingBottom}}/>
          <div className="end-sentinel" style={endSentinelStyle}>加载中.......</div>
        </div>
      </div>
    </div>);
  }
}
const endSentinelStyle: React.CSSProperties = {
    height: 80,
    lineHeight: '80px',
    textAlign: 'center',
};