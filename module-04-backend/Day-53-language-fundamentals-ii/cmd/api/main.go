package main

import (
	"fmt"
	"github.com/MinteTolosa/addis-eats-backend/internal/order"
)

func main() {
    fmt.Println("Addis Eats Day 53")
	order.PrintReceipt(12000, 3, "Bolee")
}