package main

import (
	"fmt"
)

type BankAccount struct {
	Owner 	string
	Balance float64
}

func (b *BankAccount) Deposit(amount float64) {
	if amount > 0 {
		b.Balance += amount
		fmt.Printf("successfuly Deposited: $%.2f your Balance: $%.2f\n",  amount, b.Balance)
	}	else { fmt.Println("Deposit amount must be positive.")}
}

func (b *BankAccount) withdraw(amount float64) {
	if amount >= b.Balance {

		fmt.Printf("Insufficient funds! Current balance is only $%.2f\n", b.Balance )
	
		} else if amount <= 0 {

			fmt.Println("Withdrawal amount must be positive.")

		} else
		 {	
			b.Balance -= amount
			fmt.Printf("Withdrew $%.2f. Remaining balance: $%.2f\n", amount, b.Balance)
	}
}

func (b BankAccount) CheckBalance() {
	fmt.Printf("Account Owner: %s | Current Balance: $%.2f\n", b.Owner, b.Balance)
}

func main() {
	account := BankAccount{Owner: "Mintesinot", Balance: 10000000.00}

	account.CheckBalance()
	account.Deposit(50000.00)
	account.withdraw(30000.00)
	account.withdraw(100000000.00)
}