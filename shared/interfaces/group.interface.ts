import { BaseGroup } from './base-group.interface';
import { BaseEntity } from './base-entity.interface';

export interface Group<T> extends BaseGroup, BaseEntity {
  content: T[];
}
