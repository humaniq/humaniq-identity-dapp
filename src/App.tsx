import React, { useEffect } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./screens/home/Home";
import "./App.sass";
import routes from "./utils/routes";
import NotFound from "./screens/404/404";
import b from "buffer";
import { observer } from "mobx-react";
import { Layout } from "antd";
import { WalletNotConnected } from "./components/app/WalletNotConnected";
import { ProviderNotInjected } from "./components/app/ProviderNotInjected";
import { ETHProvider } from "./stores/provider/providerStore";

window.Buffer = b.Buffer;

export const getProviderStore = ETHProvider;

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return (
    <MuiAlert
      sx={{ borderColor: "white" }}
      elevation={6}
      ref={ref}
      variant="outlined"
      {...props}
    />
  );
});

export const App = observer(() => {
  useEffect(() => {
    (async () => {
      await getProviderStore.init();
    })();
  }, []);

  return (
    <div className="App">
      {getProviderStore.initialized ? (
        <Router>
          <Routes>
            <Route path={routes.home.path} element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      ) : null}
      <Snackbar
        open={app.alert.displayAlert}
        autoHideDuration={6000}
        onClose={app.alert.alertClose}
        style={{ backgroundColor: "white" }}
      >
        <Alert
          onClose={app.alert.alertClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          {app.alert.alertMessage}
        </Alert>
      </Snackbar>
    </div>
  );
});
