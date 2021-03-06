export interface Url {
  name: string;
  address: string;
  description?: string;
  lastVisit: number;
}

export function isUrl(object: any): object is Url {
  return 'name' in object
    && 'address' in object
    && 'lastVisit' in object;
}
