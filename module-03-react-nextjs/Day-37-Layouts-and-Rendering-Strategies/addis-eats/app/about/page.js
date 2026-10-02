import React from 'react'

export default async function AboutPage() {
    const info = await getRestaurantInfo();
  return (
     <article>{info.story}</article>
  )
}
