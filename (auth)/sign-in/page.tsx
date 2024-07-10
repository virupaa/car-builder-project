import { SignIn } from '@clerk/nextjs';
import React from 'react';
import { dark } from "@clerk/themes";

const SignInPage = () => (
  <SignIn
    appearance={{
      baseTheme: dark
    }}
    path="/sign-in"
    signUpUrl="/sign-up"
  />
);

export default SignInPage;
