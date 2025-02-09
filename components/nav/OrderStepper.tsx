'use client';

import React, { useEffect, useState } from 'react';
import {
  Stepper, Step, StepLabel, Box, Alert,
} from '@mui/material';
import { useOrderStore } from '@/src/store';
import OrderFacade from '@/src/services/order-facade';
import { formatTotalAmount } from '@/src/services/client-service';
import { toast } from 'react-toastify';
import { HealthOrder } from '@/src/types';
import SelectServiciesStep from '../step/SelectServiciesStep';
import SelectPatientStep from '../step/SelectPatientStep';
import BlueButton from '../buttons/BlueButton';
import GreyButton from '../buttons/GreyButton';
import OrderPreviewStep from '../step/OrderPreviewStep';
import OrderProduced from '../step/OrderProduced';
import NewOrderDialog from '../dialog/NewOrderDialog';
import AddPrescriptionDialog from '../dialog/AddPrescriptionDialog';

const steps = ['Seleccionar Estudios', 'Seleccionar Cliente', 'Revisar y Confirmar'];
const STEP_FINAL = steps.length;


export default function OrderStepper() {
  const selectedLabItems = useOrderStore(state => state.selectedLabItems);
  const selectedClient = useOrderStore(state => state.selectedClient);
  const totalAmountOrder = useOrderStore(state => state.totalAmountOrder);
  const [isDisabled, setIsDisabled] = useState(true);
  const activeStep = useOrderStore(state => state.activeStep);
  const setActiveStep = useOrderStore(state => state.setActiveStep);
  const resetOrder = useOrderStore(state => state.resetOrder);
  const [order, setOrder] = useState<HealthOrder>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAddFileDialogOpen, setIsAddFileDialogOpen] = useState(false);

  const STEP_1 = 0;
  const STEP_2 = 1;
  const STEP_3 = 2;

  // Para desactivar el boton siguiente.
  useEffect(() => {
    if (activeStep === STEP_2) {
      setIsDisabled(!(selectedClient.id !== '')); // Desactiva si no hay cliente, habilita si hay cliente.
    } else if (activeStep === STEP_1) {
      setIsDisabled(selectedLabItems.length === 0); // deshabilita si no hay estudios seleccionados.
    } else {
      setIsDisabled(false); // Habilita en otros pasos.
    }
  }, [activeStep, selectedClient, selectedLabItems]);

  // Para avanzar al siguiente paso y finalizar la orden.
  const handleNext = () => {
    // Abre el Dialog para confirmar o pasa al siguiente paso.
    if (activeStep === STEP_3) {
      handleOpenDialog();
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  // Para retroceder al paso anterior.
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };


  // Para confirmar la cotizacion de la orden mediante Dialog
  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleConfirmDialog = async () => {
    // Crea la orden si se llega al paso 3.
    try {
      handleOpenDialog();

      const newOrder = {
        clientId: selectedClient.id,
        totalAmount: formatTotalAmount(totalAmountOrder),
        currency: 'ARS',
        quotationItems: selectedLabItems,
      };

      const orderFacade = new OrderFacade();
      const order = await orderFacade.createOrder(newOrder);

      if (typeof order === 'string') {
        toast.error(`Error al generar la orden: ${order}`);
      } else {
        toast.success(`Nueva orden generada: ID ${order.id}`);
        // pasar order a OrderProduced
        setOrder(order);
        setActiveStep(activeStep + 1);
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      toast.error(`Error al generar la cotización: ${errorMessage}`);
    } finally {
      handleCloseDialog();
    }
  };


  // Para adjuntar la prescipcion o receta a la orden
  const handleOpenAddFileDialog = () => {
    setIsAddFileDialogOpen(true);
  };

  const handleCloseAddFileDialog = () => {
    setIsAddFileDialogOpen(false);
  };

  return (
    <div>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {activeStep === STEP_FINAL ? (
        <div className='flex flex-col items-center mt-4'>
          <Alert variant="filled" severity="info" sx={{ backgroundColor: '#34b45e' }}>
            Todos los pasos fueron completados. Orden generada exitosamente.
          </Alert>

          <div className="p-8 rounded-lg bg-neutral-100 w-[56rem] shadow-md flex flex-col justify-start items-center lg:min-h-[32rem] 2xl:min-h-[43rem] gap-2 md:gap-4 my-4">

            {order && <OrderProduced id={order.id} status={order.status} createdAt={order.createdAt} currency={order.currency} items={order.items} sendMail={order.sendMail} totalAmount={order.totalAmount}/>}

            <div className='flex flex-col sm:flex-row gap-4'>
              <GreyButton onClick={resetOrder} sx={{ minWidth: 280 }}>
                Generar Nueva Orden
              </GreyButton>

              <BlueButton onClick={handleOpenAddFileDialog} sx={{ minWidth: 280 }}>
                Adjuntar Receta
              </BlueButton>
            </div>

            {order && (
              <AddPrescriptionDialog
                open={isAddFileDialogOpen}
                onClose={handleCloseAddFileDialog}
                orderId={order.id}
              />
            )}
          </div>
        </div>
      ) : (
        <div className='mt-4'>
          {activeStep === STEP_1 && <SelectServiciesStep/>}

          {activeStep === STEP_2 && <SelectPatientStep/> }

          {activeStep === STEP_3 && <OrderPreviewStep/>}

          <div className='flex flex-col sm:flex-row gap-1 py-4'>
            <GreyButton onClick={handleBack} disabled={activeStep === STEP_1} sx={{ minWidth: 280 }}>
              Anterior Paso
            </GreyButton>

            <Box sx={{ flex: '1 1 auto' }} />

            <BlueButton onClick={handleNext} disabled={isDisabled} sx={{ minWidth: 280 }}>
              {activeStep === STEP_3 ? 'Confirmar Orden' : 'Siguiente Paso'}
            </BlueButton>
          </div>
        </div>
      )}

      <NewOrderDialog
        open={isDialogOpen} onClose={handleCloseDialog}
        onConfirm={handleConfirmDialog} clientName={`${selectedClient.firstName} ${selectedClient.lastName}`}
        numberOfStudies={selectedLabItems.length} totalAmount={totalAmountOrder}
      />
    </div>
  );
}
