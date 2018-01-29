import * as  React from 'react';
import { RouteComponentProps } from 'react-router';
import { TopicDetail, Topic } from '../../common/service/Topic';
import { orange200, pink400 } from 'material-ui/styles/colors';
import ListItem from 'material-ui/List/ListItem';
import Avatar from 'material-ui/Avatar';

interface DetailPageProps extends RouteComponentProps<{id: string}> {}

interface State {
    id: string;
    topic:  TopicDetail;
}

export class DetailPage extends React.Component<DetailPageProps, State> {
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
    async componentWillMount () {
      const {match} = this.props;
      const topic = await Topic.getDetailById(match.params.id);
      this.setState({topic});

    }
    render() {
        const {  topic } = this.state;
        return(
         <div>
            {topic ? 
            <ListItem 
                disabled={true} 
                leftAvatar={
                <Avatar 
                    src={topic.author.avatar_url}
                    color={orange200} 
                    backgroundColor={pink400} 
                    size={30} 
                    style={style} 
                />}
            >
            {topic.title}
            </ListItem> : null
            }
          </div>);
    }
}
const style = {margin: 5};