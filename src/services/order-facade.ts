import { promises } from 'dns';
import { HealthOrder, NewHealthOrder, OrdersResponse } from '../types';


interface UpdateOrderStatusResponse {
    success: boolean;
    response: string
}

interface getOrderStatusByIdResponse {
    success: boolean;
    response: string
}


export default class OrderFacade {
  private apiUrl: string;

  constructor() {
    this.apiUrl = process.env.CEMEVYF_HEALTH_ORDERS_API_URL || '';
  }


  // Funcion para crear una nueva orden
  async createOrder(order: NewHealthOrder): Promise<HealthOrder | string> {
    try {
      const raw = JSON.stringify(order);
      const response = await fetch(`${this.apiUrl}/health-orders`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: raw,
          redirect: 'follow',
        });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`${response.status} ${response.statusText} - ${errorData.message}`);
      }

      const result = await response.json() as HealthOrder;
      return result;
    } catch (error) {
      return `Error al crear la orden ${error}`;
    }
  }


  // Funcion para obtener una orden por ID
  async getOrderById(id: string): Promise<HealthOrder | string> {
    try {
      const response = await fetch(`${this.apiUrl}/health-orders/${id}`,
        {
          method: 'GET',
          redirect: 'follow',
        });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`${response.status} ${response.statusText} - ${errorData.message}`);
      }

      const result = await response.json() as HealthOrder;
      return result;
    } catch (error) {
      return `Error al obtener la orden ${error}`;
    }
  }


  // Funcion para obtener varias ordenes
  async getOrders(
    dateFrom: string = '',
    dateTo: string = '',
    currency: string = 'ARS',
    page: number = 1,
    take: number = 10,
  ): Promise<OrdersResponse | string> {
    try {
      const queryParams = new URLSearchParams({
        dateFrom,
        dateTo,
        currency,
        page: page.toString(),
        take: take.toString(),
      });

      const response = await fetch(`${this.apiUrl}/health-orders?${queryParams.toString()}`,
        {
          method: 'GET',
          redirect: 'follow',
        });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`${response.status} ${response.statusText} - ${errorData.message}`);
      }

      const result = await response.json();
      return result as OrdersResponse;
    } catch (error) {
      return `Error al obtener la lista de órdenes: ${error}`;
    }
  }


  // Función para actualizar el estado de una orden
  async updateOrderStatus(id: string): Promise<UpdateOrderStatusResponse> {
    try {
      const order = await this.getOrderById(id);
      if (typeof order === 'string') {
        throw new Error(order);
      }

      let newStatus = '';
      switch (order.status) {
        case 'quoted':
          newStatus = 'executed';
          break;
        case 'executed':
          newStatus = 'pending_results';
          break;
        case 'pending_results':
          newStatus = 'results_done';
          break;
        default:
          throw new Error('Estado de la orden no válido');
      }

      const raw = JSON.stringify({ status: newStatus });

      const response = await fetch(`${this.apiUrl}/health-orders/${id}/status`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: raw,
          redirect: 'follow',
        });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`${response.status} ${response.statusText} - ${errorData.message}`);
      }

      return { success: true, response: `Estado de la orden actualizado a ${newStatus}` };
    } catch (error) {
      return { success: false, response: `Error al actualizar el estado de la orden: ${error}` };
    }
  }

  // Para obtener el status de una ordenen especifico
  async getOrderStatusById(id : string) : Promise<getOrderStatusByIdResponse> {
    try {
      const order = await this.getOrderById(id);
      if (typeof order === 'string') {
        throw new Error(order);
      }
      return { success: true, response: order.status };
    } catch (error) {
      return { success: false, response: `Error fetching order status: ${error}` };
    }
  }

  // Para adjuntar un archivo y unas notas a una orden.
  async addPrescription(id: string, file: File, additionalNotes: string): Promise<{ success: boolean; response: string }> {
    try {
      const formData = new FormData();

      formData.append('file', file);
      formData.append('additionalNotes', additionalNotes);

      const response = await fetch(`${this.apiUrl}/health-orders/${id}/prescription`, {
        method: 'POST',
        body: formData,
        redirect: 'follow',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`${response.status} ${response.statusText} - ${errorData.message}`);
      }

      const result = await response.json();
      return { success: true, response: `El archivo se subió correctamente con el ID: ${result.id}` };
    } catch (error) {
      return { success: false, response: `Error al subir los archivos: ${error}` };
    }
  }
}
