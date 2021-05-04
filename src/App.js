import './App.css';
import { Site } from './App/Site';

export default function App() {
 /* const [user, setUser] = useState(null)

   useEffect(function () {
    apiFetch('/login')
      .then(setUser)
      .catch(() => setUser(false))
  }, []) 

  if (user === null) {
    return null;
  }
*/
  return (
   <Site/>
  );
}