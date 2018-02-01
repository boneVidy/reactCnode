import * as React from 'react';
import { Tabs, Tab } from 'material-ui';
import SwipeableViews from 'react-swipeable-views';
import './AppTab.css';
import createTopicListComponent from './TopicListComponent/createTopicListComponent';
const styles: React.CSSProperties = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400
  },
  slide: {
    paddingLeft: 10,
    paddingRight: 10,
  }
};
const AllTopicList = createTopicListComponent('');
const ShareTopicList = createTopicListComponent('share');
const GoodTopicList = createTopicListComponent('good');
const AskTopicList = createTopicListComponent('ask');
export class AppTab extends React.Component<{}, {}> {
  state = {
    slideIndex: 0
  };
  handleChange = (value: number) => {
    this.setState({
      slideIndex: value
    });
  }
  render() {
    const { slideIndex } = this.state;
    return (
      <div className={'tab-container'}>
          <Tabs onChange={this.handleChange} value={slideIndex}>
              <Tab
                  label="全部"
                  value={0}
              />
              <Tab
                  label="精华"
                  value={1}
              />
              <Tab
                  label="分享"
                  value={2}
              />
              <Tab
                  label="问答"
                  value={3}
              />
          </Tabs>
        <SwipeableViews 
          style={{height: '100%'}}
          className={'tab-content'}
          index={this.state.slideIndex}
          onChangeIndex={this.handleChange}
        >
          <div className={'tab-panel'} style={styles.slide}>
            <AllTopicList/>
          </div>
          <div className={'tab-panel'} style={styles.slide}>
              <GoodTopicList/>
          </div>
          <div className={'tab-panel'} style={styles.slide}><ShareTopicList/></div>
          <div className={'tab-panel'} style={styles.slide}><AskTopicList/></div>
        </SwipeableViews>

      </div>
    );
  }
}
