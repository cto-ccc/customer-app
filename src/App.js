
import { CommonContext, CommonProvider } from './contexts/CommonContext';

import AnimatedRoutes from './components/AnimatedRoutes';
import { AuthContextProvider } from './contexts/AuthContext';
import TagManager from 'react-gtm-module'
import { useEffect } from 'react';

function App() {
  
  useEffect(() => {
    TagManager.initialize({
      gtmId: 'GTM-WMJMQ9M'
    })
  }, [])

  return (
    <CommonProvider>
      <AuthContextProvider>
      <AnimatedRoutes />
      </AuthContextProvider>
    </CommonProvider>
  );
}

export default App;
