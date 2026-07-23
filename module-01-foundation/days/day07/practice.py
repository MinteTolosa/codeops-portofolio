# ----- Exercise 1: Big-O Notation Examples -----

print("----- Exercise 1: Big-O Notation Examples -----")
elements = [10, 20, 30, 40]
print(elements[2]) 

for item in elements:
    print(item)

for i in elements:
    for j in elements:
        print(i, j)

user_map = {"id_1": "Alice", "id_2": "Bob"}
print(user_map["id_1"])

def binary_search(sorted_list, target):
    low, high = 0, len(sorted_list) - 1
    while low <= high:
        mid = (low + high) // 2
        if sorted_list[mid] == target:
            return mid
        elif sorted_list[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1

print(binary_search([10, 20, 30, 40, 50], 30))

print("\n" + "#"*50 + "\n")


# ----- Exercise 2: List vs Dictionary Lookup -----
print("\n----- Exercise 2: List vs Dictionary Lookup -----")

import time

accounts_list = [f"ACC{i:06d}" for i in range(100000)]
accounts_dict = {acc: True for acc in accounts_list}

target_account = "ACC099995"

start_list = time.perf_counter()
is_in_list = target_account in accounts_list
end_list = time.perf_counter()
list_duration = end_list - start_list

start_dict = time.perf_counter()
is_in_dict = target_account in accounts_dict
end_dict = time.perf_counter()
dict_duration = end_dict - start_dict

print(f"List Lookup Time: {list_duration:.6f} seconds")
print(f"Dict Lookup Time: {dict_duration:.6f} seconds")

print("\n" + "#"*50 + "\n")


print("----- Exercise 3: Stack and Queue Implementations -----")

class Stack:
    def __init__(self):
        self._items = []

    def push(self, item):
        self._items.append(item)

    def pop(self):
        if not self.is_empty():
            return self._items.pop()
        raise IndexError("Pop from an empty stack")

    def peek(self):
        if not self.is_empty():
            return self._items[-1]
        return None

    def is_empty(self):
        return len(self._items) == 0

names = ["Alice", "Bob", "Charlie", "Diana"]
name_stack = Stack()

for name in names:
    name_stack.push(name)

reversed_names = []
while not name_stack.is_empty():
    reversed_names.append(name_stack.pop())

print("Original:", names)
print("Reversed:", reversed_names)


print("\n" + "#"*50 + "\n")

print("----- Exercise 4: Queue Implementation -----")

from collections import deque

bank_line = deque()

bank_line.append("Customer 1")
bank_line.append("Customer 2")
bank_line.append("Customer 3")
bank_line.append("Customer 4")
bank_line.append("Customer 5")
print(f"Initial Line setup: {list(bank_line)}")

while len(bank_line) > 0:
    served_customer = bank_line.popleft()
    print(f"Now serving: {served_customer} (Remaining in line: {len(bank_line)})")


print("\n" + "#"*50 + "\n")



print("----- Exercise 5: Singly Linked List Implementation -----")


class Node:
    def __init__(self, data):
        self.data = data
        self.next = None


class LinkedList:
    def __init__(self):
        self.head = None

    def push_front(self, data):
        """Inserts a new element at the very beginning of the list."""
        new_node = Node(data)
        new_node.next = self.head
        self.head = new_node

    def print_all(self):
        """Walks the complete node chain and prints data sequentially."""
        current = self.head
        elements = []
        while current is not None:
            elements.append(str(current.data))
            current = current.next
        print(" -> ".join(elements) if elements else "Empty List")


my_list = LinkedList()
my_list.push_front("Node C")
my_list.push_front("Node B")
my_list.push_front("Node A")

my_list.print_all()

