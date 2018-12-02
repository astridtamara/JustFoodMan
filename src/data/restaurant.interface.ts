export interface Restaurant {
  id: string;
  photo: string; // url picture
  name: string;
  description: string;
  telephone: string;
  openHours: string;
  address: string;
  location: string;
  coordinate: {
    latitude: number;
    longitude: number;
  };
  category: Array<string>;
}
