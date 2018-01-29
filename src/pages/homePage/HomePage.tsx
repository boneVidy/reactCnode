import * as React from 'react';

import { ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
// import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import { darkBlack } from 'material-ui/styles/colors';
import { Topic, TopicItem } from '../../common/service/Topic';
import { InfiniteScroller } from 'react-iscroller';
import { RouteProps } from 'react-router';
import { Link } from 'react-router-dom';
// import IconButton from 'material-ui/IconButton';
// import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
// import IconMenu from 'material-ui/IconMenu';
// import MenuItem from 'material-ui/MenuItem';

interface HomePageState {
  topicList: TopicItem[];
}

export class HomePage extends React.Component<RouteProps, HomePageState> {
  // private _name: string;
  page = 1;
  loadedLen = 0;
  state = {
    topicList: new Array<TopicItem>()
  };
  loadMore = async () => {
    await this.getTopicList();
    return true;
  }
  async componentDidMount() {
    this.getTopicList();
  }

  getTopicList = async () => {
    try {
      const data = (await Topic.getList({ page: this.page })).map(
        (item, index) => {
          item.index = ++this.loadedLen;
          return item;
        }
      );
      this.setState({ topicList: this.state.topicList.concat(data) });
      this.page++;
    } catch (error) {
      console.error(error);
    }
  }
  // onItemClickHandler = (id: number) => {

  // }
  renderItem = (topic: TopicItem) => {
    return (
      <Link to={`/detail/${topic.id}`}>
        <ListItem
          
          key={topic.id}
          leftAvatar={
            <Avatar src={topic.author ? topic.author.avatar_url : ''} />}
          primaryText={topic.title}
          secondaryText={
            <p>
              <span style={{ color: darkBlack }}>
                {topic.author ? topic.author.loginname : ''}
              </span>{' '}
              {topic.index}
              {topic.content}
            </p>
          }
          secondaryTextLines={2}
        />
        <Divider key={topic.id + 'devider'} inset={true} />
      </Link>
    );
  }
  render() {
    const { topicList } = this.state;

    return (
      <div className="page">
        {
          topicList.length ?
          <InfiniteScroller
            itemAverageHeight={72}
            containerHeight={window.innerHeight - 72}
            items={topicList}
            itemKey={'id'}
            onEnd={this.getTopicList}
            onRenderCell={this.renderItem}
          /> : '暂无数据'
        }
       
      </div>
    );
  }
}
