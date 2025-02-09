'use client';

import { usePathname } from 'next/navigation';
import BlueButton from '@/components/buttons/BlueButton';
import { docTypes } from '@/src/data';
import { MenuItem, TextField } from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ClientFormSchema } from '@/src/schema';
import { ClientFormData } from '@/src/types';
import { useOrderStore } from '@/src/store';
import ClientFacade from '@/src/services/client-facade';
import { toast } from 'react-toastify';


export default function ClientForm() {
  const router = usePathname();
  const {
    register, control, handleSubmit, formState: { errors }, reset,
  } = useForm<ClientFormData>({
    resolver: zodResolver(ClientFormSchema),
  });

  const onSubmit: SubmitHandler<ClientFormData> = async (data) => {
    const newClient = {
      id: '',
      firstName: data.firstName,
      lastName: data.lastName,
      personIdType: data.personIdType,
      personId: data.personId,
      externalId: '',
      booklyId: '',
      email: data.email,
      phoneNumber: data.phoneNumber,
    };

    // Prueba de registro con API
    const clientFacade = new ClientFacade();
    const { response, success } = await clientFacade.createClient(newClient);


    if (success) {
      toast.success(`Cliente creado con ID: ${response}`);

      if (router.includes('/new-order')) {
        const selectedClient = await clientFacade.getClientById(response);

        if (typeof selectedClient !== 'string') {
          useOrderStore.setState({ selectedClient });
        } else {
          toast.error(`Error al obtener el cliente${selectedClient}`);
        }
      }
      reset();
    } else {
      toast.error(`Error al crear el cliente: ${response}`);
    }
  };

  return (
        <form onSubmit={handleSubmit(onSubmit)}
            className="max-w-2xl w-full sm:min-w-[43rem] grid grid-cols-1 sm:grid-cols-8 gap-x-3 content-between min-h-80 p-2"
        >
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

            {/* Nombre y Apellido */}
            <div className="sm:col-span-4">
                <TextField
                    {...register('firstName')}
                    label="Nombre del Cliente"
                    fullWidth
                    margin="normal"
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
                />
            </div>

            <div className="sm:col-span-4">
                <TextField
                    {...register('lastName')}
                    label="Apellido del Cliente"
                    fullWidth
                    margin="normal"
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                />
            </div>

            {/* Correo y Teléfono */}
            <div className="sm:col-span-4">
                <TextField
                    {...register('email')}
                    label="Correo Electrónico"
                    fullWidth
                    margin="normal"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                />
            </div>

            <div className="sm:col-span-4">
                <TextField
                    {...register('phoneNumber')}
                    label="Número de Teléfono"
                    fullWidth
                    margin="normal"
                    error={!!errors.phoneNumber}
                    helperText={errors.phoneNumber?.message}
                />
            </div>

            {/* Boton de Registro */}
            <div className="sm:col-span-full mt-3">
                <BlueButton type="submit" fullWidth >Registrar Cliente</BlueButton>
            </div>
        </form>
  );
}
