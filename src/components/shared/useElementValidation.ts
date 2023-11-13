import { _getValidationStrategy } from '../../utils/validation';

export const useElementValidation = () => {
  return {
    getValidationStrategy: _getValidationStrategy,
  };
};
