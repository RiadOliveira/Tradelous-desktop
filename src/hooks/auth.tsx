import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import api from '../services/api';

interface IUserData {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  password?: string;
  companyId?: string;
  isAdmin: boolean;
}

interface IAuthProps {
  user: IUserData;
  token: string;
}

interface IUpdateUserData {
  name: string;
  email: string;
  oldPassword?: string;
  newPassword?: string;
}

type SignInData = Pick<IUserData, 'email' | 'password'>;

interface IAuthContextData extends IAuthProps {
  signIn(data: SignInData): Promise<void>;
  updateUser(userData: IUpdateUserData): Promise<void>;
  setUserCompany(isAdmin: boolean, companyId?: string): void;
  updateUsersAvatar(avatar?: File): Promise<void>;
  signOut(): void;
}

const authContext = createContext<IAuthContextData>({} as IAuthContextData);

const AuthContext: React.FC = ({ children }) => {
  const [authData, setAuthData] = useState<IAuthProps>({} as IAuthProps);

  useEffect(() => {
    const user = localStorage.getItem('@Tradelous-user');
    const token = localStorage.getItem('@Tradelous-token');

    if (user && token) {
      setAuthData({
        user: JSON.parse(user),
        token,
      });

      api.defaults.headers.authorization = `Bearer ${token}`;
    }
  }, []);

  const signIn = useCallback(async (data: SignInData) => {
    const response = await api.post<IAuthProps>('/user/sessions', data);
    const { token } = response.data;

    api.defaults.headers.authorization = `Bearer ${token}`;

    localStorage.setItem('@Tradelous-user', JSON.stringify(response.data.user));
    localStorage.setItem('@Tradelous-token', token);

    setAuthData(response.data);
  }, []);

  const updateUser = useCallback(async (userData: IUpdateUserData) => {
    const response = await api.put('/user', userData);

    localStorage.setItem('@Tradelous-user', JSON.stringify(response.data));

    setAuthData(actualData => ({
      user: response.data,
      token: actualData.token,
    }));
  }, []);

  const updateUsersAvatar = useCallback(
    async (file?: File) => {
      let data;

      if (file) {
        data = new FormData();

        data.append('avatar', file);
      }

      const {
        data: { avatar },
      } = await api.patch('/user/update-avatar', data);

      localStorage.setItem(
        '@Tradelous-user',
        JSON.stringify({
          ...authData.user,
          avatar,
        }),
      );

      setAuthData(value => {
        return {
          ...value,
          user: {
            ...value.user,
            avatar,
          },
        };
      });
    },
    [authData.user],
  );

  const setUserCompany = useCallback(
    (isAdmin: boolean, companyId?: string) => {
      localStorage.setItem(
        '@Tradelous-user',
        JSON.stringify({ ...authData.user, isAdmin, companyId }),
      );

      setAuthData(data => {
        return {
          ...data,
          user: {
            ...data.user,
            isAdmin,
            companyId,
          },
        };
      });
    },
    [authData.user],
  );

  const signOut = useCallback(() => {
    localStorage.removeItem('@Tradelous-user');
    localStorage.removeItem('@Tradelous-token');

    api.defaults.headers.authorization = undefined;

    setAuthData({} as IAuthProps);
  }, []);

  return (
    <authContext.Provider
      value={{
        user: authData.user,
        token: authData.token,
        signIn,
        signOut,
        updateUser,
        setUserCompany,
        updateUsersAvatar,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

const useAuth = (): IAuthContextData => useContext(authContext);

export { AuthContext, useAuth };
