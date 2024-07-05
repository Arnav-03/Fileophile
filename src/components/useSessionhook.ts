import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useUserContext } from '@/context/userContext'; 
import axios from 'axios';

const useSetUser = () => {
  const { data: session, status } = useSession();
  const { setUser } = useUserContext();

  useEffect(() => {
    const checkAndSetUser = async () => {
      if (status === "authenticated" && session?.user) {
        if (session.user) {
          const userdata = {
            email: session.user.email ?? "",
            username: session.user.name ?? ""
          };
          setUser(userdata);
          
          try {
            // Check if user exists in the database
            const response = await axios.post('/api/users/checkOrCreate', userdata);
/*             console.log('User checked/created:', response.data);
 */          } catch (error) {
            console.error('Error checking/creating user:', error);
          }
        }
      } else {
/*         console.log("not logged in");
 */      }
    };

    checkAndSetUser();
  }, [session, status, setUser]);
};

export default useSetUser;
