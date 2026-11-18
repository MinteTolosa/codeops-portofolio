package main

import "fmt"

func lineTotal(priceSantim, qty int) int {
	return priceSantim * qty
}

// Returning Result and Error
//Two or three return values are normal.
//If a function needs to return more than three values, consider returning a struct instead.

func deliveryFeeSantim(area string) (fee int, err error) {

	switch area {
	case "Bole":
		return 3000, err
	case "Garment":
		return 2500, err
	}
	return 0, fmt.Errorf("unsaved area %q", area)
}

//Variadic Parameter - allow a function to recive many values.

func sumSantim(amounts ...int) int {
	total := 0

	for _, amount := range amounts {
		total += amount
	}
	return total
}

//A variadic parameter must be the last parameter in a function.
//func printOrder(customer string, prices ...int) {
// ...
//}

func main() {
	TotalDelivery := lineTotal(15500000, 2)

	fmt.Println("Total delivery:", TotalDelivery)

	fee, err := deliveryFeeSantim("Megenagna")

	if err != nil {
		fmt.Println("Deliver failed:", err)
	} else {
		fmt.Println("Delivery Fee:", fee)
	}
	fmt.Println(deliveryFeeSantim("Garment"))

	fmt.Println("***** A variadic Parameter Result ******")
	fmt.Println(sumSantim(100000, 300000, 200000, 500000))
}
