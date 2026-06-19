
import { useEffect } from 'react';
import { getMe } from '../api/auth.api'
import {useAuth} from '../hooks/useAuth'


const AuthInitializer = ({ children }) => {
  const { setUser, setIsAuthLoading } = useAuth();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const response = await getMe();
        setUser(response.data);
      } catch {
        setUser(null);
      }finally {
        setIsAuthLoading(false);
      }
    }
    initializeAuth();
  }, []);

  return children;
};

export default AuthInitializer;