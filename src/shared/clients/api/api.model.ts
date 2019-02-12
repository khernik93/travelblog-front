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
  content: string;
};

export type TabDTO = {
  id: number,
  name: string
};

export type SwiperDTO = Map<number, string[]>;
