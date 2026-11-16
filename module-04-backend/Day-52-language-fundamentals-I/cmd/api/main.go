package main

import (
	"fmt"
	"strings"
)

// Naming Standard
// Var/fun -  camelCase -> Private/local for the module
//           -  PascalCase -> Exporter

func main() {

	area := "Bole"
	deliveryFeeSantim := 0
	subtotalSantim := 0
	ratePct := 5.0
	phone := "0923409005"

	dishes := []string{
		"Doro Wat",
		"Shiro",
		"Tibs",
		"Injera Basket",
	}
	prices := []int{
		18500,
		12000,
		24000,
		4500,
	}

	for i, dish := range dishes {
		price := float64(prices[i]) / 100

		fmt.Printf("%s: %.2f ETB\n", dish, price)
	}

	for _, price := range prices {
		subtotalSantim += price
	}

	serviceFeeSantim := int(float64(subtotalSantim) * ratePct / 100)

	fmt.Println("subTotal:", subtotalSantim, "Santim")
	fmt.Println("Serice Fee:", serviceFeeSantim, "santim")

	switch area {
	case "Bole":
		deliveryFeeSantim = 2000
	case "Garment":
		deliveryFeeSantim = 1200
	case "Germen":
		deliveryFeeSantim = 1000
	default:
		deliveryFeeSantim = 3000
	}

	if subtotalSantim >= 50000 {
		deliveryFeeSantim = 0
	}
	fmt.Println("Delivery Fee Based on area:", deliveryFeeSantim, "santim")

	grandTotalSantim := subtotalSantim + serviceFeeSantim + deliveryFeeSantim

	fmt.Println("Grand Total:", grandTotalSantim, "Santim")
	fmt.Printf("Grand Total %.2f ETB\n", float64(grandTotalSantim)/100)

	if strings.HasPrefix(phone, "09") {
		fmt.Println("Customer Phone Number:", phone)
	} else {
		fmt.Println("Invalid phone number")
	}
}
