import React from "react";
import {useHistory} from "react-router-dom";
import {Auth0Provider, AppState,} from "@auth0/auth0-react";

const Auth0ProviderWithHistory: React.FC = ({children}) => {
  const history = useHistory();
  const domain = String(process.env.REACT_APP_AUTH0_DOMAIN);
  const clientId = String(process.env.REACT_APP_AUTH0_CLIENT_ID);
  const audience = String(process.env.REACT_APP_AUTH0_AUDIENCE);

  const onRedirectCallback = (appState: AppState) => {
    history.push(appState?.returnTo || window.location.pathname);
  };
  return (
      <Auth0Provider
          domain={domain}
          clientId={clientId}
          redirectUri={window.location.origin}
          onRedirectCallback={onRedirectCallback}
          audience={audience}
      >
        {children}
      </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;
