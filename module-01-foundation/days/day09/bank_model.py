from collections import deque

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


class AccountFactory:
    @staticmethod
    def create(kind, owner, number, balance=0):
        kind = kind.lower().strip()
        if kind == "savings":
            return Account(owner, number, balance)  
        elif kind == "current":
            return Account(owner, number, balance)
        else:
            raise ValueError(f"Unknown account type: '{kind}'")


# =========================================================================
# 1. Branch Hierarchy (Composite Structure Pattern)
# =========================================================================
class Branch:
    def __init__(self, name):
        self.name = name
        self.children = []  
        self.accounts = []  

    def add_child(self, child_branch):
        """Nests a sub-branch beneath this organizational unit."""
        self.children.append(child_branch)

    def add_account(self, account):
        """Assigns an active account instance to this branch."""
        self.accounts.append(account)

    def total_balance(self):
        """Recursively calculates aggregate funds across this branch and all subsets."""
        total = sum(a.balance for a in self.accounts)
        for child in self.children:
            total += child.total_balance()
        return total


# =========================================================================
# 2. Graph Transfer Analysis (Breadth-First Search)
# =========================================================================
def bfs(transfers, start):
    """
    Traverses the transactional transfer graph to locate all downstream 
    accounts that are reachable from the starting account.
    """
    if start not in transfers:
        return []
        
    visited = set([start])
    queue = deque([start])
    reachable = []

    while queue:
        current = queue.popleft()
        
        for recipient in transfers.get(current, []):
            if recipient not in visited:
                visited.add(recipient)
                queue.append(recipient)
                reachable.append(recipient)  
                
    return reachable


# =========================================================================
# Verification Block
# =========================================================================

head_office = Branch("Addis Ababa Head Office")

# Level 2: Regions
north_region = Branch("Northern Regional Hub")
south_region = Branch("Southern Regional Hub")
head_office.add_child(north_region)
head_office.add_child(south_region)

# Level 3: Local Branches
mekele_branch = Branch("Mekele Branch")
bahir_dar_branch = Branch("Bahir Dar Branch")
north_region.add_child(mekele_branch)
north_region.add_child(bahir_dar_branch)

hawassa_branch = Branch("Hawassa Branch")
south_region.add_child(hawassa_branch)

acc_head = AccountFactory.create("current", "HQ Vault", "HQ-001", 100000)
acc_mekele = AccountFactory.create("savings", "Almaz", "MK-101", 5000)
acc_bd = AccountFactory.create("current", "Tariku", "BD-202", 3500)
acc_hawassa = AccountFactory.create("savings", "Chala", "HW-303", 4000)

head_office.add_account(acc_head)
mekele_branch.add_account(acc_mekele)
bahir_dar_branch.add_account(acc_bd)
hawassa_branch.add_account(acc_hawassa)

print("--- 1. Recursive Branch Hierarchy Balances ---")
print(f"Mekele Branch Balance: ${mekele_branch.total_balance():,.2f}")      
print(f"Northern Region total Balance: ${north_region.total_balance():,.2f}") 
print(f"Total Bank System Balance: ${head_office.total_balance():,.2f}")      

transfers_graph = {
    "HQ-001": ["MK-101", "BD-202"], 
    "MK-101": ["HW-303"],          
    "BD-202": ["HW-303", "EXT-999"],
    "HW-303": [],                   
    "EXT-999": ["HQ-001"]           
}

print("\n--- 2. Graph Tracking via Breadth-First Search (BFS) ---")
start_account = "HQ-001"
downstream_exposure = bfs(transfers_graph, start_account)

print(f"Accounts reachable by transfer starting from {start_account}:")
print(downstream_exposure)
