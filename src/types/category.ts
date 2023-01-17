import { User } from './user';

export interface Category {
  id: number;
  title: string;
  icon: string;
  owner: User
}
