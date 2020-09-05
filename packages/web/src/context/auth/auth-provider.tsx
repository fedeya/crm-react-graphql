import { createContext, useState, Dispatch, SetStateAction } from 'react';

interface AuthState {
  token?: string;
  setToken: Dispatch<SetStateAction<string | undefined>>;
}

export const AuthContext = createContext({} as AuthState);

type AuthProviderProps = {
  initialToken?: string;
};

const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
  initialToken
}) => {
  const [token, setToken] = useState(initialToken);

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
