'use client';
import { useState } from 'react';

export default function TestButton() {

    const [count, setCount] = useState(0);

    return (
        <button onclick = {() => setCount(count + 1)} >
            Add-to-cart ({count})
        </button>
    )
     
}