import React from 'react';
import { cookies } from 'next/headers';

export default async function CheckOut() {

    const cookieStore = await cookies();
    const session = cookieStore.get('session');
  return (
    <main>
    <div>Checkout Pages</div>
    {
      session ? (<p>You are welcome</p>) : (<p>You have to log in to welcomed.</p>)
    }
    </main>
  )
}
