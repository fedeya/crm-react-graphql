import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Token = {
  __typename?: 'Token';
  token: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  name: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};


export type Client = {
  __typename?: 'Client';
  id: Scalars['ID'];
  name: Scalars['String'];
  lastName: Scalars['String'];
  company: Scalars['String'];
  phone: Scalars['String'];
  email: Scalars['String'];
  salesman: User;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type Product = {
  __typename?: 'Product';
  id: Scalars['ID'];
  name: Scalars['String'];
  quantity: Scalars['Int'];
  price: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type OrderProduct = {
  __typename?: 'OrderProduct';
  id: Scalars['ID'];
  product: Product;
  quantity: Scalars['Int'];
};

export type Order = {
  __typename?: 'Order';
  id: Scalars['ID'];
  order: Array<OrderProduct>;
  total: Scalars['Int'];
  client: Client;
  salesman: User;
  state: OrderState;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export enum OrderState {
  Pending = 'PENDING',
  Completed = 'COMPLETED',
  Canceled = 'CANCELED'
}

export type TopClient = {
  __typename?: 'TopClient';
  total: Scalars['Int'];
  client: Client;
};

export type TopSeller = {
  __typename?: 'TopSeller';
  total: Scalars['Int'];
  seller: User;
};

export type AuthInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type UserInput = {
  name: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type ClientInput = {
  name: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  company: Scalars['String'];
  phone: Scalars['String'];
};

export type OrderProductInput = {
  id: Scalars['ID'];
  quantity: Scalars['Int'];
};

export type OrderInput = {
  order: Array<OrderProductInput>;
  total: Scalars['Float'];
  client: Scalars['ID'];
  state?: Maybe<OrderState>;
};

export type ProductInput = {
  name: Scalars['String'];
  quantity: Scalars['Int'];
  price: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  clients: Array<Client>;
  client: Client;
  orders: Array<Order>;
  order: Order;
  products: Array<Product>;
  product: Product;
  searchProduct: Array<Product>;
  topClients: Array<TopClient>;
  topSellers: Array<TopSeller>;
  users: Array<User>;
  user: User;
};


export type QueryClientArgs = {
  id: Scalars['ID'];
};


export type QueryOrdersArgs = {
  state?: Maybe<OrderState>;
};


export type QueryOrderArgs = {
  id: Scalars['ID'];
};


export type QueryProductArgs = {
  id: Scalars['ID'];
};


export type QuerySearchProductArgs = {
  text: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  login: Token;
  register: Token;
  createClient: Client;
  updateClient: Client;
  deleteClient: Client;
  createOrder: Order;
  updateOrder: Order;
  deleteOrder: Order;
  createProduct: Product;
  updateProduct: Product;
  deleteProduct: Product;
};


export type MutationLoginArgs = {
  input: AuthInput;
};


export type MutationRegisterArgs = {
  input: UserInput;
};


export type MutationCreateClientArgs = {
  input: ClientInput;
};


export type MutationUpdateClientArgs = {
  input: ClientInput;
  id: Scalars['ID'];
};


export type MutationDeleteClientArgs = {
  id: Scalars['ID'];
};


export type MutationCreateOrderArgs = {
  input: OrderInput;
};


export type MutationUpdateOrderArgs = {
  input: OrderInput;
  id: Scalars['ID'];
};


export type MutationDeleteOrderArgs = {
  id: Scalars['ID'];
};


export type MutationCreateProductArgs = {
  input: ProductInput;
};


export type MutationUpdateProductArgs = {
  input: ProductInput;
  id: Scalars['ID'];
};


export type MutationDeleteProductArgs = {
  id: Scalars['ID'];
};

export type CreateClientMutationVariables = Exact<{
  input: ClientInput;
}>;


export type CreateClientMutation = (
  { __typename?: 'Mutation' }
  & { createClient: (
    { __typename?: 'Client' }
    & Pick<Client, 'id' | 'name' | 'lastName' | 'company' | 'email' | 'phone'>
  ) }
);

export type CreateOrderMutationVariables = Exact<{
  input: OrderInput;
}>;


export type CreateOrderMutation = (
  { __typename?: 'Mutation' }
  & { createOrder: (
    { __typename?: 'Order' }
    & Pick<Order, 'id' | 'total' | 'state'>
    & { order: Array<(
      { __typename?: 'OrderProduct' }
      & Pick<OrderProduct, 'id' | 'quantity'>
      & { product: (
        { __typename?: 'Product' }
        & Pick<Product, 'id' | 'name'>
      ) }
    )>, client: (
      { __typename?: 'Client' }
      & Pick<Client, 'id' | 'name' | 'lastName' | 'email' | 'phone'>
    ), salesman: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name'>
    ) }
  ) }
);

export type CreateProductMutationVariables = Exact<{
  input: ProductInput;
}>;


export type CreateProductMutation = (
  { __typename?: 'Mutation' }
  & { createProduct: (
    { __typename?: 'Product' }
    & Pick<Product, 'id' | 'name' | 'price' | 'quantity'>
  ) }
);

export type DeleteClientMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteClientMutation = (
  { __typename?: 'Mutation' }
  & { deleteClient: (
    { __typename?: 'Client' }
    & Pick<Client, 'id'>
  ) }
);

export type DeleteOrderMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteOrderMutation = (
  { __typename?: 'Mutation' }
  & { deleteOrder: (
    { __typename?: 'Order' }
    & Pick<Order, 'id'>
  ) }
);

export type DeleteProductMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteProductMutation = (
  { __typename?: 'Mutation' }
  & { deleteProduct: (
    { __typename?: 'Product' }
    & Pick<Product, 'id'>
  ) }
);

export type LoginMutationVariables = Exact<{
  input: AuthInput;
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'Token' }
    & Pick<Token, 'token'>
  ) }
);

