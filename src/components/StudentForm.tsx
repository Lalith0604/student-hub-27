import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingSpinner from './LoadingSpinner';
import type { Student } from '@/data/students';

interface StudentFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Student, 'id'>) => void;
  defaultValues: Student | null;
  isLoading: boolean;
}

/**
 * Modal form for adding or editing a student.
 * Uses react-hook-form for validation.
 */
const StudentForm = ({ isOpen, onClose, onSubmit, defaultValues, isLoading }: StudentFormProps) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Omit<Student, 'id'>>();
  const isEditing = !!defaultValues;

  useEffect(() => {
    if (isOpen) reset(defaultValues || { name: '', email: '', age: undefined as unknown as number });
  }, [isOpen, defaultValues, reset]);

  const handleFormSubmit = (data: Omit<Student, 'id'>) => {
    onSubmit({ ...data, age: Number(data.age) });
  };

  const inputClass = (hasError: boolean) =>
    `mt-1 block w-full rounded-md border bg-secondary/50 text-foreground placeholder:text-muted-foreground shadow-sm h-10 px-3 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-card ${hasError ? 'border-destructive' : 'border-border'}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-40 flex items-center justify-center bg-foreground/60"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-lg rounded-lg bg-card p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-semibold text-card-foreground">
              {isEditing ? 'Edit Student' : 'Add New Student'}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {isEditing ? 'Update the details for this student.' : 'Fill in the details to add a new student.'}
            </p>

            <form onSubmit={handleSubmit(handleFormSubmit)} className="mt-6 space-y-4">
              {/* Name field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground">Name</label>
                <input id="name" type="text" {...register('name', { required: 'Name is required' })} className={inputClass(!!errors.name)} />
                {errors.name && <p className="mt-1 text-sm text-destructive">{errors.name.message}</p>}
              </div>

              {/* Email field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground">Email</label>
                <input id="email" type="email" {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email format' } })} className={inputClass(!!errors.email)} />
                {errors.email && <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>}
              </div>

              {/* Age field */}
              <div>
                <label htmlFor="age" className="block text-sm font-medium text-foreground">Age</label>
                <input id="age" type="number" {...register('age', { required: 'Age is required', min: { value: 5, message: 'Age must be at least 5' }, max: { value: 100, message: 'Age must be at most 100' } })} className={inputClass(!!errors.age)} />
                {errors.age && <p className="mt-1 text-sm text-destructive">{errors.age.message}</p>}
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={onClose} disabled={isLoading} className="rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground hover:bg-secondary/80 transition-colors disabled:opacity-50">
                  Cancel
                </button>
                <button type="submit" disabled={isLoading} className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 min-w-[120px]">
                  {isLoading ? <LoadingSpinner /> : (isEditing ? 'Save Changes' : 'Add Student')}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StudentForm;
