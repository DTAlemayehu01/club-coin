import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {PrivyProvider} from '@privy-io/react-auth';
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
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