export type RegisterMutationVariables = Exact<{
  input: UserInput;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'Token' }
    & Pick<Token, 'token'>
  ) }
);

export type UpdateClientMutationVariables = Exact<{
  id: Scalars['ID'];
  input: ClientInput;
}>;


export type UpdateClientMutation = (
  { __typename?: 'Mutation' }
  & { updateClient: (
    { __typename?: 'Client' }
    & Pick<Client, 'id' | 'name' | 'lastName' | 'company' | 'email' | 'phone'>
  ) }
);

export type UpdateOrderMutationVariables = Exact<{
  id: Scalars['ID'];
  input: OrderInput;
}>;


export type UpdateOrderMutation = (
  { __typename?: 'Mutation' }
  & { updateOrder: (
    { __typename?: 'Order' }
    & Pick<Order, 'id' | 'total' | 'state'>
    & { order: Array<(
      { __typename?: 'OrderProduct' }
      & Pick<OrderProduct, 'id' | 'quantity'>
      & { product: (
        { __typename?: 'Product' }
        & Pick<Product, 'id' | 'name'>
      ) }
    )>, client: (
      { __typename?: 'Client' }
      & Pick<Client, 'id' | 'name' | 'lastName' | 'email' | 'phone'>
    ), salesman: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name'>
    ) }
  ) }
);

export type UpdateProductMutationVariables = Exact<{
  id: Scalars['ID'];
  input: ProductInput;
}>;


export type UpdateProductMutation = (
  { __typename?: 'Mutation' }
  & { updateProduct: (
    { __typename?: 'Product' }
    & Pick<Product, 'id' | 'name' | 'price' | 'quantity'>
  ) }
);

export type ClientQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ClientQuery = (
  { __typename?: 'Query' }
  & { client: (
    { __typename?: 'Client' }
    & Pick<Client, 'id' | 'name' | 'lastName' | 'company' | 'email' | 'phone'>
  ) }
);

export type ClientsQueryVariables = Exact<{ [key: string]: never; }>;


export type ClientsQuery = (
  { __typename?: 'Query' }
  & { clients: Array<(
    { __typename?: 'Client' }
    & Pick<Client, 'id' | 'name' | 'lastName' | 'company' | 'email' | 'phone'>
  )> }
);

export type OrdersQueryVariables = Exact<{ [key: string]: never; }>;


export type OrdersQuery = (
  { __typename?: 'Query' }
  & { orders: Array<(
    { __typename?: 'Order' }
    & Pick<Order, 'id' | 'total' | 'state'>
    & { order: Array<(
      { __typename?: 'OrderProduct' }
      & Pick<OrderProduct, 'id' | 'quantity'>
      & { product: (
        { __typename?: 'Product' }
        & Pick<Product, 'id' | 'name'>
      ) }
    )>, client: (
      { __typename?: 'Client' }
      & Pick<Client, 'id' | 'name' | 'lastName' | 'email' | 'phone'>
    ), salesman: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name'>
    ) }
  )> }
);

export type ProductQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ProductQuery = (
  { __typename?: 'Query' }
  & { product: (
    { __typename?: 'Product' }
    & Pick<Product, 'id' | 'name' | 'quantity' | 'price'>
  ) }
);

export type ProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type ProductsQuery = (
  { __typename?: 'Query' }
  & { products: Array<(
    { __typename?: 'Product' }
    & Pick<Product, 'id' | 'name' | 'quantity' | 'price'>
  )> }
);

export type UserQueryVariables = Exact<{ [key: string]: never; }>;


export type UserQuery = (
  { __typename?: 'Query' }
  & { user: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name'>
  ) }
);


export const CreateClientDocument = gql`
    mutation CreateClient($input: ClientInput!) {
  createClient(input: $input) {
    id
    name
    lastName
    company
    email
    phone
  }
}
    `;

export function useCreateClientMutation() {
  return Urql.useMutation<CreateClientMutation, CreateClientMutationVariables>(CreateClientDocument);
};
export const CreateOrderDocument = gql`
    mutation CreateOrder($input: OrderInput!) {
  createOrder(input: $input) {
    id
    order {
      id
      product {
        id
        name
      }
      quantity
    }
    client {
      id
      name
      lastName
      email
      phone
    }
    salesman {
      id
      name
    }
    total
    state
  }
}
    `;

