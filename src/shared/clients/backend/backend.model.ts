export type MetaDTO = {
  total: number,
  start: number,
  end: number
};

export type PostsDTO = {
  meta: MetaDTO,
  content: PostContentDTO[]
};

export type PostContentDTO = {
  id?: number;
  tab: TabDTO,
  createdAt?: string,
  title: string,
  content: string,
  tags: string[],
};

export type CommentDTO = {
  id: number;
  createdAt: string;
  name: string;
  email: string;
  content: string;
};

export type TabDTO = {
  id: number,
  name: string
};

export type Post = {
  id?: number;
  tabId: number,
  tags: string,
  title: string,
  content: string
};

export type SwiperDTO = Map<number, string[]>;
