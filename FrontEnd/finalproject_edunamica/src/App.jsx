import React from 'react';
import Routing from "./Routes/Routing";
import { UserProvider } from '../src/Components/Administration/AdminContext'; // UserContext
import { AuthProvider } from '../src/Components/AuthContext'; // AuthContext

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <AuthProvider> {/* Proveedor del contexto de autenticación */}
      <UserProvider> {/* Proveedor del contexto de usuario */}
        <div>
          <Routing />
        </div>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;



