import { useEffect, useState } from "react";
import { useNavigate  } from "react-router-dom";
import { Header } from "../../components/Header";
import { useStudentStore } from '../../store/useStudentStore/index.tsx';
import { StudentType } from "../../@types/student";
import { Trash } from '../../components/Icons/Trash';
import { Edit } from '../../components/Icons/Edit';
import { ConfirmationModal } from '../../components/ConfirmationModal';
import { StudentSideBar } from "../../components/StudentSideBar/index.tsx";
import { STORAGE } from "../../config/globals.ts";


export default function Students() {
  const navigate = useNavigate();

  const [isOpenConfirmationModal, setIsOpenConfirmationModal] = useState(false);
  const [isOpenSideBar, setIsOpenSideBar] = useState(false);
  const [studentIdRemoved, setStudentIdRemoved] = useState('');
  const [studentToBeChanged, setStudentToBeChanged] = useState<StudentType | null>(null);

  const photoFolder = `${STORAGE}/students/`;

  useEffect(() => {
      const storedToken = sessionStorage.getItem('token');

      if (storedToken) {
        navigate('/estudantes');
      } else {
        navigate('/login');
      }
  }, []);

  const { students, loadStudent, deleteStudent } = useStudentStore((store) => {
    return {
      students: store.students,
      loadStudent: store.load,
      deleteStudent: store.delete
    }
  })

  const onOpenConfirmationModal = (studentId:string) => {
    setIsOpenConfirmationModal(true)
    setStudentIdRemoved(studentId)
  }

  const onCloseConfirmationModal = () => {
    setIsOpenConfirmationModal(false)
  }

  const onConfirmed = async () => {
    deleteStudent(studentIdRemoved);
    onCloseConfirmationModal();
    loadStudent();
  }

  const onOpenSideBar = (student:StudentType | null) => {
    setStudentToBeChanged(student)
    setIsOpenSideBar(true)
  }

  const onCloseSideBar = () => {
    setIsOpenSideBar(false)
  }

  useEffect(() => {
    loadStudent()
  }, [])

  return (
    <>
      <div className="min-h-full">
        <Header />
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-between">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Estudantes</h1>
              <button
                className="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={() => onOpenSideBar(null)}
              >
                Adicionar
              </button>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 p-4">
          <ul role="list" className="divide-y divide-gray-100">
            {students?.map((student:StudentType) => (
              <li key={student.email} className="flex justify-between">
                <div className="flex justify-between gap-x-6 py-5 sm:w-11/12 lg:w-11/12 md:w-11/12">
                  <div className="flex min-w-0 gap-x-4">
                    <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={photoFolder+student.photo} alt="" />
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-6 text-gray-900">{student.name}</p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">{student.email}</p>
                    </div>
                  </div>
                  <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end md:pr-5">
                    <p className="text-sm leading-6 text-gray-900">{student.phone}</p>
                    <p className="mt-1 text-xs leading-5 text-gray-500">{student.address}</p>
                  </div>
                </div>
                <div className="sm:flex sm:flex-col sm:items-end sm:w-2/12 py-6 lg:w-1/12 md:w-1/12">
                  <div className="flex flex-shrink-0 gap-4">
                    <a className="cursor-pointer" onClick={() => onOpenSideBar(student)} title="Editar usuário">
                      <svg className="h-5 w-5 flex-shrink-0 text-gray-800" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <Edit />
                      </svg>
                    </a>
                    <a className="cursor-pointer" onClick={() => onOpenConfirmationModal(student.id)} title="Remover usuário">
                      <svg className="h-5 w-5 flex-shrink-0 text-gray-800" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <Trash />
                      </svg>
                    </a>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          </div>
        </main>
        <ConfirmationModal isOpen={isOpenConfirmationModal} onClose={onCloseConfirmationModal} onConfirmed={onConfirmed}/>
        <StudentSideBar isOpen={isOpenSideBar} onClose={onCloseSideBar} studentToBeChanged={studentToBeChanged}/>
      </div>
    </>
  )
}