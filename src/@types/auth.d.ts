export interface Credentials {
	email: string
	password: string
}

export interface AuthState {
	responseWithErrors: boolean
	login: (credentials: Credentials) => Promise<void>;
	logout: () => void;
}


