import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/useAuthStore';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect, useState } from 'react';

const signinFormSchema = z.object({
  email: z
    .string()
    .nonempty('O e-mail é obrigatório.')
    .email({ message: 'E-mail inválido.' }),
  password: z.string().nonempty('A senha é obrigatória.'),
})

type LoginData = z.infer<typeof signinFormSchema>;

export function SignInForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginData>({
    resolver: zodResolver(signinFormSchema)
  });

  const [hasError, setHasError] = useState(false);
  const responseWithErrors = useAuthStore(state => state.responseWithErrors)

  const login = useAuthStore(state => state.login);
  const navigate = useNavigate();

  useEffect(() => {
    setHasError(responseWithErrors)
  }, [responseWithErrors]);

  const onSubmit = async (data:LoginData) => {
    await login(data);
    const storedToken = sessionStorage.getItem('token');
    if (storedToken) {
        navigate('/estudantes');
    } 
  };

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6" action="#" method="POST"
    >
      {hasError && (
        <span className="flex w-full justify-center text-sm text-red-500">
          Credenciais Inválidas
        </span>
      )}
      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
            E-mail
          </label>
        </div>
        <div className="mt-2">
          <input
            id="email"
            type="email"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            {...register('email')}
          />
          {errors.email && <span className="text-sm text-red-500">{errors.email.message}</span>}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
            Senha
          </label>
        </div>
        <div className="mt-2">
          <input
            id="password"
            type="password"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            {...register('password')}
          />
          {errors.password && <span className="text-sm text-red-500">{errors.password.message}</span>}
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Login
        </button>
      </div>
    </form>
  )
}
