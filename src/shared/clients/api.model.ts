export type Meta = {
  total: number,
  start: number,
  end: number
};

export type Post = {
  id: number,
  createdAt: string,    
  title: string,
  tags: string[],
  content: string,
  commentsCount: number
};

export type PostsPaginable = {
  meta: Meta,
  content: Post[]
};

export type Tab = string;

export type Photos = Map<Tab, string[]>;

export type AuthToken = string;
