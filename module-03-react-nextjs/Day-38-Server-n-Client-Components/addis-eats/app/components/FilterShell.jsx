'use client'
import React from 'react'

export default function FilterShell({children}) {
    const [selectedCategory, setSelectedCategory] = useState('All');

  return (
    <div>
        <div className='mb-8 flex flex-wrap gap-3'>
            {["All", "Starter", "Main course","Deserte", "Beverage"]
            .map((category)=>(
                <button key={category} onClick={()=>setSelectedCategory(category)}
                className={`rounded-full px-4 py-2 ${selectedCategory === category
                    ? "bg-[#c9a96e] text-[#17130f]"
                    : "border border-[#6f6252] text-[#b8afa3]"
                }`} >
                {category}
                </button>
            ))}
        </div>
        {children}
    </div>
  );
}
