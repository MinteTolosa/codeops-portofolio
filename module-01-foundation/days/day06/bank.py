class BankConfig:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.interest_rate = 0.05
            cls._instance.overdraft_limit = 1000
        return cls._instance

class Account:
    def __init__(self, owner, number, balance=0):
        self.owner = owner
        self.account_number = number
        self._balance = balance
        self._observers = []

    @property
    def balance(self):
        return self._balance

    def subscribe(self, observer):
        if observer not in self._observers:
            self._observers.append(observer)

    def _notify(self, transaction_type, amount):
        for observer in self._observers:
            observer.update(self, transaction_type, amount)

    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Amount must be positive")
        self._balance += amount
        self._notify("deposit", amount)

    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError("Amount must be positive")
        if amount > self._balance:
            raise ValueError("Insufficient funds")
        self._balance -= amount
        self._notify("withdrawal", amount)

    def statement(self):
        print(f"Owner: {self.owner}")
        print(f"Account Number: {self.account_number}")
        print(f"Balance: ${self._balance:.2f}")

class SavingsAccount(Account):
    def __init__(self, owner, number, balance=0, rate=None):
        super().__init__(owner, number, balance)
        config = BankConfig()
        self.rate = rate if rate is not None else config.interest_rate

    def add_interest(self):
        interest = self.balance * self.rate
        self.deposit(interest)

    def statement(self):
        print("Savings Account Statement")
        super().statement()
        print(f"Interest Rate: {self.rate * 100}%")

class CurrentAccount(Account):
    def __init__(self, owner, number, balance=0, overdraft=None):
        super().__init__(owner, number, balance)
        config = BankConfig()
        self.overdraft = overdraft if overdraft is not None else config.overdraft_limit

    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError("Amount must be positive")
        if amount > self._balance + self.overdraft:
            raise ValueError("Insufficient funds (Overdraft exceeded)")
        self._balance -= amount
        self._notify("withdrawal", amount)

    def statement(self):
        print("Current Account Statement")
        print(f"Owner: {self.owner}")
        print(f"Account Number: {self.account_number}")
        print(f"Balance: ${self._balance:.2f}")
        print(f"Overdraft Limit: ${self.overdraft:.2f}")

class AccountFactory:
    @staticmethod
    def create(kind, owner, number, balance=0):
        kind = kind.lower().strip()
        if kind == "savings":
            return SavingsAccount(owner, number, balance)
        elif kind == "current":
            return CurrentAccount(owner, number, balance)
        else:
            raise ValueError(f"Unknown account type: '{kind}'")


# ==========================================
# Observers (Fulfilling SRP for alerts)
# ==========================================

class SMSAlert:
    def update(self, account, transaction_type, amount):
        print(f"[SMS ALERT] Notification sent to {account.owner}: "
              f"A {transaction_type} of ${amount:.2f} was made on account {account.account_number}. "
              f"New Balance: ${account.balance:.2f}")

class AuditLog:
    def update(self, account, transaction_type, amount):
        print(f"[AUDIT LOG] Log entry generated -> Account: {account.account_number} | "
              f"Action: {transaction_type.upper()} | Amount: ${amount:.2f} | "
              f"Final Balance: ${account.balance:.2f}")

sms_service = SMSAlert()
logger = AuditLog()

savings = AccountFactory.create("savings", "Minte Tolosa", "Tel_Birr-001", 5000)
current = AccountFactory.create("current", "Solomon Asnake", "CBE-002", 100)

savings.subscribe(sms_service)
savings.subscribe(logger)
current.subscribe(logger)  

print("\n  Testing Savings Deposit")
savings.deposit(2500)

# print("\n  Testing Overdraft Feature  ")
# current.withdraw(5000) 
