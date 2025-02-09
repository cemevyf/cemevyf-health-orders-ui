import React from 'react';
import {
  Divider, Stack, Typography, Grid2,
} from '@mui/material';
import { useOrderStore } from '@/src/store';
import { HealthOrder } from '@/src/types';
import { formatNumber, getDocTypeAbbr } from '@/src/services/client-service';


const OrderProduced = (order : HealthOrder) => {
  const selectedClient = useOrderStore(state => state.selectedClient);

  return (
    <>
            <h2 className="text-center text-xl font-bold text-negro-claro uppercase py-2 border-b-4 border-gris-oscuro/30 h-fit w-11/12">Orden Generada</h2>
            <p className='text-center px-8'>
                El número de pedido es #{order.id}. De momento aun no se mandó un correo electrónico con la información de la orden, como tambien los dias que puede presentarse y las intrucciones para realizar los siguientes pasos para el cliente.
            </p>

            <Stack direction="column" divider={<Divider flexItem />} spacing={2} sx={{ my: 1 }}>
                <div className='px-6 flex flex-col gap-1'>
                    <h3 className='font-bold text-negro-opaco py-1'>
                        Detalles del Cliente
                    </h3>
                    <p className='px-2'>{selectedClient.firstName} {selectedClient.lastName}</p>
                    <p className='text-neutral-600 px-2'>
                        Documento: '{getDocTypeAbbr(selectedClient.personIdType)} - {selectedClient.personId}'
                    </p>
                    <p className='text-neutral-600 px-2'>
                        Correo: '{selectedClient.email}', Teléfono: '{selectedClient.phoneNumber}'
                    </p>
                </div>

                <div className='px-6'>
                    <h3 className='font-bold text-negro-opaco py-2'>
                        Detalles de los Servicios Solicitados
                    </h3>
                    <div className='flex flex-col w-[44rem]'>
                        {order.items.map(service => (
                            <React.Fragment key={service.code}>
                                <div className='flex flex-row justify-between px-2 py-1 '>
                                    <p className='text-neutral-700 text-sm align-middle'>
                                        {service.name}
                                        <span className='text-neutral-500 pl-4'>({formatNumber(Number(service.unitPrice))} * {service.itemCount} ud.)</span>
                                    </p>
                                    <p>{formatNumber(Number(service.totalPrice))}</p>
                                </div>
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                <div className='flex justify-between px-6'>
                    <h3 className='font-bold text-negro-opaco py-2'>
                        Monto Total:
                    </h3>
                    <h3 className='font-bold text-negro-opaco py-2'>
                        ARS {formatNumber(order.totalAmount)}
                    </h3>
                </div>
            </Stack>
    </>
  );
};

export default OrderProduced;
