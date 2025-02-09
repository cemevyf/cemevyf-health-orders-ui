'use client';

import React, { useState } from 'react';
import {
  FormControl, RadioGroup, FormControlLabel,
  Radio, TextField, Button,
  MenuItem,
} from '@mui/material';
import BlueButton from '@/components/buttons/BlueButton';
import { docTypes } from '@/src/data';
import ClientFacade from '@/src/services/client-facade';
import { useOrderStore } from '@/src/store';
import { toast } from 'react-toastify';
import GreyButton from '../buttons/GreyButton';


export default function SearchClientForm() {
  const { showSearchClientResultPage } = useOrderStore();
  const [searchType, setSearchType] = useState('id');
  const [searchValues, setSearchValues] = useState({
    id: '',
    personIdType: '',
    personId: '',
    firstName: '',
    lastName: '',
  });

  const handleClearForm = () => {
    setSearchValues({
      id: '',
      personIdType: '',
      personId: '',
      firstName: '',
      lastName: '',
    });
  };

  const handleSearchTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchType(event.target.value);
  };

  const handleSearchValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setSearchValues({
      ...searchValues,
      [name]: value,
    });
  };

  const handleSearchForID = async () => {
    // Busqueda de cliente por ID con API
    const clientFacade = new ClientFacade();
    const client = await clientFacade.getClientById(searchValues.id);

    if (typeof client !== 'string') {
      if (client.id === '') {
        toast.warn('No se encontraron clientes con el ID proporcionado.');
      } else {
        useOrderStore.setState({ foundClients: [client] });
        showSearchClientResultPage();
      }
    } else {
      toast.error(`Error al buscar el cliente: ${client}`);
    }
  };

  const handleSearchForDoc = async () => {
    // Busqueda de cliente por Documento con API
    const clientFacade = new ClientFacade();
    const clients = await clientFacade.getClientsByDoc({
      personIdType: searchValues.personIdType,
      personId: searchValues.personId,
    });

    if (typeof clients !== 'string') {
      if (clients.data.length === 0) {
        toast.warn('No se encontraron clientes con el documento proporcionado.');
      } else {
        useOrderStore.setState({ foundClients: clients.data });
        showSearchClientResultPage();
      }
    } else {
      toast.error(`Error al buscar el cliente: ${clients}`);
    }
  };

  const handleSearchForFisrtName = async () => {
    // Busqueda de cliente por Nombre con API
    const clientFacade = new ClientFacade();
    const clients = await clientFacade.getClientsByFirstName(searchValues.firstName);

    if (typeof clients !== 'string') {
      if (clients.data.length === 0) {
        toast.warn('No se encontraron clientes con el nombre proporcionado.');
      } else {
        useOrderStore.setState({ foundClients: clients.data });
        showSearchClientResultPage();
      }
    } else {
      toast.error(`Error al buscar el cliente: ${clients}`);
    }
  };

  const handleSearchForLastName = async () => {
    // Busqueda de cliente por Apellido con API
    const clientFacade = new ClientFacade();
    const clients = await clientFacade.getClientsByLastName(searchValues.lastName);

    if (typeof clients !== 'string') {
      if (clients.data.length === 0) {
        toast.warn('No se encontraron clientes con el apellido proporcionado.');
      } else {
        useOrderStore.setState({ foundClients: clients.data });
        showSearchClientResultPage();
      }
    } else {
      toast.error(`Error al buscar el cliente: ${clients}`);
    }
  };

  return (
        <div className='flex flex-col gap-3'>
            <div className='pt-4 px-1 sm:px-5 w-full'>
                <FormControl fullWidth>
                    <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={searchType}
                        onChange={handleSearchTypeChange}
                    >
                        <div className='grid grid-cols-1 sm:grid-cols-9 items-center gap-x-4 sm:gap-y-4 mb-4'>
                            {/* Búsqueda por ID */}
                            <div className='pt-2 sm:col-span-2'>
                                <FormControlLabel value="id" control={<Radio />} label="ID del Cliente" />
                            </div>
                            <div className='sm:col-span-5'>
                                <TextField
                                    disabled={searchType !== 'id'}
                                    label="ID del Cliente"
                                    fullWidth
                                    margin="normal"
                                    name='id'
                                    value={searchValues.id}
                                    onChange={handleSearchValueChange}
                                />
                            </div>
                            <div className='pt-2 sm:col-span-2 mb-6 sm:mb-0'>
                                <BlueButton disabled={searchType !== 'id'} onClick={handleSearchForID} fullWidth>
                                    Buscar
                                </BlueButton>
                            </div>

                            {/* Búsqueda por Documento */}
                            <div className='pt-2 sm:col-span-2'>
                                <FormControlLabel value="document" control={<Radio />} label="Documento del Cliente" />
                            </div>
                            <div className='sm:col-span-2'>
                                <TextField
                                    disabled={searchType !== 'document'}
                                    label="Tipo de Documento"
                                    fullWidth
                                    margin="normal"
                                    name="personIdType"
                                    defaultValue={docTypes.length > 0 ? docTypes[0].value : ''}
                                    onChange={handleSearchValueChange}
                                    select
                                >
                                    {docTypes.map(type => (
                                        <MenuItem key={type.name} value={type.value}>{type.abbr}</MenuItem>
                                    ))}
                                    <MenuItem key='No Especificar' value=' '>No Especificar</MenuItem>
                                </TextField>
                            </div>
                            <div className='sm:col-span-3'>
                                <TextField
                                    disabled={searchType !== 'document'}
                                    label="Número de Documento"
                                    fullWidth
                                    margin="normal"
                                    name='personId'
                                    value={searchValues.personId}
                                    onChange={handleSearchValueChange}
                                />
                            </div>
                            <div className='pt-2 sm:col-span-2 mb-6 sm:mb-0'>
                                <BlueButton disabled={searchType !== 'document'} onClick={handleSearchForDoc} fullWidth>
                                    Buscar
                                </BlueButton>
                            </div>

                            {/* Búsqueda por Nombre */}
                            <div className='pt-2 sm:col-span-2'>
                                <FormControlLabel value="firstName" control={<Radio />} label="Nombre del Cliente" />
                            </div>
                            <div className='sm:col-span-5'>
                                <TextField
                                    disabled={searchType !== 'firstName'}
                                    label="Nombre del Cliente"
                                    fullWidth
                                    margin="normal"
                                    name='firstName'
                                    value={searchValues.firstName}
                                    onChange={handleSearchValueChange}
                                />
                            </div>
                            <div className='pt-2 sm:col-span-2 mb-6 sm:mb-0'>
                                <BlueButton disabled={searchType !== 'firstName'} onClick={handleSearchForFisrtName} fullWidth>
                                    Buscar
                                </BlueButton>
                            </div>

                            {/* Búsqueda por Apellido */}
                            <div className='pt-2 sm:col-span-2'>
                                <FormControlLabel value="lastName" control={<Radio />} label="Apellido del Cliente" />
                            </div>
                            <div className='sm:col-span-5'>
                                <TextField
                                    disabled={searchType !== 'lastName'}
                                    label="Apellido del Cliente"
                                    fullWidth
                                    margin="normal"
                                    name='lastName'
                                    value={searchValues.lastName}
                                    onChange={handleSearchValueChange}
                                />
                            </div>
                            <div className='pt-2 sm:col-span-2 mb-6 sm:mb-0'>
                                <BlueButton disabled={searchType !== 'lastName'} onClick={handleSearchForLastName} fullWidth>
                                    Buscar
                                </BlueButton>
                            </div>
                        </div>
                    </RadioGroup>
                </FormControl>
            </div>

            <div className='mx-auto w-72'>
                    <GreyButton onClick={handleClearForm} fullWidth>Borrar Campos</GreyButton>
            </div>
        </div>
  );
}
