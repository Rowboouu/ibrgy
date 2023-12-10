import Homepage from "./pages/Homepage"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import AboutUs from "./pages/AboutUs";
import Citizens from "./pages/Citizens";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import CommonRoute from "./components/CommonRoute";
import AdminLandingpage from "./pages/AdminLandingpage";
import CedulaUpdate from "./screens/admin/CedulaUpdate";
import Cedula from "./screens/admin/Cedula";
import ClearanceUpdate from "./screens/admin/ClearanceUpdate";
import ResidencyUpdate from "./screens/admin/ResidencyUpdate";
import IndigencyUpdate from "./screens/admin/IndigencyUpdate";
import UploadModal from "./components/UploadModal";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={
              <PrivateRoute>
                <Homepage />
              </PrivateRoute>
            } />
            <Route path="/login" element={
              <PrivateRoute>
                <Login />
              </PrivateRoute>
            } />
            <Route path="/signup" element={
              <PrivateRoute>
                <Signup />
              </PrivateRoute>
            } />
            <Route path="/about-us" element={
              <CommonRoute>
                <AboutUs />
              </CommonRoute>

            } />
            <Route path="/citizens-charter" element={
              <CommonRoute>
                <Citizens />
              </CommonRoute>

            } />
            <Route path="/services" element={
              <CommonRoute>
                <Services />
              </CommonRoute>
            } />
            <Route path="/contact-us" element={
              <CommonRoute>
                <Contact />
              </CommonRoute>
            } />
            <Route path="/test-cedula" element={ <CedulaUpdate /> }/>
            <Route path="/test-clearance" element={ <ClearanceUpdate /> }/>
            <Route path="/test-residency" element={ <ResidencyUpdate /> }/>
            <Route path="/test-indigency" element={ <IndigencyUpdate /> }/>
            <Route path="/test-upload" element={ <UploadModal /> }/>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
