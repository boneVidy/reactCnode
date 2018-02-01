import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { TopicDetail, Topic } from '../../common/service/Topic';
// import { orange200 } from 'material-ui/styles/colors';
// import ListItem from 'material-ui/List/ListItem';
// import Avatar from 'material-ui/Avatar';
import Card from 'material-ui/Card/Card';
import { ContentComponent } from './ContentComponent/ContentComponent';
import { ReplyList } from './ReplyComponent/ReplyList';
import CardHeader from 'material-ui/Card/CardHeader';
import Divider from "material-ui/Divider";

interface DetailPageProps extends RouteComponentProps <{
    id: string
}> {
}

interface State {
    id: string;
    topic: TopicDetail;
}

export class DetailPage extends React.Component <DetailPageProps,
    State> {
    state = {
        id: '',
        topic: {
            id: '',
            author_id: '',
            tab: 'ask',
            content: '',
            title: '',
            last_reply_at: '',
            good: false,
            top: false,
            reply_count: 0,
            visit_count: 0,
            create_at: '',
            author: {
                loginname: '',
                avatar_url: ''
            },
            replies: [],
            is_collect: false
        }
    };
    constructor(props: DetailPageProps) {
        super(props);
    }

    async componentWillMount() {
        const {match} = this.props;
        const topic = await Topic.getDetailById(match.params.id);
        this.setState({topic});

    }

    render() {
        const {topic} = this.state;
        return (

            <div className={'page auto-scroll'}>
                {topic
                    ? [<Card key={'topic-content'}>
                        <CardHeader
                            title={topic.title}
                            subtitle={topic.author.loginname}
                            avatar={topic.author.avatar_url}
                        />
                        <Divider  inset={false} />
                        <ContentComponent html={topic.content} className={'padding-left padding-right'} />
                        </Card>,
                        <ReplyList key={'topic-replies'} list={topic.replies}/>]

                    : null
                }
            </div>
        );
    }
}

// const style = {
//     margin: 5
// };