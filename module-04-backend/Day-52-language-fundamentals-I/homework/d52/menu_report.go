package main

import "fmt"

func main() {

	totalPrice := 0
	fastingCount := 0
	nonFastingCount := 0

	dishes := []string{
		"Doro Wat",
		"Shiro",
		"Tibs",
		"Misir Wat",
		"Kitfo",
		"Gomen",
		"Firfir",
		"Beyaynetu",
	}

	prices := []int{
		18500,
		12000,
		24000,
		10000,
		22000,
		9000,
		8500,
		15000,
	}

	fasting := []bool{
		false,
		true,
		false,
		true,
		false,
		true,
		true,
		true,
	}

	cheapest := prices[0]
	mostExpensive := prices[0]
	cheapestDish := dishes[0]
	mostExpensiveDish := dishes[0]

	for i, price := range prices {
		if price < cheapest {
			cheapest = price
			cheapestDish = dishes[i]
		}
		if price > mostExpensive {
			mostExpensive = price
			mostExpensiveDish = dishes[i]
		}
	}

	for _, price := range prices {
		totalPrice += price
	}

	averagePrice := totalPrice / len(prices)

	for i, dish := range dishes {
		fmt.Println(dish, prices[i], "santim", "Fasting:", fasting[i])
	}

	for _, isFasting := range fasting {
		if isFasting {
			fastingCount++
		} else {
			nonFastingCount++
		}
	}

	fmt.Println("Cheapest dish:", cheapestDish, cheapest, "santim")
	fmt.Println("Most expensive dish:", mostExpensiveDish, mostExpensive, "santim")
	fmt.Println("Total price:", totalPrice, "santim")
	fmt.Println("Average price:", averagePrice, "santim")
	fmt.Printf("Average price: %.2f ETB\n", float64(averagePrice)/100)
	fmt.Println("Fasting dishes:", fastingCount)
	fmt.Println("Non-fasting dishes:", nonFastingCount)
}
