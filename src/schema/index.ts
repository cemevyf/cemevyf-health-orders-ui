import { z } from 'zod';

// Define una función que devuelve un esquema de string con las validaciones básicas.
const baseString = (maxLength: number, requiredMessage: string) => z
  .string()
  .regex(/^[a-zA-Z0-9\s\-_.@´]+$/, 'Caracteres inválidos detectados.')
  .max(maxLength, `Exceso de caracteres, máximo ${maxLength}.`)
  .min(3, requiredMessage)
  .transform(val => val.trim());

// Define un esquema de string seguro con las validaciones básicas.
const safeString = (maxLength: number, requiredMessage: string) => baseString(maxLength, requiredMessage);

// Define un esquema de string para números de teléfono.
const phoneNumberString = z
  .string()
  .regex(/^[0-9+\s\-]+$/, 'Caracteres inválidos detectados.')
  .max(20, 'Exceso de caracteres.')
  .transform(val => val.trim());


export const DocTypeSchema = z.object({
  abbr: z.string(),
  name: z.string(),
  value: z.string(),
});

export const OrderStatusSchema = z.object({
  name: z.string(),
  value: z.string(),
});

export const SearchDocFormSchema = z.object({
  personIdType: z.string(),
  personId: safeString(50, 'Número de documento es requerido.'),
});

export const ClientSchema = z.object({
  id: z.string(),
  firstName: safeString(200, 'Nombre es requerido.'),
  lastName: safeString(200, 'Apellido es requerido.'),
  personIdType: safeString(50, 'Tipo de documento es requerido.'),
  personId: safeString(50, 'Número de documento es requerido.'),
  externalId: z.string(),
  booklyId: z.string(),
  phoneNumber: phoneNumberString,
  email: z
    .string()
    .email('Correo electrónico inválido.')
    .max(100, 'Exceso de caracteres.')
    .transform(val => val.trim()),
});

export const ClientFormSchema = ClientSchema.pick({
  firstName: true, lastName: true, personIdType: true, personId: true, email: true, phoneNumber: true,
});

export const LabItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  code: z.string(),
  price: z.number(),
});

export const SelectedLabItemSchema = z.object({
  code: z.string(),
  name: z.string(),
  unitPrice: z.number(),
  itemCount: z.number(),
});

export const ItemsOrder = SelectedLabItemSchema.extend({
  totalPrice: z.number(),
});

export const NewHealthOrderSchema = z.object({
  clientId: z.string(),
  totalAmount: z.string(),
  currency: z.string(),
  quotationItems: z.array(SelectedLabItemSchema),
});

export const HealthOrderSchema = z.object({
  createdAt: z.string(),
  currency: z.string(),
  id: z.string(),
  items: z.array(ItemsOrder),
  sendMail: z.boolean(),
  status: z.string(),
  totalAmount: z.number(),
});
