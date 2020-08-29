import { AuthChecker } from 'type-graphql';

import { Context } from '@Interfaces';

export const authChecker: AuthChecker<Context> = ({ context: { user } }) => {
  return user !== undefined;
};
