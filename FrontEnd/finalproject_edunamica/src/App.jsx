import React from 'react';
import Routing from "./Routes/Routing";
import { UserProvider } from '../src/Components/Administration/AdminContext'; // Cambia a UserContext
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <UserProvider> {/* Asegúrate de envolver la aplicación solo una vez */}
      <div>
        <Routing />
      </div>
    </UserProvider>
  );
}

export default App;


