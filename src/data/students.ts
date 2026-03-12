export interface Student {
  id: number;
  name: string;
  email: string;
  age: number;
}

export const initialStudents: Student[] = [
  { id: 1, name: "Rahul Sharma", email: "rahul.sharma@email.com", age: 22 },
  { id: 2, name: "Anita Singh", email: "anita.singh@email.com", age: 21 },
  { id: 3, name: "Priya Patel", email: "priya.patel@email.com", age: 24 },
  { id: 4, name: "Sanjay Verma", email: "sanjay.verma@email.com", age: 20 },
  { id: 5, name: "Deepika Kumar", email: "deepika.kumar@email.com", age: 23 },
];
