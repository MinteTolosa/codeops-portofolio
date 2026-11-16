package main

import "fmt"

func main() {
	areas := []string{
		"Bole",
		"Kazanchis",
		"Piassa",
		"Megenagna",
	}

	subtotals := []int{
		10000,
		30000,
		60000,
	}

	for _, area := range areas {
		for _, subtotal := range subtotals {
			deliveryFee := 0

			switch area {
			case "Bole":
				deliveryFee = 3000
			case "Kazanchis":
				deliveryFee = 3500
			case "Piassa":
				deliveryFee = 4000
			case "Megenagna":
				deliveryFee = 4500
			default:
				deliveryFee = 5000
			}
			if subtotal >= 50000 {
				deliveryFee = 0
			}
			grandTotal := subtotal + deliveryFee

			fmt.Println("Area:", area)
			fmt.Println("Subtotal:", subtotal, "santim")
			fmt.Println("Delivery fee:", deliveryFee, "santim")
			fmt.Println("Grand total:", grandTotal, "santim")
			fmt.Println("-----------------------")
			fmt.Println(area, "Subtotal:", subtotal, "Delivery:", deliveryFee)

		}
	}
}
