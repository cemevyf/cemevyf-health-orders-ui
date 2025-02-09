import { useOrderStore } from '@/src/store';
import ClientDetails from './ClientDetails';
import ClientForm from '../forms/ClientForm';

export default function ClientsList() {
  const clients = useOrderStore(state => state.foundClients);


  return (
    <>
            {clients.length ? (
              <>
                    <p className='text-center text-stone-700'>
                        Verifique los datos antes de seleccionar al cliente para la orden.
                    </p>
                    <div className="w-full grid grid-col-1 lg:grid-cols-2 gap-4">
                        {clients.map(client => (
                            <ClientDetails
                            key={client.id}
                            client={client}
                            />
                        ))}
                    </div>
              </>
            ) : (
              <>
                    <p className='text-center text-stone-700'>
                        No se encontraron clientes con esos parametros de búsqueda. Por favor, complete el formulario para registra al cliente.
                    </p>
                    <ClientForm/>
              </>
            )}
    </>
  );
}
