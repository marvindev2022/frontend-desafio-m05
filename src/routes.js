import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Main from "./pages/Main/Main";
import Signin from "./pages/Signin/Signin";
import { getItem } from "./utils/storage";
import SignUp from "./pages/Signup/Signup";

function ProtectedRoutes({ redirectTo }) {
  const token = getItem("token");
  return token ? <Outlet /> : <Navigate to={redirectTo} />;
}

function MainRoutes() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route  path="/signin" element={<Signin />} />
        <Route path="/signup" element={<SignUp />} />

        <Route element={<ProtectedRoutes redirectTo="/signin" />}>
          <Route path="/main" element={<Main />} />
          <Route path="*" element={<Main />} />
        </Route>
      </Routes>
    </>
  );
}

export default MainRoutes;
