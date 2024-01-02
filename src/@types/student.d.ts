export interface StudentType {
	id: string
	name: string
	email: string
	phone: string
	address: string
	photo: string
}

export interface AddStudentType {
	name: string
	email: string
	phone: string
	address: string
	photo: File | null
}

export interface UpdateStudentType {
	id: string
	name: string
	email: string
	phone: string
	address: string
	photo: File | string
}

export interface StudentsState {
	students: Student[]
	isLoading?: boolean
  
	load: () => Promise<void>
	delete: (studentId: string) => Promise<void>
	add: (student: AddStudentType) => Promise<void>
	update: (student: UpdateStudentType) => Promise<void>
}