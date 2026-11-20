package main

import "fmt"

type Orders struct {
	Area string
	Paid bool
}

type Dish struct {
	Name        string
	PriceSantim int
	IsFasting   bool
}

type Order struct {
	Items []Dish
	Area  string
	paid  bool
}

	//Value receiver — (o Order)

func (o Order) subtotalSantim() int {
	total := 0
	for _, dish := range o.Items {
		total += dish.PriceSantim
	}
	return total
}

func markPaid(o *Orders) {
	o.Paid = true
}

func main() {

	//A struct: groups related information together under one name

	Shiro := Dish{
		Name:        "Shiro",
		PriceSantim: 15000,
		IsFasting:   true,
	}

	fmt.Println(Shiro.Name)
	fmt.Println(Shiro.PriceSantim)
	fmt.Println(Shiro.IsFasting)

	//Structs inside other structs

	order := Order{
		Items: []Dish{
			{Name: "Shiro", PriceSantim: 15000, IsFasting: true},
			{Name: "Dulet", PriceSantim: 25000, IsFasting: true},
		},
		Area: "Bole",
		paid: false,
	}

	fmt.Println(order)

	//A pointer is a variable that stores the memory address of another variable.

	price := 120000

	p := &price //&price - The memory address of price

	fmt.Println(price) //the actual prices value
	fmt.Println(p)     //A pointer holding that address
	fmt.Println(*p)    //The actual value at that address

	//Pointer one more Example

	order1 := Orders{Area: "Bole", Paid: false}

	markPaid(&order1)

	fmt.Println(order1.Paid)

	//method functions order 

	methodOrder := Order{
		Items: []Dish{
			{Name: "Shiro", PriceSantim: 12000},
			{Name: "Kitfo", PriceSantim: 24000},
		},
	}
	fmt.Println("Method Order subtotal value:",methodOrder.subtotalSantim())

}
