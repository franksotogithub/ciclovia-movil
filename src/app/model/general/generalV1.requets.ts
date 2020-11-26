export interface GeneralV1Request<T> {
    status_code: number;
    message: string;
    result?: T;
    errors?: any;
  }
  