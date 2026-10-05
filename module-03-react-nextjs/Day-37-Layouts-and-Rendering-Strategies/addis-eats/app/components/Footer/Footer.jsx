export default function Footer() {
  return (
    <footer className="mt-20 border-t border-line bg-brand-100">
      <div className="container-page grid gap-8 py-12 md:grid-cols-4">
        <div>
          <h3 className="font-display text-xl font-bold text-brand-700">
            Addis-Eats
          </h3>
          <p className="mt-3 text-sm leading-6 text-muted">
            Sharing traditions from the Ethiopian highlands — one Gursha at a time.
          </p>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider">Hospitality Hours</h4>
          <p className="mt-3 text-sm leading-6 text-muted">
            Tuesday – Sunday: 11:30 AM – 11:00 PM
            <br />
            Monday: Reserved for Private Banquets
          </p>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider">Dietary Traditions</h4>
          <p className="mt-3 text-sm leading-6 text-muted">
            Vegan Fasting (Beyaynetu / Tsom)
            <br />
            Traditional Prime Meat Feasts
            <br />
            House Tej & Coffee Ceremony
          </p>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider">Addis Location</h4>
          <p className="mt-3 text-sm leading-6 text-muted">
            Bole Medhanialem, Addis Ababa
            <br />
            Express delivery across town
          </p>
          <p className="mt-2 flex items-center gap-2 font-bold text-brand-700">  
            +251 923 409 005
          </p>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-page flex flex-col justify-between gap-2 py-4 text-xs text-muted sm:flex-row">
          <span>© 2025 Habesha-Restaurant Your Dining.</span>
          <span className="flex gap-4">

          </span>
        </div>
      </div>
    </footer>
  );
}