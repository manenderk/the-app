export interface Chat {
  id: string;
  channel_id: string;
  sender: string;
  receiver: string;
  text: string;
  date: Date;
}
