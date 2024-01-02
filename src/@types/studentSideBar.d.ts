import { StudentType } from "./student"

export interface StudentSideBarType {
	isOpen: boolean
	onClose: () => void
	studentToBeChanged: StudentType | null
}