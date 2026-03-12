import { motion, AnimatePresence } from 'framer-motion';
import type { Student } from '@/data/students';

interface StudentTableProps {
  students: Student[];
  onEdit: (student: Student) => void;
  onDelete: (student: Student) => void;
}

/**
 * Renders the student data in a clean, responsive table.
 * Uses framer-motion for row exit animations.
 */
const StudentTable = ({ students, onEdit, onDelete }: StudentTableProps) => (
  <div className="overflow-hidden rounded-lg border border-border shadow-sm">
    <table className="min-w-full divide-y divide-border">
      <thead className="bg-muted">
        <tr>
          <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-foreground sm:pl-6">Name</th>
          <th className="px-3 py-3.5 text-left text-sm font-semibold text-foreground">Email</th>
          <th className="px-3 py-3.5 text-left text-sm font-semibold text-foreground">Age</th>
          <th className="relative py-3.5 pl-3 pr-4 sm:pr-6">
            <span className="sr-only">Actions</span>
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-border bg-card">
        <AnimatePresence initial={false}>
          {students.map((student) => (
            <motion.tr
              key={student.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, x: -50, transition: { duration: 0.2 } }}
            >
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-card-foreground sm:pl-6">{student.name}</td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-muted-foreground">{student.email}</td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-muted-foreground tabular-nums">{student.age}</td>
              <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 space-x-4">
                <button onClick={() => onEdit(student)} className="text-muted-foreground hover:text-foreground transition-colors">
                  Edit
                </button>
                <button onClick={() => onDelete(student)} className="text-destructive hover:text-destructive/80 transition-colors">
                  Delete
                </button>
              </td>
            </motion.tr>
          ))}
        </AnimatePresence>
      </tbody>
    </table>
    {students.length === 0 && (
      <div className="text-center py-12 px-6 bg-card">
        <h3 className="text-lg font-medium text-card-foreground">No Students Found</h3>
        <p className="mt-1 text-sm text-muted-foreground">Try adjusting your search or add a new student.</p>
      </div>
    )}
  </div>
);

export default StudentTable;
