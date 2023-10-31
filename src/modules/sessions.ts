import type { BasisTheory as BasisTheoryType } from '@basis-theory/basis-theory-js/types/sdk';
import { logger } from '../utils/logging';

export const Sessions = (bt: BasisTheoryType) => {
  const create = async (apiKey?: string) => {
    try {
      const session = bt.sessions.create({
        apiKey,
      });

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
