package main

import "fmt"

func main() {
	dishes := []string{
		"Doro Wat",
		"Shiro",
		"ዶሮ ወጥ",
		"ሽሮ",
		"በያይነት",
	}

	for _, dish := range dishes {
		byteLength := len(dish)
		runeCount := len([]rune(dish))

		fmt.Println("Dish:", dish)
		fmt.Println("Bytes:", byteLength)
		fmt.Println("Characters:", runeCount)

		if runeCount <= 20 {
			fmt.Println("Fits 20-character field: Yes")
		} else {
			fmt.Println("Fits 20-character field: No")
		}

		fmt.Println("----------------")
	}
}
