export type ApiResponse<T> = T;

export type Meta = {
  total: number,
  start: number,
  end: number
};

export type Post = {
  id?: number,
  tab?: Tab,
  createdAt?: string,
  title: string,
  tags: string[],
  content: string,
};

export type PostsPaginable = {
  meta: Meta,
  content: Post[]
};

export type Tab = {
  id: number,
  name: string
};

export type Photos = Map<string, string[]>;
