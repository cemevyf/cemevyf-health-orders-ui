import Link from 'next/link';
import Image from 'next/image';
import logo from '@/src/public/logo-cemevyf-2024.webp';

export default function Home() {
  const navItems = [
    { name: 'Nueva Orden', slug: 'new-order' },
    { name: 'Buscar Orden', slug: 'search-order' },
    { name: 'Buscar Cliente', slug: 'search-client' }];

  return (
    <div className="w-11/12 md:w-3/4 lg:max-w-7xl flex flex-col mx-auto gap-6 h-full">

      <div className='bg-gray-100 px-5 py-12 rounded-lg flex flex-col gap-6 h-full justify-center'>

        <div className='w-40 h-40 relative mx-auto'>
          <Image fill src={logo} alt="Logo"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          />
        </div>

        <h1 className='text-xl sm:px-24 md:text-2xl font-bold text-negro-claro uppercase text-center'>Gestor de Ordenes y Pacientes - CEMEVYF</h1>


        <nav className="flex flex-col w-2/3 sm:w-1/3 lg:w-1/4 gap-4 mx-auto">
          {navItems.map(item => (
            <Link
              key={item.name}
              className={'isolate relative z-10 w-full text-center rounded border-2 border-azul-oscuro bg-azul-oscuro/85 px-5 py-2 text-sm font-medium uppercase text-white transition-colors before:absolute before:left-0 before:top-0 before:-z-10 before:h-full before:w-full before:origin-top-left before:scale-x-0 before:bg-azul-oscuro before:transition-transform before:duration-300 before:content-[\'\'] hover:text-white before:hover:scale-x-100 active:brightness-110'}
              href={`/${item.slug}`}
            >{item.name}</Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
