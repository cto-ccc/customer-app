
import { CommonContext, CommonProvider } from './contexts/CommonContext';

import AnimatedRoutes from './components/AnimatedRoutes';
import { AuthContextProvider } from './contexts/AuthContext';

function App() {
  

  return (
    <CommonProvider>
      <AuthContextProvider>
      <AnimatedRoutes />
      </AuthContextProvider>
    </CommonProvider>
  );
}

export default App;
