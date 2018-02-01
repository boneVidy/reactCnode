import * as React from 'react';

import { ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
// import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import { darkBlack } from 'material-ui/styles/colors';
import { Topic, TopicItem } from '../../common/service/Topic';
// import { InfiniteScroller } from 'react-iscroller';
import { RouteProps } from 'react-router';
import { Link } from 'react-router-dom';

interface HomePageState {
  topicList: TopicItem[];
  scrollTop: number;
}

export class HomePage extends React.Component<RouteProps, HomePageState> {
  static cachePage = 0;
  static cacheLists: TopicItem[] = [];
  static cacheScrollTop = 0;
  state = {
    topicList: [],
    scrollTop: 0
  };
  scroller: HTMLDivElement;
  private isLoading = false;

    loadMore = async () => {
    await this.getTopicList();
    return true;
  }
  async componentDidMount() {
      if (HomePage.cacheLists.length) {
        this.setState({ topicList: HomePage.cacheLists}, () => {
            // setTimeout(() => {
            //     // this.scroller.scrollTop = HomePage.cacheScrollTop;
            // },         300);
            this.scroller.scrollTo({top: HomePage.cacheScrollTop});

            // this.setState({ scrollTop: HomePage.cacheScrollTop });
        });
      } else {
        HomePage.cachePage = 1;
        return !this.isLoading && this.getTopicList();
      }
  }

  getTopicList = async () => {
    try {
      this.isLoading = true;
      const data = (await Topic.getList({ page: HomePage.cachePage }));

      const newList: TopicItem[] = [...this.state.topicList, ...data];
      this.setState({ topicList: newList });
      HomePage.cacheLists = newList;
      HomePage.cachePage ++;

    } catch (error) {
      console.error(error);
    } finally {
        this.isLoading = false;
    }
  }
  // onItemClickHandler = (id: number) => {

  // }
  renderItem = (topic: TopicItem) => {
    return (
      <Link key={topic.id}  to={`/detail/${topic.id}`}>
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
  scrollHandler: React.UIEventHandler<HTMLDivElement> = (ev: React.UIEvent<HTMLDivElement>) => {
      const curScrollTop = ev.nativeEvent!.srcElement!.scrollTop;
      console.log(HomePage.cacheScrollTop = curScrollTop);
      console.log(curScrollTop, this.scroller.scrollHeight);
      if (curScrollTop >= this.scroller.scrollHeight - this.scroller.offsetHeight) {
          this.getTopicList();
      }
  }

  render() {
    const { topicList } = this.state;

    return (
      <div className="page scroller" ref={(dom: HTMLDivElement) => this.scroller = dom} onScroll={this.scrollHandler}>
          <div>
              {
                  topicList.map(this.renderItem)
              }
          </div>
        {/*{*/}
          {/*topicList.length ?*/}
          {/*<InfiniteScroller*/}
            {/*onScroll={this.scrollHandler}*/}
            {/*initialScrollTop={scrollTop}*/}
            {/*itemAverageHeight={72}*/}
            {/*containerHeight={window.innerHeight - 72}*/}
            {/*items={topicList}*/}

            {/*itemKey={'id'}*/}
            {/*onEnd={this.getTopicList}*/}
            {/*onRenderCell={this.renderItem}*/}
          {/*/> : '暂无数据'*/}
        {/*}*/}

      </div>
    );
  }

    // private scrollHandler(dom: HTMLDivElement) {
    //     HomePage.cacheScrollTop = dom.scrollTop;
    //     console.log(HomePage.cacheScrollTop, dom.scrollTop);
    // }
}
