import {FolioItem} from './folio-item';
import {Client} from '../clients/client';

export class Folio {
  id: number;
  description: string;
  observation: string;
  folioItems: FolioItem[] = [];
  client: Client;
  total: number;
  createdAt: Date;
}
