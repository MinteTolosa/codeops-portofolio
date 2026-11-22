package main

import "strconv"

func parseQty(input string) (int, error) {
	n, err := strconv.Atoi(input)

	if err != nil {
		return 0, err
	}

	return n, nil
}

func main() {
	quantity, err := parseQty("5")

	if err != nil {
		println("Error:", err.Error())
		return
	}

	println("Quantity:", quantity)
}
