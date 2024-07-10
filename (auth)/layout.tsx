import React from "react";
import "./App.css";
import { dark, neobrutalism, shadesOfPurple } from '@clerk/themes';
import { ClerkProvider } from "@clerk/clerk-react";

if (!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}
const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

function App() {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: [dark, neobrutalism],
        variables: { colorPrimary: 'red' },
        signIn: {
          baseTheme: [shadesOfPurple],
          variables: { colorPrimary: 'blue' }
        }
      }}
      publishableKey={clerkPubKey}
    >
      <div>Hello from clerk</div>
    </ClerkProvider>
  );
}

export default App;