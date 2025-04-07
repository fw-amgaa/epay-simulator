export type Client = {
  created_at: string;
  updated_at: string;
  created_by: string;
  updated_by: null;
  status: boolean;
  id: number;
  code: string;
  bic: string;
  name: string;
  name_en: string;
  logo: null;
  website: null;
  phone: null;
  email: null;
  address: null;
  api_url: string;
  api_keys: ApiKey[];
};

export type ApiKey = {
  created_at: string;
  updated_at: string;
  created_by: string;
  updated_by: null;
  status: boolean;
  id: number;
  key: string;
};

// {
//   "_id": "67e5271db2af9b757671a5e1",
//   "customerName": "Enkhsod",
//   "customerCode": "10222",
//   "isMerchant": true,
//   "merchantCategoryCode": "8999",
//   "bankAccounts": [],
//   "__v": 0
// }

export type Customer = {
  _id: string;
  customerName: string;
  customerCode: string;
  isMerchant: boolean;
  merchantCategoryCode: string;
  bankAccounts: [];
};
