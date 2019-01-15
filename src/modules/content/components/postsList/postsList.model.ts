export type Post = {
  id: number,
  createdAt: string,    
  title: string,
  tags: string[],
  content: string,
  commentsCount: number
};

export type Meta = {
  total: number,
  start: number,
  end: number
};

export type PostResponse = {
  meta: Meta,
  content: Post[]
};
