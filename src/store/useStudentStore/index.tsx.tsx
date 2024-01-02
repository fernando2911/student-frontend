import { create } from 'zustand'

import api from '../../services/api';
import { AddStudentType, StudentType, StudentsState, UpdateStudentType } from '../../@types/student';
import { toast } from 'react-toastify';

export const useStudentStore = create<StudentsState>((set) => {
  return {
    students: [],
    isLoading: false,

    load: async () => {
      set({ isLoading: true })

      try {
        const response = await api.get('/students')

        set({
          students: response.data,
          isLoading: false,
        })
      } catch (error) {
        console.error(error, 'here in error');
      }
      
    },

    delete: async (studentId:string) => {
      set({ isLoading: true })

      try {
        await api.delete('/students/'+studentId)

        set((state) => ({
          students: state.students.filter((student) => student.id !== studentId),
          isLoading: false,
        }));

        toast.success("Estudante removido com sucesso");
      } catch (error) {
        console.error(error, 'here in error');
      }
      
    },

    add: async (student: AddStudentType) => {
      set({ isLoading: true });
    
      const formData = new FormData();
    
      (Object.keys(student) as Array<keyof AddStudentType>).forEach(key => {
        const value = student[key];
    
        if (value !== null) {
          if (value instanceof File) {
            formData.append(key, value, value.name);
          } else {
            formData.append(key, value.toString());
          }
        }
      });
    
      try {
        const response = await api.post('/student/create', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        const fileExtension = student.photo?.name.slice(student.photo?.name.lastIndexOf('.'));

        const photo = response.data.studentId+fileExtension

        const studentAdded: StudentType = {
          ...student, photo: photo, id:response.data.studentId
        }  

        set((state) => ({
          students: [...state.students, studentAdded],
          isLoading: false,
        }));
    
        toast.success("Estudante adicionado com sucesso");
      } catch (error) {
        console.error(error, 'here in error');
        set({ isLoading: false });
      }
    },

    update: async (student: UpdateStudentType) => {
      set({ isLoading: true });
    
      const formData = new FormData();
    
      (Object.keys(student) as Array<keyof UpdateStudentType>).forEach(key => {
        const value = student[key];
    
        if (value !== null) {
          if (value instanceof File) {
            formData.append(key, value, value.name);
          } else {
            formData.append(key, value.toString());
          }
        }
      });
    
      try {
        const response = await api.post('/student/update/'+student.id, formData,
          {
            headers: {
                'Content-Type': 'multipart/form-data',
                'X-HTTP-Method-Override': 'PUT'
            }
          }
        );

        let studentUpdated: StudentType

        if (student.photo instanceof File) {
          const fileExtension = student.photo?.name.slice(student.photo?.name.lastIndexOf('.'));

          const photo = student.id+fileExtension

          studentUpdated = {
            ...student, photo: photo, id: student.id
          } 
        } else {
          studentUpdated = {
            ...student, photo: student.photo, id: student.id
          } 
        }

        set((state) => ({
          students: state.students.map(s => s.id === studentUpdated.id ? { ...s, ...studentUpdated } : s),
          isLoading: false,
        }));
    
        toast.success("Estudante atualizado com sucesso");
      } catch (error) {
        console.error(error);
        set({ isLoading: false });
      }
    }
  }
})
