import { Client, reponseMeta, SearchDocFormData } from '../types';


interface ClientSearchResponse {
    data: Client[];
    meta: reponseMeta;
}

interface CreateClientResponse {
    success: boolean;
    response: string
}


export default class ClientFacade {
  private apiUrl: string;

  constructor() {
    this.apiUrl = process.env.CEMEVYF_HEALTH_ORDERS_API_URL || 'http://localhost:9900';
  }


  // Funcion para buscar un cliente por ID
  async getClientById(id: string): Promise<Client | string> {
    try {
      const response = await fetch(`${this.apiUrl}/clients/${id}`, {
        method: 'GET',
        redirect: 'follow',
      });

      if (!response.ok) {
        throw new Error(`Error al obtener el cliente: ${response.status} ${response.statusText}`);
      }

      const data = await response.json() as Client;
      return data;
    } catch (error) {
      return `Error al obtener el cliente:: ${error}`;
    }
  }


  // Funcion para buscar varios clientes.
  async getClients(
    page: number = 1,
    pageSize: number = 10,
  ): Promise<ClientSearchResponse | string> {
    try {
      const response = await fetch(
        `${this.apiUrl}/clients?page=${page}&take=${pageSize}`,
        {
          method: 'GET',
          redirect: 'follow',
        },
      );

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      const { data } = result;
      const { meta } = result;
      return { data, meta };
    } catch (error) {
      return `Error al obtener los clientes: ${error}`;
    }
  }


  // Funcion para buscar varios clientes por tipo y número de documento.
  async getClientsByDoc(
    dataForm: SearchDocFormData,
    page: number = 1,
    pageSize: number = 10,
  ): Promise<ClientSearchResponse | string> {
    let queryParams = '';

    // Construya los parámetros de consulta en función a los parametros dados
    if (dataForm.personIdType?.trim()) {
      queryParams += `personIdType=${dataForm.personIdType}&`;
    }
    if (dataForm.personId?.trim()) {
      queryParams += `personId=${dataForm.personId}&`;
    }

    try {
      const response = await fetch(
        `${this.apiUrl}/clients?${queryParams}&page=${page}&take=${pageSize}`,
        {
          method: 'GET',
          redirect: 'follow',
        },
      );

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      const { data } = result;
      const { meta } = result;
      return { data, meta };
    } catch (error) {
      return `Error al obtener los clientes: ${error}`;
    }
  }


  // Funcion para buscar varios clientes por el nombre.
  async getClientsByFirstName(
    firstName: string,
    page: number = 1,
    pageSize: number = 10,
  ): Promise<ClientSearchResponse | string> {
    let queryParams = '';

    // Construya los parámetros de consulta en función a los parametros dados
    if (firstName?.trim()) {
      queryParams += `firstName=${firstName}&`;
    }

    try {
      const response = await fetch(
        `${this.apiUrl}/clients?${queryParams}&page=${page}&take=${pageSize}`,
        {
          method: 'GET',
          redirect: 'follow',
        },
      );

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      const { data } = result;
      const { meta } = result;
      return { data, meta };
    } catch (error) {
      return `Error al obtener los clientes: ${error}`;
    }
  }


  // Funcion para buscar varios clientes por el apellido.
  async getClientsByLastName(
    lastName: string,
    page: number = 1,
    pageSize: number = 10,
  ): Promise<ClientSearchResponse | string> {
    let queryParams = '';

    // Construya los parámetros de consulta en función a los parametros dados
    if (lastName?.trim()) {
      queryParams += `lastName=${lastName}&`;
    }

    try {
      const response = await fetch(
        `${this.apiUrl}/clients?${queryParams}&page=${page}&take=${pageSize}`,
        {
          method: 'GET',
          redirect: 'follow',
        },
      );

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      const { data } = result;
      const { meta } = result;
      return { data, meta };
    } catch (error) {
      return `Error al obtener los clientes: ${error}`;
    }
  }


  // Funcion para agregar un nuevo cliente
  async createClient(clientData: Client): Promise<CreateClientResponse> {
    try {
      // Crear el cliente
      const raw = JSON.stringify(clientData);

      const response = await fetch(`${this.apiUrl}/clients`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: raw,
        redirect: 'follow',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`${response.status} ${response.statusText} - ${errorData.message}`);
      }

      const data = await response.json();

      return { success: true, response: data.id };
    } catch (error) {
      return { success: false, response: `Error al crear el cliente: ${error}` };
    }
  }
}
