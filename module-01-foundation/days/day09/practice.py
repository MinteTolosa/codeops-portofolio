import heapq

# ############
# 1. Build a BST. Write a Node class and an insert(root, value) function. Insert several balances,
# then print them with an in-order traversal — they should come out sorted.
# ############
print(" ---Exercise 1: Build a BST ----")

class Node:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

def insert(root, value):
    if root is None:
        return Node(value)
    if value < root.value:
        root.left = insert(root.left, value)
    else:
        root.right = insert(root.right, value)
    return root

def inorder_traversal(root):
    if root:
        inorder_traversal(root.left)
        print(root.value, end=" ")
        inorder_traversal(root.right)

balances = [450.00, 75.25, 1200.50, 300.00, 15.00]
bst_root = None
for balance in balances:
    bst_root = insert(bst_root, balance)

inorder_traversal(bst_root)
print()  # For newline


# ############
# 2. Tree depth. Write a recursive height(node) that returns the depth of a binary tree.
# ############
print(" ---Exercise 2: Tree depth ----")

def height(node):
    if node is None:
        return 0
    return 1 + max(height(node.left), height(node.right))

print("Tree height:", height(bst_root))


# ############
# 3. Graph BFS. Given an adjacency-list graph, implement bfs(graph, start) and return the set of
# reachable vertices.
# ############
print(" ---Exercise 3: Graph BFS ----")

def bfs(graph, start):
    visited = set([start])
    queue = [start]
    visit_order = []
    
    while queue:
        vertex = queue.pop(0)
        visit_order.append(vertex)
        for neighbor in graph.get(vertex, []):
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
                
    print("BFS Visit Order:", visit_order)
    return visited

graph = {
    'A': ['B', 'C'],
    'B': ['A', 'D', 'E'],
    'C': ['A', 'F'],
    'D': ['B'],
    'E': ['B', 'F'],
    'F': ['C', 'E']
}

reachable = bfs(graph, 'A')
print("Reachable set:", reachable)


# ############
# 4. Graph DFS. Implement dfs(graph, start) recursively, and compare the visit order with your
# BFS.
# ############
print(" ---Exercise 4: Graph DFS ----")

def dfs(graph, start):
    visited = set()
    visit_order = []
    
    def dfs_recursive(vertex):
        visited.add(vertex)
        visit_order.append(vertex)
        for neighbor in graph.get(vertex, []):
            if neighbor not in visited:
                dfs_recursive(neighbor)
                
    dfs_recursive(start)
    print("DFS Visit Order:", visit_order)
    return visited

dfs(graph, 'A')


# ############
# 5. Priority queue. Use heapq to push five (priority, task) tuples in mixed order, then pop them all
# — they should come out by priority.
# ############
print(" ---Exercise 5: Priority queue ----")

tasks = [
    (3, "Clear emails"),
    (1, "Fix critical bug"),
    (5, "Update documentation"),
    (2, "Prepare meeting slides"),
    (4, "Code review")
]

pq = []
for task in tasks:
    heapq.heappush(pq, task)

while pq:
    priority, task_name = heapq.heappop(pq)
    print(f"Priority {priority}: {task_name}")
