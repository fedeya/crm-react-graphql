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

export type OrderProduct = {
  __typename?: 'OrderProduct';
  id: Scalars['ID'];
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

export type Product = {
  __typename?: 'Product';
  id: Scalars['ID'];
  name: Scalars['String'];
  quantity: Scalars['Int'];
  price: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

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


export type QueryUserArgs = {
  token: Scalars['String'];
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
  id: Scalars['String'];
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

export type ProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type ProductsQuery = (
  { __typename?: 'Query' }
  & { products: Array<(
    { __typename?: 'Product' }
    & Pick<Product, 'name' | 'quantity' | 'id' | 'price'>
  )> }
);


export const ProductsDocument = gql`
    query Products {
  products {
    name
    quantity
    id
    price
  }
}
    `;

export function useProductsQuery(options: Omit<Urql.UseQueryArgs<ProductsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ProductsQuery>({ query: ProductsDocument, ...options });
};