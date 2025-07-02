import { Client, Databases, Storage, Account } from 'appwrite';

const client = new Client()
  .setEndpoint('https://fra.cloud.appwrite.io/v1')
  .setProject('685a704600120913310a');

export const databases = new Databases(client);
export const storage = new Storage(client);
export const account = new Account(client);

export const DATABASE_ID = '685a7f0b0034e8905cbd';
export const PRODUCTS_COLLECTION_ID = '685a7f2200073cc6330c';
export const ORDERS_COLLECTION_ID = '685a88fa000624533859';
export const USERS_COLLECTION_ID = '685a8e36000851e8ee55';
export const COVER_IMAGES_COLLECTION_ID = '685a8f0000281f69de7c';
export const BUCKET_ID = '685a8ec600281f69de6b';

export const API_KEY = 'standard_67534279340ede4c333e27a927fd8e35e343a228d9c95399dd115b8e67578f8fefc32268032b647bdff2217757a52bf3fdc97e221bd80861a71245ab617db70f45a86cbde3b869bc88f1dbd890165ef42aa443baea1bbbc781c2539d1f384391ff946ee8a8c2cdbffaa6cc01b7970b9159dc1df728d51fa7b219123f57f01acc'; 
