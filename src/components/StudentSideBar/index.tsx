import { Fragment, useState, useRef, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { StudentSideBarType } from '../../@types/studentSideBar'
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AddStudentType, UpdateStudentType } from '../../@types/student';
import { useStudentStore } from '../../store/useStudentStore/index.tsx';
import { User } from '../Icons/User.tsx';
import { Edit } from '../Icons/Edit.tsx';
import { STORAGE } from "../../config/globals.ts";

const studentFormSchema = z.object({
  name: z.string().nonempty('O nome é obrigatória.'),
  email: z.string()
    .nonempty('O e-mail é obrigatório.')
    .email({ message: 'E-mail inválido.' }),
  phone: z.string().nonempty('O telefone é obrigatória.'),
  address: z.string().nonempty('O endereço é obrigatória.'),
})

type StudentData = z.infer<typeof studentFormSchema>;

export function StudentSideBar({ isOpen, onClose, studentToBeChanged }: StudentSideBarType) {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const photoFolder = `${STORAGE}/students/`; 

  const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm<StudentData>({
    resolver: zodResolver(studentFormSchema)
  });

  const { addStudent, updateStudent } = useStudentStore((store) => {
    return {
      addStudent: store.add,
      updateStudent: store.update
    }
  })

  const onSubmit = (data:StudentData, action: string) => {
    if (studentToBeChanged && studentToBeChanged.id) {
      const student: UpdateStudentType = {
        ...data, photo: image || studentToBeChanged.photo, id:studentToBeChanged.id
      }  
      updateStudent(student).then(() => {
        reset(); 
        setImage(null);
        setSelectedImage(null);
        if (action === 'save') {
          onClose();
        }
      });
      return;
    }    
    const student: AddStudentType = {
      ...data, photo: image
    }   

    addStudent(student).then(() => {
      reset(); 
      setImage(null);
      if (action === 'save') {
        onClose();
      }
    });
  }

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
    setImage(file);
  };

  useEffect(() => {
    if (studentToBeChanged) {
      setValue('name', studentToBeChanged.name);
      setValue('email', studentToBeChanged.email);
      setValue('phone', studentToBeChanged.phone);
      setValue('address', studentToBeChanged.address);
      if (studentToBeChanged.photo) {
        setSelectedImage(photoFolder + studentToBeChanged.photo);
      } else {
        setSelectedImage(null);
      }
      setImage(null);
    } else {
      reset();
      setImage(null);
      setSelectedImage(null);
    }
  }, [studentToBeChanged]);

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                      <button
                        type="button"
                        className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                        onClick={onClose}
                      >
                        <span className="absolute -inset-2.5" />
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                    <div className="px-4 sm:px-6">
                      <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                        Adicionar Estudante
                      </Dialog.Title>
                    </div>
                    <div className="relative mt-6 flex-1 px-4 sm:px-6">
                        <form>
                          <div className="space-y-12">
                            <div className="border-b border-gray-900/10 pb-12">
                              <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="col-span-full">
                                  <div className="relative flex justify-center mt-7.5 mb-2.5"
                                    onMouseEnter={() => setIsHovered(true)}
                                    onMouseLeave={() => setIsHovered(false)}
                                  >
                                    {selectedImage ? (
                                      <img 
                                        src={selectedImage} 
                                        alt="Preview" 
                                        className="w-28 h-28 rounded-full object-cover cursor-pointer" 
                                        onClick={handleImageClick} 
                                      />
                                    ) : (
                                      <svg onClick={handleImageClick} className="w-28 h-28 rounded-full object-cover cursor-pointer text-gray-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <User />
                                      </svg>
                                    )}
                                    {isHovered && (
                                      <div className="absolute top-1/2 left-1/2 p-5 transform -translate-x-1/2 -translate-y-1/2 transition-opacity bg-gray-600 bg-opacity-50 rounded-full cursor-pointer">
                                        <svg onClick={handleImageClick} className="w-8 h-8 rounded-full object-cover cursor-pointer text-gray-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                          <Edit />
                                        </svg>
                                      </div>
                                    )}

                                    <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden"/>
                                    
                                  </div>
                                </div>

                                <div className="sm:col-span-4">
                                  <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Nome</label>
                                  <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                      <input 
                                        id="name"
                                        type="text" 
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        {...register('name')} 
                                      />
                                    </div>
                                    {errors.name && <span className="text-sm text-red-500">{errors.name.message}</span>}
                                  </div>
                                </div>

                                <div className="sm:col-span-4">
                                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email</label>
                                  <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                      <input 
                                        id="email" 
                                        type="text" 
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" 
                                        {...register('email')} 
                                      />
                                    </div>
                                    {errors.email && <span className="text-sm text-red-500">{errors.email.message}</span>}
                                  </div>
                                </div>

                                <div className="sm:col-span-4">
                                  <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">Telefone</label>
                                  <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                      <input 
                                        id="phone" 
                                        type="text" 
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" 
                                        {...register('phone')} 
                                      />
                                    </div>
                                    {errors.phone && <span className="text-sm text-red-500">{errors.phone.message}</span>}
                                  </div>
                                </div>

                                <div className="sm:col-span-4">
                                  <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">Endereço</label>
                                  <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                      <input 
                                        id="address" 
                                        type="text" 
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        {...register('address')} 
                                      />
                                    </div>
                                    {errors.address && <span className="text-sm text-red-500">{errors.address.message}</span>}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="mt-6 flex items-center justify-end gap-x-6">
                            <button type="button" onClick={onClose} className="text-sm font-semibold leading-6 text-gray-900">Cancelar</button>
                            <button 
                              type="button" 
                              className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                              onClick={() => handleSubmit((data) => onSubmit(data, 'save'))()}
                            >Salvar</button>
                            <button 
                              type="button" 
                              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                              onClick={() => handleSubmit((data) => onSubmit(data, 'saveAndContinue'))()}
                            >Salvar & Continuar</button>
                          </div>
                        </form>
                      </div>
                    </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}