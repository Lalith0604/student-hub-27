import * as XLSX from 'xlsx';
import type { Student } from '@/data/students';

/**
 * Exports an array of student objects to an Excel (.xlsx) file.
 * Uses SheetJS to generate and trigger the download.
 */
export const exportToExcel = (data: Student[], fileName: string) => {
  const exportData = data.map(({ id, ...rest }) => rest);
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(exportData);
  XLSX.utils.book_append_sheet(wb, ws, "Students");
  XLSX.writeFile(wb, `${fileName}.xlsx`);
};
