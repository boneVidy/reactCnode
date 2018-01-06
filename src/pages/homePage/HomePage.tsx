import * as React from 'react';

import {  ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
// import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import { darkBlack } from 'material-ui/styles/colors';
import { Topic, TopicItem } from '../../common/service/Topic';
import {
  InfiniteScrollComponent,
  InfiniteScrollComponentProps
} from '../../vidyComponents/InfiniteScroller/InfiniteScrollComponent';

// import IconButton from 'material-ui/IconButton';
// import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
// import IconMenu from 'material-ui/IconMenu';
// import MenuItem from 'material-ui/MenuItem';

interface HomePageState {
  topicList: TopicItem[];
}
const Scroller = function (props: InfiniteScrollComponentProps<TopicItem>) {
  return (
  <InfiniteScrollComponent
    {...props}
  />
  );
};
export class HomePage extends React.Component<{}, HomePageState> {
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
      const data = (await Topic.getList({ page: this.page })).map((item, index) => {
        item.index = ++this.loadedLen;
        return item;
       });
      this.setState({ topicList: this.state.topicList.concat(data) });
      this.page++;
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const { topicList } = this.state;

    return (
      <div className="page">
        <Scroller
            list={topicList}
            onScrollEnd={this.loadMore}
            itemHeight={88}
            renderItem={(topic: TopicItem) => {
              return (
                <div key={topic.id}>
                  <ListItem
                    key={topic.id}
                    leftAvatar={<Avatar src={topic.author ? topic.author.avatar_url : ''} />}
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
                </div>
              );
            }}
        /> 
        {/* <List style={{overflow: 'hidden'}}>
           
        </List> */}
      </div>);
  }
}
// (topic: TopicItem) => {
//   return (
//     // tslint:disable-next-line:whitespace
//     <div>
//       // tslint:disable-next-line:no-unused-expression
//       <ListItem
//         key={topic.id}
//         leftAvatar={
//           <Avatar src={topic.author ? topic.author.avatar_url : ''} />}
//         primaryText={topic.title}
//         secondaryText={
//           <p>
//             <span style={{ color: darkBlack }}>
//               {topic.author ? topic.author.loginname : ''}
//             </span>{' '}
//             --
//             {topic.content}
//           </p>
//         }
//         secondaryTextLines={2}
//       />
//       <Divider key={topic.id + 'devider'} inset={true} />;
//     // tslint:disable-next-line:jsx-alignment
//     <div/>
//   );
// }}
// />
// </div>
// );
// }