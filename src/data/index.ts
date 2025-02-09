import { DocTypes, OrderStatus } from '@/src/types';


export const docTypes : DocTypes[] = [
  { abbr: 'DNI', name: 'Documento Nacional de Identidad', value: 'dni' },
  { abbr: 'Pasaporte', name: 'Pasaporte Extranjero', value: 'pass' },
  { abbr: 'CUIT', name: 'Clave Única de Identificación Tributaria', value: 'cuit' },
  { abbr: 'CUIL', name: 'Clave Única de Identificación Laboral', value: 'cuil' },
  { abbr: 'Otros', name: 'Otro tipo de Documento', value: 'other' },
];

export const orderStatus: OrderStatus[] = [
  { name: 'Cotizado', value: 'quoted' },
  { name: 'Ejecutado', value: 'executed' },
  { name: 'Resultados Pendientes', value: 'pending_results' },
  { name: 'Resultados Realizados', value: 'results_done' },
];
