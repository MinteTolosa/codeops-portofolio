import React from 'react'

export default function loading() {
  return (
    <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
       {Array.from({ length: 6 }).map((_, index) => (
    <div key={index} className="overflow-hidden rounded-xl border border-[#6f6252]/30 bg-[#211b15]">
    </div>
          ))}
        </div>
  )
}
