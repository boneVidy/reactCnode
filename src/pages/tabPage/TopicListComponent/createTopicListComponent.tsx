import * as React from 'react';

import { ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import { darkBlack } from 'material-ui/styles/colors';
import { Topic, TopicCate, TopicItem } from '../../../common/service/Topic';
import { Link } from 'react-router-dom';

interface HomePageState {
  topicList: TopicItem[];
  scrollTop: number;
}
interface TopicListProps {}
const createTopicListComponent = (tab: TopicCate) => {
    let cachePage = 0;
    let cacheScrollTop = 0;
    let cacheLists: TopicItem[] = [];
    return class extends React.Component<TopicListProps, HomePageState> {
        state = {
            topicList: [],
            scrollTop: 0
        };
        scroller: HTMLDivElement;
        private isLoading = false;
        static clearCache () {
            cachePage = 0;
            cacheScrollTop = 0;
            cacheLists = [];
        }

        loadMore = async () => {
            await this.getTopicList();
            return true;
        }
        async componentDidMount() {
            if (cacheLists.length) {
                this.setState({ topicList: cacheLists}, () => {
                    // setTimeout(() => {
                    //     // this.scroller.scrollTop = cacheScrollTop;
                    // },         300);
                    this.scroller.scrollTo({top: cacheScrollTop});

                    // this.setState({ scrollTop: cacheScrollTop });
                });
            } else {
                cachePage = 1;
                return !this.isLoading && this.getTopicList();
            }
        }

        getTopicList = async () => {
            try {
                this.isLoading = true;
                const data = (await Topic.getList({ page: cachePage , tab}));

                const newList: TopicItem[] = [...this.state.topicList, ...data];
                this.setState({ topicList: newList });
                cacheLists = newList;
                cachePage ++;

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
            cacheScrollTop = curScrollTop;
            if (curScrollTop >= this.scroller.scrollHeight - this.scroller.offsetHeight) {
                this.getTopicList();
            }
        }

        render() {
            const { topicList } = this.state;

            return (
                <div
                     className="page scroller"
                     ref={(dom: HTMLDivElement) => this.scroller = dom}
                     onScroll={this.scrollHandler}
                >
                    <div>
                        {
                            topicList.map(this.renderItem)
                        }
                    </div>
                </div>
            );
        }
    };
};
export default createTopicListComponent;