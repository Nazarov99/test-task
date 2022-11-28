export interface PostList {
  data: Post[];
  current_page: number;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string;
  per_page: number;
  to: number;
  total: number;
}

export interface Post {
  title: string;
  description: string;
  image: string;
}
