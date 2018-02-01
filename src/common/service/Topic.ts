import { Http, BaseResponse } from '../http/http';

declare type TopicCate = 'ask' | 'share' | 'job' | 'good';
export interface TopicQuery {
  page: number;
  tab?: TopicCate; // 主题分类。目前有 ask share job good
  limit?: number; // 每一页的主题数量
  mdrender?: string; // 当为 false 时，不渲染。默认为 true，渲染出现的所有 markdown 格式文本。
}

export interface TopicItem {
  index?: number;
  id: string;
  author_id: string;
  tab: TopicCate | string;
  content: string;
  title: string;
  last_reply_at: string;
  good: boolean;
  top: boolean;
  reply_count: number;
  visit_count: number;
  create_at: string;
  author: TopicAuthor;
}
export interface TopicAuthor {
  loginname: string;
  avatar_url: string;
}
export interface TopiceListReponse extends BaseResponse {
  data: TopicItem[];
}
export interface TopicDetailResponse extends BaseResponse {
  data: TopicDetail;
}
class TopicService {
  getList(query: TopicQuery): Promise<TopicItem[]> {
    const defaultQuery = {
      limit: 10,
      mdrender: 'false',
      topic: 'share'
    };

    return Http.get<TopiceListReponse>('topics', {
      ...defaultQuery,
      ...query
    }).then(res => {
      return res.data as TopicItem[];
    });
  }
 
  getDetailById (id: string) {
    return Http.get<TopicDetailResponse>(`topic/${id}`).then(res => {
      return res.data as TopicDetail;
    });
  }
}

export const Topic = new TopicService();

export interface TopicDetail extends TopicItem {
  replies: Reply[];
  is_collect: boolean;
}

export interface Reply {
  id: string;
  author: TopicAuthor;
  content: string;
  ups: string[];
  create_at: string;
  reply_id?: string;
  is_uped: boolean;
}