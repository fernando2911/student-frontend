export interface ConfirmationModalType {
	isOpen: boolean
	onClose: () => void;
	onConfirmed: () => void;
}