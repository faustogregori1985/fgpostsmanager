export interface PostType {
  id: string;
  title: any;
  content: any;
  image_url: any;
  updated_at?: string;
  created_at?: string;
  long: any;
  lat: any;
}

export interface Payload {
  id?: string;
  title: string;
  content: string;
  lat: string;
  long: string;
  image_url: string;
}
