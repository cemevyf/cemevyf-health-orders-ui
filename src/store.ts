import {
  Client, LabItem, Order, SelectedLabItem,
} from '@/src/types';
import { create } from 'zustand';
import BigNumber from 'bignumber.js';
import { GridRowSelectionModel } from '@mui/x-data-grid';
import labItemsData from './data/lab-oct-2024.json';
import { loadClients } from './services/client-service';

const labItemsJson = labItemsData.map((item, index) => {
  const price = item.price.replace('$', '').replace('.', '');
  const itemBn = new BigNumber(price);
  return {
    id: index,
    name: item.name,
    code: item.code,
    price: itemBn.toNumber(),
  } as LabItem;
});

interface OrderState {
    // State del Stepper
    activeStep: number;

    // States de Estudios
    preselectedLabItems: LabItem[];
    selectedLabItems: SelectedLabItem[];
    totalAmountOrder: string;
    labItems: LabItem[];
    selectedRows: GridRowSelectionModel;

    // States de Clientes
    visibleSearchClientResultStep: boolean;
    visibleSearchClientResultPage: boolean;
    visibleSearchClientFormPage: boolean;
    visibleRegisterClientFormPage: boolean;

    allClients: Client[];
    foundClients: Client[];
    selectedClient: Client;

    allOrders: Order[];
    selectedOrder: Order['id']
    selectedOrders: Order['id'][]
}

interface OrderActions {
    // Actions del Stepper
    setActiveStep: (newStep: number) => void;
    resetOrder: () => void;

    // Actions de Estudios
    saveSelectedLabItems: (list: LabItem[]) => void;
    saveTotalAmount: (value: string) => void;

    // Actions de Clientes
    showSearchClientResultStep: () => void;
    showSearchClientResultPage: () => void;
    showSearchClientFormPage: () => void;
    showRegisterClientFormPage: () => void;
}

const initialState: OrderState = {
  // State del Stepper
  activeStep: 0,


  // States de Estudios
  preselectedLabItems: [],
  selectedLabItems: [],
  totalAmountOrder: '',
  labItems: labItemsJson,
  selectedRows: [],

  // States de Clientes
  visibleSearchClientResultStep: false,
  visibleSearchClientResultPage: true,
  visibleSearchClientFormPage: false,
  visibleRegisterClientFormPage: false,

  allClients: loadClients(),
  foundClients: [],
  selectedClient: {
    id: '',
    firstName: '',
    lastName: '',
    personIdType: '',
    personId: '',
    externalId: '',
    booklyId: '',
    email: '',
    phoneNumber: '',
  },

  allOrders: [],
  selectedOrder: '',
  selectedOrders: [],
};

export const useOrderStore = create<OrderState & OrderActions>(set => ({
  ...initialState,

  // Actions del Stepper
  // setActiveStep: (newStep) => set({ activeStep: newStep }),
  setActiveStep: newStep => set(state => ({ ...state, activeStep: newStep })),

  resetOrder: () => {
    set(initialState);
  },


  // Actions de Estudios
  saveSelectedLabItems: list => set(state => ({
    ...state,
    preselectedLabItems: list,
    selectedLabItems: list.map(item => ({
      name: item.name,
      code: item.code,
      unitPrice: item.price,
      itemCount: 1,
    })),
  })),

  saveTotalAmount: value => set(state => ({ ...state, totalAmountOrder: value })),


  // Actions de Clientes
  hideNewClientForm: () => set(state => ({ ...state, visibleNewClientForm: false })),

  showSearchClientResultStep: () => set(state => ({ ...state, visibleSearchClientResultStep: true })),

  showSearchClientResultPage: () => set(state => ({
    ...state,
    visibleSearchClientResultPage: true,
    visibleSearchClientFormPage: false,
    visibleRegisterClientFormPage: false,
  })),

  showSearchClientFormPage: () => set(state => ({
    ...state,
    visibleSearchClientResultPage: false,
    visibleSearchClientFormPage: true,
    visibleRegisterClientFormPage: false,
  })),

  showRegisterClientFormPage: () => set(state => ({
    ...state,
    visibleSearchClientResultPage: false,
    visibleSearchClientFormPage: false,
    visibleRegisterClientFormPage: true,
  })),
}));
