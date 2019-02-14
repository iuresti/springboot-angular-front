import {Region} from './region';
import {Folio} from '../folio/folio';

export class Client {
  id: number;
  name: string;
  lastName: string;
  createdAt: string;
  email: string;
  pathImage: string;
  region: Region;
  folios: Folio[] = [];
}
