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
  tab: TopicCate;
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
class TopicService {
  getList(query: TopicQuery): Promise<TopicItem[]> {
    const defaultQuery = {
      limit: 20,
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
}

export const Topic = new TopicService();
