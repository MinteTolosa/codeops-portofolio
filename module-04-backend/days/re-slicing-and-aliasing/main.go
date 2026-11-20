package main

import "fmt"

func main() {

	prices := []int{18500, 12000, 24000, 4500}

	//Re-slicing means taking part of an existing slice.
	first2 := prices[0:2]

	//re-slicing does not create a new independent copy.
	//Both slices share the same underlying array is called aliasing.
	first2[0] = 8888

	//To solve aliasing problem we Use copy()

	safe := make([]int, len(prices))

	//copy() creates an independent copy when the destination has enough space.
	copy(safe, prices)

	safe[0] = 1

	fmt.Println("Re-slicing output", first2)
	fmt.Println("Aliasing Problem", prices)
	fmt.Println("Original slice output:", prices)
	fmt.Println("Solve aliasing using Copy:", safe)

	//Removing Element using append()

	menu := []string{"Doro", "Shiro", "Tibs", "Dulet"}

	i := 1

	menu = append(menu[:i], menu[i+1:]...)

	fmt.Println(menu)

	//Map in Go
	//Go Map store information usig Key-value pairs

	fees := map[string]int{
		"Bole":      3000,
		"Kazanchis": 3500,
		"Piassa":    4000,
		"Megenagna": 4500,
	}

	

	fmt.Println("The Value before Deleting Map:-", fees["Bole"])
	fmt.Println("The Value before Adding Ayat:-", fees["Ayat"])

	//Adding and Deleting map entries

	fees["Ayat"] = 5000
	delete(fees, "Bole")

	fmt.Println("The Value After Deleting Map:-", fees["Bole"])

	//The Comma-ok pattern

	fee, ok := fees["Ayat"]

	if !ok {
		fmt.Println("Area not supported")
	} else {
		fmt.Println("Ayat Delivery fee:", fee)
	}

	
}
