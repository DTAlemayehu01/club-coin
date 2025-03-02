import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {PrivyProvider} from '@privy-io/react-auth';
import App from './App.tsx'

//const ENV_APP_ID = import.meta.env.VITE_PRIVY_API_ID;

{/* No idea why API env doesn't work here*/}
createRoot(document.getElementById('root')!).render(
  //const apiKey = import.meta.env.VITE_PRIVY_APP_ID;
  <StrictMode>
    <PrivyProvider
      appId={"cm7qn7t0h00j4ybsvx75rn9rv"}
      config={{
        loginMethods: ['email', 'wallet'],
        embeddedWallets: {
          createOnLogin: "all-users",
        },
      }}
    >
		<App />
    </PrivyProvider>
  </StrictMode>,
)
