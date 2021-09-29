import React from 'react';
import getValidationErrors from 'utils/getValidationErrors';
import * as yup from 'yup';

import { FormHandles } from '@unform/core';

interface IToastText {
  main: string;
  sub: string;
}

const ErrorCatcher = (
  err: Error | yup.ValidationError,
  formRef: React.RefObject<FormHandles>,
): IToastText => {
  if (err instanceof yup.ValidationError) {
    const validationErrors = getValidationErrors(err);

    const validationKeys = Object.keys(validationErrors);

    formRef.current?.setErrors(validationErrors);

    return {
      main: 'Problema na validação',
      sub: validationErrors[validationKeys[0]],
    };
  }

  return {
    main: 'Problema inesperado',
    sub: 'Ocorreu alguma falha, por favor, tente novamente',
  };
};

export default ErrorCatcher;
