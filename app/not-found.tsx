import Link from 'next/link';

export default function NotFound() {
  return (
        <div className="flex flex-col items-center justify-center gap-3 min-h-[calc(100vh-82px)] py-6">
            <h2 className="text-3xl font-semibold">Página no encontrada</h2>
            <p className="text-center">La página que desea acceder no se encuentra disponible o no existe dentro de la App.</p>
            <Link href="/" className="isolate relative z-10 rounded border-2 border-azul-oscuro bg-azul-oscuro/85 px-6 py-2 text-sm font-medium uppercase text-white transition-colors before:absolute before:left-0 before:top-0 before:-z-10 before:h-full before:w-full before:origin-top-left before:scale-x-0 before:bg-azul-oscuro before:transition-transform before:duration-300 before:content-[''] hover:text-white before:hover:scale-x-100 active:brightness-110">Regresar al Inicio</Link>
        </div>
  );
}
