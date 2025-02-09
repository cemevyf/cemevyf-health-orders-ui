import { Alert } from '@mui/material';
import { useOrderStore } from '@/src/store';
import SearchDocForm from '../forms/SearchDocForm';
import ClientsList from '../list/ClientsList';


export default function SelectPatientStep() {
  // Store de Zustand
  const selectedClient = useOrderStore(state => state.selectedClient);
  const { visibleSearchClientResultStep } = useOrderStore();

  return (
    <div className="flex flex-col gap-4">
      <div className="mx-auto">
        {/* <Alert variant="filled" severity="info" sx={{ backgroundColor:'#47A2BC', fontSize: 16, ...(window.innerWidth < 1280 && { fontSize: 15}) }}> */}
        <Alert variant="filled" severity="info" sx={{ backgroundColor: '#3397b3' }}>
          Por favor para continuar, busque y seleccione al cliente. Sino se encontraron resultados, por favor complete el formulario de registro para el nuevo cliente.
        </Alert>
      </div>

      <div className="p-6 rounded-lg bg-neutral-100 w-full shadow-md flex flex-col justify-start items-center lg:min-h-[32rem] 2xl:min-h-[40rem] gap-2 md:gap-4">
        <h2 className="text-center text-xl font-bold text-negro-claro uppercase py-2 border-b-4 border-gris-oscuro/30 h-fit w-11/12">
          Formulario para Buscar Cliente
        </h2>

        <p className='text-center text-base text-stone-700'>Ingrese el número y/o el tipo de documento del cliente para realizar la búsqueda en la base de datos.</p>

        <SearchDocForm/>

        <h3 className="text-center text-xl font-bold text-negro-claro uppercase py-2 border-b-4 border-gris-oscuro/30 h-fit w-11/12">
          Resultados de la búsqueda
        </h3>

        {visibleSearchClientResultStep && (
          <ClientsList/>
        )}
      </div>
    </div>
  );
}
