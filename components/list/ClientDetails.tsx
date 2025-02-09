import { Client } from '@/src/types';
import { useOrderStore } from '@/src/store';
import { getDocTypeAbbr } from '@/src/services/client-service';
import BlueButton from '../buttons/BlueButton';


type ClientDetailsProps = {
    client: Client
}

export default function ClientDetails({ client } : ClientDetailsProps) {
  const selectedclient = useOrderStore(state => state.selectedClient);

  const handleClick = () => {
    useOrderStore.setState({ selectedClient: client });
  };

  return (
        <div className="p-6 bg-white shadow-md rounded-xl flex flex-col justify-between h-fit gap-3 sm:min-h-64">
            <p className="text-right text-gray-500 font-semibold border-b-2 mb-2">
                ID: {client.id}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-y-2">
                <p className="col-span-2">Nombre y Apellido:</p>
                <p className="col-span-3 font-semibold text-gray-700 text-right sm:text-left">
                    {client.firstName}, {client.lastName}
                </p>

                <p className="col-span-2">Tipo y Nº de Documento:</p>
                <p className="col-span-3 uppercase font-semibold text-gray-700 text-right sm:text-left">
                    <span className="normal-case">{getDocTypeAbbr(client.personIdType)}</span> - {client.personId}
                </p>

                <p className="col-span-2">Nº de Teléfono:</p>
                <p className="col-span-3 uppercase font-semibold text-gray-700 text-right sm:text-left">
                    {client.phoneNumber}
                </p>

                <p className="col-span-2">Correo Electrónico:</p>
                <p className="col-span-3 font-semibold text-gray-700 text-right sm:text-left">
                    {client.email}
                </p>
            </div>

            <div className="flex justify-end mt-1">
                <BlueButton onClick={handleClick} disabled={selectedclient.id === client.id}>
                    {selectedclient.id === client.id ? 'Cliente Seleccionado' : 'Seleccionar cliente'}
                </BlueButton>
            </div>
        </div>
  );
}
