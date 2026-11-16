package main

import (
	"fmt"
	"strconv"
)

// If statement

func main() {
	subtotalSantim := 70000
	feeSantim := 30000

	if subtotalSantim >= 50000 {
		feeSantim = 0

	}

	fmt.Println(feeSantim)

	// if, else if, and else

	area := "kazanchis"
	feeSantim = 0

	if area == "Bole" {
		feeSantim = 3000
	} else if area == "kazanchis" {
		feeSantim = 3500
	} else if area == "Piassa" {
		feeSantim = 4000
	} else if area == "Mexico" {
		feeSantim = 2500
	} else {
		feeSantim = 4500
	}

	fmt.Println(feeSantim)

	input := "3"

	if qty, err := strconv.Atoi(input); err == nil && qty > 0 {
		fmt.Println("Valid quantity:", qty)
	}

	if subtotalSantim >= 80000 {
		feeSantim = 4000
	} else if area == "kazanchis" {
		feeSantim = 1000
	} else if area == "Garment" {
		feeSantim = 7000
	} else {
		feeSantim = 10000
	}

	fmt.Println(feeSantim)

	// for loop Repeating a fixed number

	for i := 0; i <= 5; i++ {
		fmt.Println("The Result output:", i)
	}

	// for loop repeat when the codition is true

	remaining := 1500

	for remaining > 0 {
		remaining -= 500
		fmt.Println("The Remaining resulet:", remaining)
	}

	// for loop repeat forever

	for {
		fmt.Printf("waiting for a breaks\n")

		break
	}

	// Range

	dishes := []string{"Doro Wat", "Shiro", "Tibs"}

	for index, dish := range dishes {
		fmt.Println(index, dish)
	}

	Prices := []int{35000, 40000, 25000}

	for i, price := range Prices {
		fmt.Printf("%d: %.2f ETB\n", i, float64(price)/100)
	}

	//the range with a Map

	fees := map[string]int{
		"Bole":   3000,
		"Piassa": 4000,
	}

	for area, fee := range fees {
		fmt.Println(area, fee)
	}

	//for loops that do subTotal

	pricess := []int{10000, 20000, 30000}
	subtotal := 0

	for _, price := range pricess {
		subtotal += price
	}

	fmt.Println("The Result of Subtotal: ", subtotal)

	// Switch - Choose between several options

	switch area {
	case "Bole":
		feeSantim = 3000
	case "kazanchis":
		feeSantim = 4500
	case "Garment":
		feeSantim = 2500
	default:
		feeSantim = 5000
	}
	fmt.Println("Swith selection: ", feeSantim)
}
