import { useState, useMemo } from 'react';
import { Search, Download, Plus } from 'lucide-react';
import { initialStudents, type Student } from '@/data/students';
import { exportToExcel } from '@/utils/excelExport';
import StudentTable from '@/components/StudentTable';
import StudentForm from '@/components/StudentForm';
import ConfirmDialog from '@/components/ConfirmDialog';

/**
 * Main page: Student Manager
 * Handles all CRUD operations, search filtering, and Excel export.
 */
const Index = () => {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [deletingStudent, setDeletingStudent] = useState<Student | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter students by search term
  const filteredStudents = useMemo(() => {
    if (!searchTerm) return students;
    const term = searchTerm.toLowerCase();
    return students.filter(s => s.name.toLowerCase().includes(term) || s.email.toLowerCase().includes(term));
  }, [students, searchTerm]);

  const handleAdd = () => { setEditingStudent(null); setIsFormOpen(true); };
  const handleEdit = (student: Student) => { setEditingStudent(student); setIsFormOpen(true); };
  const handleDelete = (student: Student) => { setDeletingStudent(student); setIsConfirmOpen(true); };

  // Simulate a 1-second API call for add/edit
  const handleFormSubmit = (data: Omit<Student, 'id'>) => {
    setIsLoading(true);
    setTimeout(() => {
      if (editingStudent) {
        setStudents(prev => prev.map(s => s.id === editingStudent.id ? { ...s, ...data } : s));
      } else {
        setStudents(prev => [...prev, { ...data, id: Date.now() }]);
      }
      setIsLoading(false);
      setIsFormOpen(false);
    }, 1000);
  };

  // Simulate a 1-second API call for delete
  const confirmDelete = () => {
    setIsLoading(true);
    setTimeout(() => {
      setStudents(prev => prev.filter(s => s.id !== deletingStudent?.id));
      setIsLoading(false);
      setIsConfirmOpen(false);
      setDeletingStudent(null);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="sm:flex sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">Student Manager</h1>
            <p className="mt-1 text-sm text-muted-foreground">Manage your student records efficiently.</p>
          </div>
          <button
            onClick={handleAdd}
            className="mt-4 sm:mt-0 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add Student
          </button>
        </div>

        {/* Search & Export */}
        <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="relative flex-grow max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name or email…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full rounded-md border border-border bg-card pl-10 pr-3 h-10 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background transition-colors"
            />
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => exportToExcel(filteredStudents, 'filtered_students')}
              disabled={filteredStudents.length === 0}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Download className="h-4 w-4" /> Export Filtered
            </button>
            <button
              onClick={() => exportToExcel(students, 'all_students')}
              disabled={students.length === 0}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Download className="h-4 w-4" /> Export All
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="mt-6">
          <StudentTable students={filteredStudents} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
      </div>

      {/* Modals */}
      <StudentForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} onSubmit={handleFormSubmit} defaultValues={editingStudent} isLoading={isLoading} />
      <ConfirmDialog isOpen={isConfirmOpen} onClose={() => setIsConfirmOpen(false)} onConfirm={confirmDelete} title="Delete Student" isLoading={isLoading}>
        Are you sure you want to delete <span className="font-medium text-foreground">{deletingStudent?.name}</span>? This action cannot be undone.
      </ConfirmDialog>
    </div>
  );
};

export default Index;
