export interface ResponseModels<T> {
    body?: T;
    errors?: ErrorModel[];
    warnings?: WarningModel[];
  }
  
  export interface ErrorModel {
    code?: string;    // Si en C# también manejas un "code"
    message: string;
  }
  
  export interface WarningModel {
    code?: string;
    message: string;
  }