import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { authenticationService } from "./services/authentication.service";

import Homepage from "./pages/Homepage";
import CreateLoan from "./pages/CreateLoan";
import Login from "./pages/Login";
import Register from "./pages/Register";

import "./App.css";

const { checkJWT, refreshAuthToken } = authenticationService;

const queryClient = new QueryClient();

const ProtectedRoute = ({ ...props }) => {
  const isTokenValid = checkJWT();
  refreshAuthToken();
  return isTokenValid ? <Route {...props} /> : <Redirect to="/login" />;
};

const UnprotectedRoute = ({ ...props }) => {
  const isTokenValid = checkJWT();
  return !isTokenValid ? <Route {...props} /> : <Redirect to="/" />;
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="wrapper">
        <BrowserRouter>
          <Switch>
            <ProtectedRoute path="/" exact>
              <Homepage />
            </ProtectedRoute>
            <ProtectedRoute path="/createLoan" exact>
              <CreateLoan />
            </ProtectedRoute>
            <UnprotectedRoute path="/login" exact>
              <Login />
            </UnprotectedRoute>
            <UnprotectedRoute path="/register" exact>
              <Register />
            </UnprotectedRoute>
          </Switch>
        </BrowserRouter>
      </div>
    </QueryClientProvider>
  );
}
export default App;
