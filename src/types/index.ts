import { z } from 'zod';
import {
  ClientFormSchema, ClientSchema, DocTypeSchema, NewHealthOrderSchema,
  HealthOrderSchema, LabItemSchema, OrderStatusSchema, SearchDocFormSchema,
  SelectedLabItemSchema,
} from '@/src/schema';

export type DocTypes = z.infer<typeof DocTypeSchema>

export type OrderStatus = z.infer<typeof OrderStatusSchema>

export type SearchDocFormData = z.infer<typeof SearchDocFormSchema>

export type Client = z.infer<typeof ClientSchema>

export type ClientFormData = z.infer<typeof ClientFormSchema>

export type LabItem = z.infer<typeof LabItemSchema>

export type SelectedLabItem = z.infer<typeof SelectedLabItemSchema>

export type NewHealthOrder = z.infer<typeof NewHealthOrderSchema>

export type HealthOrder = z.infer<typeof HealthOrderSchema>

export type reponseMeta = {
    page: string;
    take: string;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
}

export type OrderClient = {
    id: string;
    firstName: string;
    lastName: string;
}

export type Order = {
    id: string;
    currency: string;
    totalAmount: string;
    createdAt: string;
    executedAt: string;
    status: string;
    client?: OrderClient;
  }

export type OrdersResponse = {
    data: Order[];
    meta: reponseMeta;
  }
