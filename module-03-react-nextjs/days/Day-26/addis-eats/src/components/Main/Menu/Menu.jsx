import './Menu.css'

function Menu() {
  const cards = [1, 2, 3, 4]

  return (
    <section>
      <p>main</p>
      <div className="menu-grid">
        {cards.map((card) => (
          <div className="menu-card" key={card}></div>
        ))}
      </div>
    </section>
  )
}

export default Menu