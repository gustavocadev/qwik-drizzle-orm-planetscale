// src/lucia.d.ts
/// <reference types="lucia-auth" />
declare namespace Lucia {
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  type Auth = import('./lib/lucia.js').Auth;
  type UserAttributes = {
    username: string;
    names: string;
    last_names: string;
  };
}
