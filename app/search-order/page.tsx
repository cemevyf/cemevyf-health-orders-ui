'use client';

import HeaderOrder from '@/components/tables/HeaderOrder';
import { Alert } from '@mui/material';
import BlueButton from '@/components/buttons/BlueButton';
import EditOrderTable from '@/components/tables/EditOrderTable';


export default function SearchOrder() {
  return (
    <div className="max-w-7xl flex flex-col mx-auto gap-6 h-auto">
      <h1 className='text-2xl font-bold text-negro-claro uppercase text-center'>Buscar Orden | Lista de ordenes</h1>
      <div className="mx-auto">
        <Alert variant="filled" severity="info" sx={{ backgroundColor: '#3397b3' }}>
          Aqui encontraras todas la ordenes generadas. Tambien puede realizar una búsqueda especificas segun el campo seleccionado.
        </Alert>
      </div>

      <div className='bg-neutral-100 w-full px-5 py-8 rounded-lg flex flex-col gap-6 h-full'>

        <div className='flex flex-col gap-6 divide-y-[3px] divide-gris-oscuro/30'>
          <HeaderOrder/>
          <div className='pt-4 px-5'>
            {/* <TableOrder/> */}
            <EditOrderTable/>
          </div>
        </div>

        <div className=' flex content-center w-1/2 mx-auto gap-6 '>
          <BlueButton fullWidth>Filtrar por Estado</BlueButton>
          <BlueButton fullWidth>Nueva Búsqueda</BlueButton>
        </div>
      </div>

    </div>
  );
}
