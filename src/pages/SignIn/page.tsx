import { useEffect } from "react";
import { SignInForm } from "../../components/SignInForm";
import { useNavigate  } from "react-router-dom";
import logo from '../../assets/logo.png'

export default function SignIn() {
	const navigate = useNavigate();

  useEffect(() => {
    const storedToken = sessionStorage.getItem('token');

    if (storedToken) {
        navigate('/estudantes');
    } else {
      navigate('/login');
    }
  }, [navigate]);

	return (
		<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-sm mt-28">
				<img
					className="mx-auto h-18 w-auto"
					src={logo}
					alt="Your Company"
				/>
			</div>

			<div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
				<SignInForm />
			</div>
		</div>
	)
}