/**
 *
 * @author vidy[Of2732号]
 * company qianmi.com
 * Date 2018-02-01
 *
 */
import * as React from 'react';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import { Reply } from '../../../common/service/Topic';
import Avatar from 'material-ui/Avatar';
import { ContentComponent } from '../ContentComponent/ContentComponent';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { grey400 } from 'material-ui/styles/colors';
import Card from 'material-ui/Card/Card';

interface ReplyListState {
}

interface ReplyListProps {
    list: Reply [];
}
const iconButtonElement = (
    <IconButton
        touch={true}
        tooltip="more"
        tooltipPosition="bottom-left"
    >
        <MoreVertIcon color={grey400} />
    </IconButton>
);
const rightIconMenu = (
    <IconMenu iconButtonElement={iconButtonElement}>
        <MenuItem>回复</MenuItem>
        <MenuItem>点赞</MenuItem>
        {/*<MenuItem>Delete</MenuItem>*/}
    </IconMenu>
);
export class ReplyList extends React.Component <ReplyListProps, ReplyListState> {
    state = {};

    constructor(Props: ReplyListProps) {
        super(Props);
    }

    // componentDidMount() {
    //
    // }

    render() {
        const { list } = this.props;
        return (
            <Card>
                <List>
                    <Subheader>回复{list.length}</Subheader>
                    <Divider  inset={false} />
                    {list.map(item => {
                        return [<ListItem
                                    key={item.id}
                                    leftAvatar={<Avatar src={item.author.avatar_url}/>}
                                    rightIconButton={rightIconMenu}
                                    primaryText={item.author.loginname}
                                    secondaryText={<ContentComponent html={item.content}/>}
                        />,
                            <Divider key={item.id + 'border'}  inset={true} />
                        ];
                    })}

                </List>
            </Card>);
    }
}