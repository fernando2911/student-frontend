import { useEffect } from "react";
import { useNavigate  } from "react-router-dom";
import { Header } from "../../components/Header";
const people = [
  {
    name: 'Leslie Alexander',
    email: 'leslie.alexander@example.com',
    phone: '(43) 2871-9843',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    address: 'Avenida Ataíde Teive',
  },
  {
    name: 'Michael Foster',
    email: 'michael.foster@example.com',
    phone: '(19) 3556-8111',
    imageUrl:
      'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    address: 'Rua NC 18',
  },
  {
    name: 'Dries Vincent',
    email: 'dries.vincent@example.com',
    phone: '(92) 3082-6212',
    imageUrl:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    address: 'Quadra Quadra 48',
  },
  {
    name: 'Lindsay Walton',
    email: 'lindsay.walton@example.com',
    phone: '(88) 2273-3683',
    imageUrl:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    address: 'Rua Itauna',
  },
  {
    name: 'Courtney Henry',
    email: 'courtney.henry@example.com',
    phone: '(85) 3941-8030',
    imageUrl:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    address: 'Avenida General Osório',
  },
  {
    name: 'Tom Cook',
    email: 'tom.cook@example.com',
    phone: '(28) 3985-4028',
    imageUrl:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    address: 'Vale Quem Tem',
  },
]

export default function Students() {
  const navigate = useNavigate();

  useEffect(() => {
      const storedToken = sessionStorage.getItem('token');

      if (storedToken) {
        navigate('/estudantes');
      } else {
        navigate('/login');
      }
  }, []);
  return (
    <>
      <div className="min-h-full">
        <Header />
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Estudantes</h1>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <ul role="list" className="divide-y divide-gray-100">
            {people.map((person) => (
              <li key={person.email} className="flex justify-between gap-x-6 py-5">
                <div className="flex min-w-0 gap-x-4">
                  <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={person.imageUrl} alt="" />
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">{person.name}</p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">{person.email}</p>
                  </div>
                </div>
                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                  <p className="text-sm leading-6 text-gray-900">{person.phone}</p>
                  <p className="mt-1 text-xs leading-5 text-gray-500">{person.address}</p>
                </div>
              </li>
            ))}
          </ul>
          </div>
        </main>
      </div>
    </>
  )
}