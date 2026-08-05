class Account:
    def __init__(self, owner, number, balance=0):
        self.owner = owner
        self.account_number = number
        self.__balance = balance

    @property
    def balance(self):
        return self.__balance

    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Amount must be positive")
        self.__balance += amount


# TODO: withdraw(amount) — reject overdrafts

    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError("Amount must be positive")
        elif amount > self.__balance:
            raise ValueError("Insufficient funds")
        self.__balance -= amount

# TODO: statement() — print owner, number, balance

    def statement(self):
        print(f"Owner: {self.owner}")
        print(f"Account Number: {self.account_number}")
        print(f"Balance: {self.__balance}")
        
############################################################
# Day 05 Class - Exercise Starting Her - The Account Family#
# ##########################################################        
class SavingsAccount(Account):
    def __init__(self, owner, number, balance=0, rate=0.05):
        super().__init__(owner, number, balance)
        self.rate = rate

    def add_interest(self):
        self.deposit(self.balance * self.rate)

class CurrentAccount(Account):
    def __init__(self, owner, number, balance=0, overdraft=1000):
        super().__init__(owner, number, balance)
        self.overdraft = overdraft
# TODO: override withdraw() to allow the overdraft
    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError("Amount must be positive")
        elif amount > self.__balance + self.overdraft:
            raise ValueError("Insufficient funds")
        self.__balance -= amount
# TODO: override statement() to label the account type
    def statement(self):
        print(f"Owner: {self.owner}")
        print(f"Account Number: {self.account_number}")
        print(f"Account Type: Current")
        print(f"Balance: {self.__balance}")
        print(f"Overdraft Limit: {self.overdraft}")
