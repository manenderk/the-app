export interface Feed {
  id: string;
  title: string;
  description: string;
  image: string;
  user_id: string;
  organization_id: string;
  date: Date;
  active: boolean;
  feed_type: string;
}
