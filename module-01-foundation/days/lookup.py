#Create hierarchy; recursively display with indentation; count departments recursively;
#display maximum depthTo. 
class Department:
    def __init__(self, name, parent=None):
        self.name = name
        self.parent = parent
        self.children = []

    def add_child(self, child):
        child.parent = self
        self.children.append(child)

    def display(self, indent=0):
        print(" " * indent + self.name)
        for child in self.children:
            child.display(indent + 2)

    def count_departments(self):
        count = 1
        for child in self.children:
            count += child.count_departments()
        return count

    def get_max_depth(self):
        if not self.children:
            return 0
        max_depth = 0
        for child in self.children:
            depth = child.get_max_depth()
            if depth > max_depth:
                max_depth = depth
        return max_depth + 1

# Example usage:
# Create a hierarchy of departments
root = Department("CEO")
sales = Department("Sales", root)
marketing = Department("Marketing", root)
engineering = Department("Engineering", root)

# Add sub-departments
sales.add_child(Department("Sales Associate", sales))
marketing.add_child(Department("Marketing Specialist", marketing))
engineering.add_child(Department("Software Engineer", engineering))

# Display the hierarchy with indentation
root.display()

# Count the number of departments
print(f"Total departments: {root.count_departments()}")

# Display the maximum depth
print(f"Maximum depth: {root.get_max_depth()}")