export function useCreateOrderMutation() {
  return Urql.useMutation<CreateOrderMutation, CreateOrderMutationVariables>(CreateOrderDocument);
};
export const CreateProductDocument = gql`
    mutation CreateProduct($input: ProductInput!) {
  createProduct(input: $input) {
    id
    name
    price
    quantity
  }
}
    `;

export function useCreateProductMutation() {
  return Urql.useMutation<CreateProductMutation, CreateProductMutationVariables>(CreateProductDocument);
};
export const DeleteClientDocument = gql`
    mutation DeleteClient($id: ID!) {
  deleteClient(id: $id) {
    id
  }
}
    `;

export function useDeleteClientMutation() {
  return Urql.useMutation<DeleteClientMutation, DeleteClientMutationVariables>(DeleteClientDocument);
};
export const DeleteOrderDocument = gql`
    mutation DeleteOrder($id: ID!) {
  deleteOrder(id: $id) {
    id
  }
}
    `;

export function useDeleteOrderMutation() {
  return Urql.useMutation<DeleteOrderMutation, DeleteOrderMutationVariables>(DeleteOrderDocument);
};
export const DeleteProductDocument = gql`
    mutation DeleteProduct($id: ID!) {
  deleteProduct(id: $id) {
    id
  }
}
    `;

export function useDeleteProductMutation() {
  return Urql.useMutation<DeleteProductMutation, DeleteProductMutationVariables>(DeleteProductDocument);
};
export const LoginDocument = gql`
    mutation Login($input: AuthInput!) {
  login(input: $input) {
    token
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const RegisterDocument = gql`
    mutation Register($input: UserInput!) {
  register(input: $input) {
    token
  }
}
    `;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const UpdateClientDocument = gql`
    mutation UpdateClient($id: ID!, $input: ClientInput!) {
  updateClient(id: $id, input: $input) {
    id
    name
    lastName
    company
    email
    phone
  }
}
    `;

export function useUpdateClientMutation() {
  return Urql.useMutation<UpdateClientMutation, UpdateClientMutationVariables>(UpdateClientDocument);
};
export const UpdateOrderDocument = gql`
    mutation UpdateOrder($id: ID!, $input: OrderInput!) {
  updateOrder(id: $id, input: $input) {
    id
    order {
      id
      product {
        id
        name
      }
      quantity
    }
    client {
      id
      name
      lastName
      email
      phone
    }
    salesman {
      id
      name
    }
    total
    state
  }
}
    `;

export function useUpdateOrderMutation() {
  return Urql.useMutation<UpdateOrderMutation, UpdateOrderMutationVariables>(UpdateOrderDocument);
};
export const UpdateProductDocument = gql`
    mutation UpdateProduct($id: ID!, $input: ProductInput!) {
  updateProduct(id: $id, input: $input) {
    id
    name
    price
    quantity
  }
}
    `;

export function useUpdateProductMutation() {
  return Urql.useMutation<UpdateProductMutation, UpdateProductMutationVariables>(UpdateProductDocument);
};
export const ClientDocument = gql`
    query Client($id: ID!) {
  client(id: $id) {
    id
    name
    lastName
    company
    email
    phone
  }
}
    `;

export function useClientQuery(options: Omit<Urql.UseQueryArgs<ClientQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ClientQuery>({ query: ClientDocument, ...options });
};
export const ClientsDocument = gql`
    query Clients {
  clients {
    id
    name
    lastName
    company
    email
    phone
  }
}
    `;

export function useClientsQuery(options: Omit<Urql.UseQueryArgs<ClientsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ClientsQuery>({ query: ClientsDocument, ...options });
};
export const OrdersDocument = gql`
    query Orders {
  orders {
    id
    order {
      id
      product {
        id
        name
      }
      quantity
    }
    client {
      id
      name
      lastName
      email
      phone
    }
    salesman {
      id
      name
    }
    total
    state
  }
}
    `;

export function useOrdersQuery(options: Omit<Urql.UseQueryArgs<OrdersQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<OrdersQuery>({ query: OrdersDocument, ...options });
};
export const ProductDocument = gql`
    query Product($id: ID!) {
  product(id: $id) {
    id
    name
    quantity
    price
  }
}
    `;

export function useProductQuery(options: Omit<Urql.UseQueryArgs<ProductQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ProductQuery>({ query: ProductDocument, ...options });
};
export const ProductsDocument = gql`
    query Products {
  products {
    id
    name
    quantity
    price
  }
}
    `;

export function useProductsQuery(options: Omit<Urql.UseQueryArgs<ProductsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ProductsQuery>({ query: ProductsDocument, ...options });
};
export const UserDocument = gql`
    query User {
  user {
    id
    name
  }
}
    `;

export function useUserQuery(options: Omit<Urql.UseQueryArgs<UserQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<UserQuery>({ query: UserDocument, ...options });
};