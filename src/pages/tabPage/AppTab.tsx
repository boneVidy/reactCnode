import * as React from 'react';
import { Tabs, Tab } from 'material-ui';
import MapsPersonPin from 'material-ui/svg-icons/maps/person-pin';
import FontIcon from 'material-ui/FontIcon';
import SwipeableViews from 'react-swipeable-views';
import './AppTab.css';
import { HomePage } from '../homePage/HomePage';
const styles: React.CSSProperties = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400
  },
  slide: {
    padding: 10
  }
};

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
        <SwipeableViews 
          style={{height: '100%'}}
          className={'tab-content'}
          index={this.state.slideIndex}
          onChangeIndex={this.handleChange}
        >
          <div className={'tab-panel'}>
            <HomePage/>
          </div>
          <div className={'tab-panel'} style={styles.slide}>slide n°2</div>
          <div className={'tab-panel'} style={styles.slide}>slide n°3</div>
        </SwipeableViews>
        <Tabs onChange={this.handleChange} value={slideIndex}>
          <Tab
            icon={
              <FontIcon className="muidocs-icon-action-home">Home</FontIcon>
            }
            label="RECENTS"
            value={0}
          />
          <Tab
            icon={<FontIcon className="material-icons">favorite</FontIcon>}
            label="FAVORITES"
            value={1}
          />
          2
          <Tab icon={<MapsPersonPin />} label="NEARBY" value={2} />
          3
        </Tabs>
      </div>
    );
  }
}
