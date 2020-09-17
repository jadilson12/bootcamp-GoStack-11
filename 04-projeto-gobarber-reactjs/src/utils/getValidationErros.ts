import { ValidationError } from 'yup';

interface Errors {
  [key: string]: string;
}
export default function getValidationErros(err: ValidationError): Errors {
  const validationErros: Errors = {};

  err.inner.forEach((erro) => {
    validationErros[erro.path] = erro.message;
  });

  return validationErros;
}
