import { _getValidationStrategy } from '../../utils/validation';

export const useElementValidation = () => ({
  getValidationStrategy: _getValidationStrategy,
});
