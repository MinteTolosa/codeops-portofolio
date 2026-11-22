package menu

type Dish struct {
	Name        string
	PriceSantim int
	IsFasting   bool
}

func Menu() []Dish {
	return []Dish{
		{Name: "Doro Wat", PriceSantim: 65000, IsFasting: false},
		{Name: "Shiro", PriceSantim: 12000, IsFasting: true},
		{Name: "Kitfo", PriceSantim: 24000, IsFasting: false},
		{Name: "Tibs", PriceSantim: 28000, IsFasting: false},
		{Name: "Misir Wat", PriceSantim: 15000, IsFasting: true},
		{Name: "Gomen", PriceSantim: 10000, IsFasting: true},
		{Name: "Firfir", PriceSantim: 18000, IsFasting: false},
		{Name: "Beyaynet", PriceSantim: 22000, IsFasting: true},
	}
}
