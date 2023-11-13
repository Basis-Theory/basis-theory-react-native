import type { BasisTheory as BasisTheoryType } from '@basis-theory/basis-theory-js/types/sdk';
import { logger } from '../utils/logging';

export const Sessions = (bt: BasisTheoryType) => {
  const create = async () => {
    try {
      const session = await bt.sessions.create();

      logger.log.info('Session created');

      return session;
    } catch (error) {
      logger.log.error('Error while creating session', error as Error);
    }
  };

  return {
    create,
  };
};
