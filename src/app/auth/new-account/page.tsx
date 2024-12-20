import { tittleFont } from '@/config/fonts';
import Link from 'next/link';
import { RegisterForm } from './ui/RegisterForm';

export default function NewAccount() {
  return (
    <main className="flex flex-col min-h-screen pt-32 sm:pt-32">

      <h1 className={ `${ tittleFont.className } text-4xl mb-5` }>Registrate</h1>

      <div className="flex flex-col">

      <RegisterForm/>

        {/* divisor l ine */ }
        <div className="flex items-center my-5">
          <div className="flex-1 border-t border-gray-500"></div>
          <div className="px-2 text-gray-800">O</div>
          <div className="flex-1 border-t border-gray-500"></div>
        </div>

        <Link
          href="/auth/login" 
          className="btn-secondary text-center">
          Ingresar
        </Link>

      </div>
    </main>
  );
}