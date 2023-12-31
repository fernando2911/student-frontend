import { Routes, Route, Navigate } from "react-router-dom";
import Students from "./src/pages/Students/page";
import SignIn from "./src/pages/SignIn/page";

type PrivateWrapperProps = {
  children: React.ReactNode;
};

const PrivateWrapper: React.FC<PrivateWrapperProps> = ({ children }) => {
  const token = sessionStorage.getItem('token');

  if (token) {
    return children;
  } else {
    return <Navigate to="/login" replace />;
  }
};

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<PrivateWrapper><Students /></PrivateWrapper>} />
      <Route path="/estudantes" element={<PrivateWrapper><Students /></PrivateWrapper>} />
      <Route path="/login" element={<SignIn />} />
    </Routes>
  );
}
