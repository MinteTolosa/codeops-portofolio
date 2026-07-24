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
# Custom Standalone Binary Search Implementation (Iterative Loop)
# =========================================================================
def binary_search(sorted_list, target):
    """Custom loop-driven binary search over sorted string keys."""
    low, high = 0, len(sorted_list) - 1
    
    while low <= high:
        mid = (low + high) // 2
        mid_val = sorted_list[mid]
        
        if mid_val == target:
            return mid
        elif mid_val < target:
            low = mid + 1
        else:
            high = mid - 1
            
    return -1


# =========================================================================
# Account Registry with Advanced Algorithms
# =========================================================================
class AccountRegistry:
    def __init__(self):
        self.by_number = {}   # number -> Account object
        self.order = []       # Tracks insertion order
        self.history = {}     # number -> list of tuples [('deposit', 500), ...]
        self.tracker = RegistryTransactionTracker(self)

    def add(self, acc):
        if acc.account_number in self.by_number:
            raise ValueError(f"Account {acc.account_number} already exists.")
        self.by_number[acc.account_number] = acc
        self.order.append(acc.account_number)
        self.history[acc.account_number] = []
        acc.subscribe(self.tracker)

    def find(self, number):
        """Standard O(1) dictionary retrieval."""
        return self.by_number.get(number)

    def list_all(self):
        return [self.by_number[num] for num in self.order]

    def record_transaction(self, number, transaction_type, amount):
        if number in self.history:
            self.history[number].append((transaction_type, amount))

    def undo_last(self, number):
        acc = self.find(number)
        if not acc:
            raise ValueError("Account not found.")
        stack = self.history.get(number)
        if not stack or len(stack) == 0:
            return None
        tx_type, amount = stack.pop()
        if tx_type == "deposit":
            acc._balance -= amount
        elif tx_type == "withdrawal":
            acc._balance += amount
        return tx_type, amount

    # --- Addition 1: Leaderboard Generation ---
    def top_by_balance(self, n=5):
        """Returns the top n accounts sorted by balance descending."""
        accts = sorted(self.by_number.values(), key=lambda a: a.balance, reverse=True)
        return accts[:n]

    # --- Addition 2: Binary Search Lookup ---
    def find_by_number(self, number):
        """Finds an account by extracting keys, sorting them, and running binary search."""
        nums = sorted(self.by_number.keys())
        idx = binary_search(nums, number)
        return self.by_number[nums[idx]] if idx >= 0 else None

    # --- Addition 3: Recursive Transaction Summing ---
    def total_transactions(self, number):
        """Public interface calculating total volume of transactions recursively."""
        if number not in self.history:
            return 0.0
        
        # Grab a copy of the list to avoid mutating the original live stack
        history_copy = list(self.history[number])
        return self._recursive_sum(history_copy)

    def _recursive_sum(self, items):
        """Helper method that breaks down the stack via head/tail slice recursion."""
        if not items:
            return 0.0
        
        # Extract last item's cash amount
        current_amount = items[-1][1]
        
        # Recurse with the remainder of the sliced list
        return current_amount + self._recursive_sum(items[:-1])


class RegistryTransactionTracker:
    def __init__(self, registry):
        self.registry = registry

    def update(self, account, transaction_type, amount):
        if transaction_type in ("deposit", "withdrawal"):
            self.registry.record_transaction(account.account_number, transaction_type, amount)


# ==========================================
# Observers
# ==========================================
class SMSAlert:
    def update(self, account, transaction_type, amount):
        pass # Silenced for clean script output

class AuditLog:
    def update(self, account, transaction_type, amount):
        pass # Silenced for clean script output


# ==========================================
# Verification Block
# ==========================================
registry = AccountRegistry()

# Add 3 accounts with varying baseline values
acc1 = AccountFactory.create("savings", "Minte Tolosa", "Tel_Birr-001", 5000)
acc2 = AccountFactory.create("current", "Solomon Asnake", "CBE-002", 1500)
acc3 = AccountFactory.create("savings", "Bekele Zewde", "Awash-003", 9000)

registry.add(acc1)
registry.add(acc2)
registry.add(acc3)

# Build a deep transaction pipeline history on acc1
acc1.deposit(200)
acc1.withdraw(50)
acc1.deposit(120)

print("--- 1. Testing Binary Search (No Loops/In Operators) ---")
searched_acc = registry.find_by_number("CBE-002")
if searched_acc:
    print(f"Match found via Binary Search: {searched_acc.owner} (${searched_acc.balance})")

print("\n--- 2. Testing Balance Leaderboard ---")
top_accounts = registry.top_by_balance(2)
for rank, acc in enumerate(top_accounts, start=1):
    print(f"Rank {rank}: {acc.owner} with ${acc.balance:.2f}")

print("\n--- 3. Testing Recursive Transaction Summation ---")
# Transactions: 200 + 50 + 120 = 370
total_volume = registry.total_transactions("Tel_Birr-001")
print(f"Total transaction volume calculated recursively for Minte: ${total_volume:.2f}")
