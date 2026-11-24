package main

import "fmt"

func main() {
	// Example 1: Slice aliasing
	fmt.Println("EXAMPLE 1: SLICE ALIASING")

	prices := []int{100, 200, 300}
	firstTwo := prices[:2]

	fmt.Println("Original prices:", prices)
	fmt.Println("First two prices:", firstTwo)

	firstTwo[0] = 999

	fmt.Println("After changing firstTwo:", firstTwo)
	fmt.Println("Original prices also changed:", prices)

	// Example 2: Fix aliasing with copy
	fmt.Println("\nEXAMPLE 2: USING COPY")

	original := []int{100, 200, 300}
	safeCopy := make([]int, len(original))

	copy(safeCopy, original)

	safeCopy[0] = 999

	fmt.Println("Original slice:", original)
	fmt.Println("Copied slice:", safeCopy)

	// Example 3: Remove an item by index
	fmt.Println("\nEXAMPLE 3: REMOVE BY INDEX")

	dishes := []string{"Doro Wat", "Shiro", "Kitfo", "Tibs"}

	fmt.Println("Before removal:", dishes)

	index := 1
	dishes = append(dishes[:index], dishes[index+1:]...)

	fmt.Println("After removal:", dishes)
}
