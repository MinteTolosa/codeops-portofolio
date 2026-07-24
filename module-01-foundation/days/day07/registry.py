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


# =========================================================================
# Account Registry (Fulfilling Stack Data Structure and Order Tracking)
# =========================================================================

class AccountRegistry:
    def __init__(self):
        self.by_number = {}   # number -> Account object (O(1) find)
        self.order = []       # List to track insertion order
        self.history = {}     # number -> list (Used as a transaction stack)
        
        # Internal observer to auto-track transactions to the history stack
        self.tracker = RegistryTransactionTracker(self)

    def add(self, acc):
        """Stores account in a dict and preserves insertion order."""
        if acc.account_number in self.by_number:
            raise ValueError(f"Account {acc.account_number} already exists.")
        
        self.by_number[acc.account_number] = acc
        self.order.append(acc.account_number)
        self.history[acc.account_number] = []  # Initialize empty stack
        
        # Automatically subscribe our background tracker to the account
        acc.subscribe(self.tracker)

    def find(self, number):
        """O(1) lookup functionality."""
        return self.by_number.get(number)

    def list_all(self):
        """Returns all accounts sorted precisely by insertion order."""
        return [self.by_number[num] for num in self.order]

    def record_transaction(self, number, transaction_type, amount):
        """Pushes a transaction tuple onto the account history stack."""
        if number in self.history:
            self.history[number].append((transaction_type, amount))

    def undo_last(self, number):
        """Pops the latest transaction from stack and reverses its financial effect."""
        acc = self.find(number)
        if not acc:
            raise ValueError("Account not found.")
            
        stack = self.history.get(number)
        if not stack or len(stack) == 0:
            print(f"\n[UNDO] No transactions available to undo for account {number}.")
            return None

        # LIFO Pop
        tx_type, amount = stack.pop()
        print(f"\n[UNDOING SYSTEM] Reversing last {tx_type} of ${amount:.2f} for {acc.owner}...")

        # Mutate the balance value directly to avoid firing standard observers again
        if tx_type == "deposit":
            acc._balance -= amount
        elif tx_type == "withdrawal":
            acc._balance += amount
            
        return tx_type, amount


class RegistryTransactionTracker:
    """An Observer that updates the AccountRegistry history stack automatically."""
    def __init__(self, registry):
        self.registry = registry

    def update(self, account, transaction_type, amount):
        # We only record core financial operations to the undo stack
        if transaction_type in ("deposit", "withdrawal"):
            self.registry.record_transaction(account.account_number, transaction_type, amount)


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


# ==========================================
# Execution and Verification Block
# ==========================================

# 1. Instantiate the central registry
registry = AccountRegistry()

sms_service = SMSAlert()
logger = AuditLog()

# 2. Create Accounts using Factory
savings = AccountFactory.create("savings", "Minte Tolosa", "Tel_Birr-001", 5000)
current = AccountFactory.create("current", "Solomon Asnake", "CBE-002", 100)

# 3. Attach notifications
savings.subscribe(sms_service)
savings.subscribe(logger)
current.subscribe(logger)

# 4. Add accounts to the registry
registry.add(savings)
registry.add(current)

# Verify list_all() execution
print("--- Accounts in Registry (Insertion Order) ---")
for acc in registry.list_all():
    print(f"[{acc.account_number}] -> {acc.owner} (${acc.balance:.2f})")

# Execute standard operations
print("\n--- Testing Savings Transactions ---")
savings.deposit(2500)
savings.withdraw(1000)

print(f"\nCurrent account state balance before rolling back: ${savings.balance:.2f}") # 6500.00

# 5. Execute consecutive Undo Operations
registry.undo_last(savings.account_number) # Should undo the $1000 withdrawal
print(f"Balance after 1st undo: ${savings.balance:.2f}") # Back to 7500.00

registry.undo_last(savings.account_number) # Should undo the $2500 deposit
print(f"Balance after 2nd undo: ${savings.balance:.2f}") # Back to original 5000.00

registry.undo_last(savings.account_number) # Should catch empty stack
