'use client';

import { Alert } from '@mui/material';
import BlueButton from '@/components/buttons/BlueButton';
import EditClientTable from '@/components/tables/EditClientTable';
import ClientForm from '@/components/forms/ClientForm';
import SearchClientForm from '@/components/forms/SearchClientForm';
import { useOrderStore } from '@/src/store';
import ClientFacade from '@/src/services/client-facade';
import { toast } from 'react-toastify';


export default function SearchClient() {
  const { showRegisterClientFormPage, showSearchClientResultPage, showSearchClientFormPage } = useOrderStore();
  const TABLE_VIEW = useOrderStore(state => state.visibleSearchClientResultPage);
  const REGISTER_VIEW = useOrderStore(state => state.visibleRegisterClientFormPage);
  const SEARCH_VIEW = useOrderStore(state => state.visibleSearchClientFormPage);

  const handleAddClient = () => {
    showRegisterClientFormPage();
  };

  const handleSearchClient = () => {
    showSearchClientFormPage();
  };

  const handleClientTable = () => {
    showSearchClientResultPage();
  };

  const handleResetTable = async () => {
    // Para reiniciar la tabla de clientes con API
    const clientFacade = new ClientFacade();
    const clients = await clientFacade.getClients();

    if (typeof clients === 'string') {
      toast.error(`Error al buscar el cliente: ${clients}`);
    } else {
      if (clients.data.length === 0) {
        toast.warn('No se encontraron clientes para mostrar.');
      } else {
        toast.success(`Se encontraron ${clients.data.length} clientes.`);
      }
      useOrderStore.setState({ foundClients: clients.data });
    }
  };


  return (
    <div className="max-w-7xl flex flex-col mx-auto gap-5 h-auto">
      <div className="mx-auto">
        <Alert variant="filled" severity="info" sx={{ backgroundColor: '#3397b3' }}>
          Aquí podrás encontrar a todos los clientes de laboratorio y filtrar si se necesita buscar a un cliente en especifico. Pronto se podrás editar su información de contacto.
        </Alert>
      </div>

      <div className='bg-neutral-100 w-full p-6 rounded-lg flex flex-col h-full'>
        {/* Tabla de clientes */}
        {TABLE_VIEW
        && <>
          <div className=' flex flex-row justify-between items-end border-b-4 border-gris-oscuro/30 h-fit px-8 pb-3'>
            <h3 className="text-xl font-bold text-negro-claro uppercase">
              Lista de Clientes:
            </h3>

            <div className='flex gap-4 flex-wrap'>
              <BlueButton onClick={handleResetTable}>Limpiar Filtros</BlueButton>
              <BlueButton onClick={handleAddClient}>Agregar Cliente</BlueButton>
              <BlueButton onClick={handleSearchClient}>Buscar Cliente</BlueButton>
            </div>
          </div>
          <div className='p-3'>
            {/* <ClientTable/> */}
            <EditClientTable/>
          </div>
        </>
        }

        {/* Formulario para agregar un cliente */}
        {REGISTER_VIEW
        && <>
          <div className=' flex flex-row justify-between items-end border-b-4 border-gris-oscuro/30 h-fit px-8 pb-3'>
            <h3 className="text-xl font-bold text-negro-claro uppercase">
              Formulario de Nuevo Cliente:
            </h3>

            <div className='flex gap-4'>
              <BlueButton onClick={handleSearchClient}>Buscar Cliente</BlueButton>
              <BlueButton onClick={handleClientTable}>Volver a la tabla</BlueButton>
            </div>
          </div>
          <div className='p-3 mx-auto'>
            <ClientForm/>
          </div>
        </>
        }

        {/* Formulario para buscar un cliente */}
        {SEARCH_VIEW
        && <>
          <div className=' flex flex-row justify-between items-end border-b-4 border-gris-oscuro/30 h-fit px-8 pb-3'>
            <h3 className="text-xl font-bold text-negro-claro uppercase">
              Buscar Cliente mediante:
            </h3>

            <div className='flex gap-4'>
              <BlueButton onClick={handleAddClient}>Agregar Cliente</BlueButton>
              <BlueButton onClick={handleClientTable}>Volver a la tabla</BlueButton>
            </div>
          </div>
          <div className='p-3 mx-auto'>
            <SearchClientForm/>
          </div>
        </>
        }
      </div>

    </div>
  );
}
