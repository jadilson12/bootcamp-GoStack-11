import React from 'react';
import SignIn from './pages/SignIn';

import GlobalStyle from './styles/global';

import { AuthProvider } from './hooks/AuthContex';

const App: React.FC = () => (
  <>
    <AuthProvider>
      <SignIn />
    </AuthProvider>

    {/* <SignUp /> */}
    <GlobalStyle />
  </>
);

export default App;
