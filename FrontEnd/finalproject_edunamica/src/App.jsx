import React from 'react';
import Routing from "./Routes/Routing";
import { AdminProvider } from '../src/Components/Administration/AdminContext'; // Importa AdminContext
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <AdminProvider> {/* Asegúrate de envolver la aplicación solo una vez */}
      <div>
        <Routing />
      </div>
    </AdminProvider>
  );
}

export default App;

