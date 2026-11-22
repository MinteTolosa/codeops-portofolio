package main

import (
	"errors"
	"fmt"

	"github.com/MinteTolosa/addis-eats-backend/internal/delivery"
	"github.com/MinteTolosa/addis-eats-backend/internal/menu"
	"github.com/MinteTolosa/addis-eats-backend/internal/order"
)

func main() {
	dishes := menu.Menu()

	// Valid order
	validOrder := order.Order{
		Area: "Bole",
	}

	validOrder.AddItem(dishes[0])
	validOrder.AddItem(dishes[1])

	fmt.Println("VALID ORDER")
	fmt.Println("Subtotal:", validOrder.SubtotalSantim(), "santim")

	total, err := validOrder.TotalSantim()
	if err != nil {
		fmt.Println("Error:", err)
	} else {
		fmt.Println("Total:", total, "santim")
	}

	// Empty order
	emptyOrder := order.Order{
		Area: "Bole",
	}

	fmt.Println("\nEMPTY ORDER")
	_, err = emptyOrder.TotalSantim()

	if errors.Is(err, order.ErrEmptyOrder) {
		fmt.Println("Cannot calculate total: order is empty")
	}

	// Unserved area
	unservedOrder := order.Order{
		Items: []menu.Dish{dishes[0]},
		Area:  "Ayat",
	}

	fmt.Println("\nUNSERVED AREA")
	_, err = unservedOrder.TotalSantim()

	if errors.Is(err, delivery.ErrUnservedArea) {
		fmt.Println("Sorry, we do not deliver to this area")
	} else if err != nil {
		fmt.Println("Error:", err)
	}
}
