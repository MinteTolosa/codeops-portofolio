package main

import (
	"fmt"
	"time"
)

type BankAccount struct {
	Owner   string
	Balance float64
	History []string
}

func (b *BankAccount) Deposit(amount float64) {
	if amount > 0 {
		b.Balance += amount
		timestamp := time.Now().Format("2006-01-02 15:04:05")
		log := fmt.Sprintf("[%s] Deposited: +$%.2f | Balance: $%.2f", timestamp, amount, b.Balance)
		b.History = append(b.History, log)

		fmt.Printf("successfuly Deposited: $%.2f your Balance: $%.2f\n", amount, b.Balance)
	} else {
		fmt.Println("Deposit amount must be positive.")
	}
}

func (b *BankAccount) withdraw(amount float64) {
	if amount >= b.Balance {

		fmt.Printf("Insufficient funds! Current balance is only $%.2f\n", b.Balance)

	} else if amount <= 0 {

		fmt.Println("Withdrawal amount must be positive.")

	} else {
		b.Balance -= amount
		timestamp := time.Now().Format("2006-01-02 15:04:05")
		log := fmt.Sprintf("[%s] Withdrew: -$%.2f | Balance: $%.2f", timestamp, amount, b.Balance)
		b.History = append(b.History, log)

		fmt.Printf("Withdrew $%.2f. Remaining balance: $%.2f\n", amount, b.Balance)
	}
}
func (b *BankAccount) Transfer(recipient *BankAccount, amount float64) {
	if amount <= 0 {
		fmt.Printf("Transfer amount must be Postive.")
	} else if amount > b.Balance {
		fmt.Printf("Transfer failed: %s only has $%.2f.\n", b.Owner, b.Balance)
	} else {
		b.Balance -= amount
		recipient.Balance += amount

		timestamp := time.Now().Format("2006-01-02 15:04:05")

		senderLog := fmt.Sprintf("[%s] Transferred -$%.2f to %s | Balance: $%.2f", timestamp, amount, recipient.Owner, b.Balance)
		b.History = append(b.History, senderLog)

		receiverLog := fmt.Sprintf("[%s] Received +$%.2f from %s | Balance: $%.2f", timestamp, amount, b.Owner, recipient.Balance)
		recipient.History = append(recipient.History, receiverLog)

		fmt.Printf("Transferred $%.2f from %s to %s.\n", amount, b.Owner, recipient.Owner)
	}
}

func (b BankAccount) PrintHistory() {
	fmt.Printf("\n=== Transaction History for %s (Current Balance: $%.2f) ===\n", b.Owner, b.Balance)
	if len(b.History) == 0 {
		fmt.Println("No transactions recorded yet.")
		return
	}
	for i, entry := range b.History {
		fmt.Printf("%d. %s\n", i+1, entry)
	}
}

func (b BankAccount) CheckBalance() {
	fmt.Printf("Account Owner: %s | Current Balance: $%.2f\n", b.Owner, b.Balance)
}

func main() {
	Mintesinot := BankAccount{Owner: "Mintesinot", Balance: 10000000.00}
	Abel := BankAccount{Owner: "Abel", Balance: 50000}

	Mintesinot.Transfer(&Abel, 60000)

	Mintesinot.CheckBalance()
	Abel.CheckBalance()

	Mintesinot.Deposit(50000.00)
	Mintesinot.withdraw(30000.00)
	Mintesinot.withdraw(100000000.00)

	Mintesinot.PrintHistory()
	Abel.PrintHistory()
}
