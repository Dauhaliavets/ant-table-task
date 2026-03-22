import { makeAutoObservable } from "mobx";
import { IRecord, CreateRecordDTO, UpdateRecordDTO } from "../types";
import { v4 as uuidv4 } from "uuid";

class TableStore {
  records: IRecord[] = [];
  isLoading = false;
  isModalVisible = false;
  editingRecord: IRecord | null = null;
  searchQuery = "";

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setRecords(records: IRecord[]) {
    this.records = records;
  }

  setLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  }

  setSearchQuery(query: string) {
    this.searchQuery = query;
  }

  showModal(record: IRecord | null = null) {
    this.editingRecord = record;
    this.isModalVisible = true;
  }

  hideModal() {
    this.isModalVisible = false;
    this.editingRecord = null;
  }

  get filteredRecords() {
    if (!this.searchQuery) return this.records;

    const query = this.searchQuery.toLowerCase();
    return this.records.filter(
      (record) =>
        record.name.toLowerCase().includes(query) ||
        record.date.toLowerCase().includes(query) ||
        record.value.toString().includes(query) ||
        record.status.toLowerCase().includes(query),
    );
  }

  async fetchRecords() {
    this.setLoading(true);
    try {
      // Имитация загрузки
      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (error) {
      console.error("Failed to fetch records", error);
    } finally {
      this.setLoading(false);
    }
  }

  addRecord(dto: CreateRecordDTO) {
    const newRecord: IRecord = {
      ...dto,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.records.push(newRecord);
  }

  updateRecord(id: string, dto: UpdateRecordDTO) {
    const index = this.records.findIndex((record) => record.id === id);
    if (index !== -1) {
      const updatedRecord = {
        ...this.records[index],
        ...dto,
        updatedAt: new Date().toISOString(),
      };
      this.records[index] = updatedRecord;
    }
  }

  deleteRecord(id: string) {
    this.records = this.records.filter((record) => record.id !== id);
  }
}

export const tableStore = new TableStore();
