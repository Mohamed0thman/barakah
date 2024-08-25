import { AxiosError } from "axios";

export type APIError = {
  code: number;
  message: string;
  status: string;
  errors?: { [x: string]: string };
};
export type ErrorType = AxiosError<APIError>;
