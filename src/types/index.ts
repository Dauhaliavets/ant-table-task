export interface IRecord {
  id: string;
  name: string;
  date: string;
  value: number;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export type CreateRecordDTO = Omit<IRecord, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateRecordDTO = Partial<CreateRecordDTO>;
