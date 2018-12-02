export interface Account {
  id: string;
  email: string;
  password: string;
  name: string;
  photo: string; // url picture
  date: string;
  following: Array<string>; // string id account
  follower: Array<string>; // string id account
  favorites: Array<string>; // string id resto
}
