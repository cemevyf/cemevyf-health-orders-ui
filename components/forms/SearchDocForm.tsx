'use client';

import BlueButton from '@/components/buttons/BlueButton';
import { docTypes } from '@/src/data';
import { MenuItem, TextField } from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SearchDocFormSchema } from '@/src/schema';
import { SearchDocFormData } from '@/src/types';
import { useOrderStore } from '@/src/store';
import ClientFacade from '@/src/services/client-facade';
import { toast } from 'react-toastify';


export default function SearchDocForm() {
  const { showSearchClientResultStep } = useOrderStore();

  const {
    register, control, handleSubmit, formState: { errors },
  } = useForm<SearchDocFormData>({
    resolver: zodResolver(SearchDocFormSchema),
  });

  const onSubmit: SubmitHandler<SearchDocFormData> = async (data) => {
    // Busqueda de cliente por Id con API
    const clientFacade = new ClientFacade();
    const clients = await clientFacade.getClientsByDoc({
      personIdType: data.personIdType,
      personId: data.personId,
    });

    if (typeof clients === 'string') {
      toast.error(`Error al buscar el cliente: ${clients}`);
    } else {
      if (clients.data.length === 0) {
        toast.warn('No se encontraron clientes con esos datos.');
      } else {
        toast.success(`Se encontraron ${clients.data.length} clientes.`);
      }
      useOrderStore.setState({ foundClients: clients.data });
      showSearchClientResultStep();
    }
  };


  return (
        <form onSubmit={handleSubmit(onSubmit)}
            className="max-w-2xl w-full grid grid-cols-1 sm:grid-cols-12 items-start gap-x-4">
            {/* Tipo y Número de Documento */}
            <div className="sm:col-span-3">
                <Controller
                    name="personIdType"
                    control={control}
                    defaultValue={docTypes.length > 0 ? docTypes[0].value : ''}
                    render={({ field }) => (
                        <TextField
                        {...field}
                        select
                        label="Tipo de Documento"
                        fullWidth
                        margin="normal"
                        >
                            {docTypes.map(type => (
                                <MenuItem key={type.name} value={type.value}>{type.abbr}</MenuItem>
                            ))}
                            <MenuItem key='No Especificar' value=' '>No Especificar</MenuItem>
                        </TextField>
                    )}
                    />
            </div>

            <div className="sm:col-span-5">
                <TextField
                    {...register('personId')}
                    label="Número de Documento"
                    fullWidth
                    margin="normal"
                    error={!!errors.personId}
                    helperText={errors.personId?.message}
                    />
            </div>

            {/* Boton de Búsqueda */}
            <div className="col-span-full sm:col-span-4 pt-5">
                <BlueButton type="submit" fullWidth >Buscar Cliente</BlueButton>
            </div>
        </form>
  );
}
