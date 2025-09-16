import AppRoutes from "./routes/index.jsx"; // Definición de rutas
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from "./context/AuthContext.jsx";
const App = () => {
    return (
        <>
          <AuthProvider>
            <div>
              <ToastContainer />
              <AppRoutes />
            </div>
          </AuthProvider>
        </>
    );
}

export default App;