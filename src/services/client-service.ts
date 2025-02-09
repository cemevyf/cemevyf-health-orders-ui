import { Client } from '@/src/types';
import clientsData from '../data/falseClients.json';
import { docTypes, orderStatus } from '../data';

// Para importar los datos de clientes
export function loadClients(): Client[] {
  return clientsData;
}

//  Para reemplazar el valor por la abreviatura del documento
export function getDocTypeAbbr(value: string): string {
  const docType = docTypes.find(type => type.value === value);
  return docType ? docType.abbr : value;
}

// Para formatear el monto total para enviarlo a la API
export const formatTotalAmount = (value : string): string => value.replace(/\./g, '').replace(/,/g, '.');

// Función para formatear un número con comas y puntos en pesos argentinos
export function formatNumber(value: number): string {
  return value.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' });
}

// Función para obtener los status a cambiar
export const getNextStatus = (currentStatus: string): string => {
  switch (currentStatus) {
    case 'quoted':
      return 'executed';
    case 'executed':
      return 'pending_results';
    case 'pending_results':
      return 'results_done';
    default:
      return currentStatus;
  }
};

// Función para reemplazar el valor por el nombre de orderStatus
export function getOrderStatusName(value: string): string {
  const status = orderStatus.find(status => status.value === value);
  return status ? status.name : value;
}
