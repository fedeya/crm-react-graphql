import { useContext, useEffect } from 'react';
import { UseMutationResponse, UseQueryResponse, UseQueryArgs } from 'urql';

import { AuthContext } from '../context/auth/auth-provider';

type Mutation<T, R> = () => UseMutationResponse<T, R>;

export function useAuthMutation<T, R>(
  fn: Mutation<T, R>
): UseMutationResponse<T, R> {
  const { token } = useContext(AuthContext);
  const [result, mutation] = fn();

  const runMutation = (variables: R | undefined) => {
    return mutation(variables, {
      fetchOptions: {
        headers: {
          authorization: token ?? ''
        }
      }
    });
  };

  return [result, runMutation];
}

interface QueryVariables {
  [x: string]: never;
}

type Query<T> = (
  options: Omit<UseQueryArgs<QueryVariables>, 'query'>
) => UseQueryResponse<T>;

export function useAuthQuery<T>(
  fn: Query<T>,
  pause: boolean = false
): UseQueryResponse<T> {
  const { token } = useContext(AuthContext);
  const query = fn({
    context: { fetchOptions: { headers: { authorization: token ?? '' } } },
    pause: !(typeof window === 'undefined')
  });

  useEffect(() => {
    if (!pause) {
      query[1]();
    }
  }, []);

  return query;
}
