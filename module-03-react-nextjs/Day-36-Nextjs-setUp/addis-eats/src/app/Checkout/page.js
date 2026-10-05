import React from 'react';
import { cookies } from 'next/headers';

export default async function Checkoutpage() {

  const cookieStore = await cookies();
  const session = cookieStore.get('session');
  return (
    <main>
      <h1>Checkout</h1>
      {
        session 
        ? (<p>Your are logged in</p>)
        : (<p>please log in</p>)
      }
    </main>
  );
}
