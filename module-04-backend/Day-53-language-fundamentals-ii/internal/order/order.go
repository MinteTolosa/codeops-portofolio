package order

import (
	"fmt"

)

func lineTotal(priceSantim, qty int) int{
	return priceSantim * qty
}

func serviceFeeSantim(subtotal int) int{
	return subtotal * 5/100
}

func deliveryFeeSantim(area string) (int, error) {
	switch area{
	case "Bole":
		return 3000, nil
	case "4Kilo":
		return 2000, nil
	case "Mekanisa":
		return 2000, nil
	case "Mexico":
		return 3000, nil
	case "Megenagna":
		return 4000, nil
	default:
		return 0, fmt.Errorf("unsaved area %q", area)
	}	
}

func PrintReceipt(priceSantim, qty int, area string) {

	subtotal := lineTotal(priceSantim, qty)
	serviceFee := serviceFeeSantim(subtotal)

	deliveryFee, err := deliveryFeeSantim(area)

	if err != nil {
		fmt.Println("Delivery error:", err)
		return
	}

	total := subtotal + serviceFee + deliveryFee

	fmt.Println("----- Addis Eats Receipt -----")
	fmt.Println("Subtotal:", subtotal, "santim")
	fmt.Println("Service fee:", serviceFee, "santim")
	fmt.Println("Delivery fee:", deliveryFee, "santim")
	fmt.Println("Total:", total, "santim")
}
