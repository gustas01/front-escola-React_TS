import { IPhoto } from "./IPhoto";

export interface IStudent {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  age: number;
  weight: number;
  height: number;
  photos: IPhoto[];
}