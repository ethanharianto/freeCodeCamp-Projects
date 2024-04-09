class Category:
    def __init__(self, name):
        self.name = name
        self.ledger = []

    def __str__(self):
        title = f"{self.name:*^30}\n"
        items = ""
        total = 0

        for item in self.ledger:
            items += f"{item['description'][:23]:23}" + f"{item['amount']:>7.2f}\n"
            total += item['amount']

        output = title + items + f"Total: {total:.2f}"
        return output

    def deposit(self, amount, description=""):
        self.ledger.append({"amount": amount, "description": description})

    def withdraw(self, amount, description=""):
        if self.check_funds(amount):
            self.ledger.append({"amount": -amount, "description": description})
            return True
        return False

    def get_balance(self):
        balance = 0
        for item in self.ledger:
            balance += item['amount']
        return balance

    def transfer(self, amount, category):
        if self.check_funds(amount):
            self.withdraw(amount, f"Transfer to {category.name}")
            category.deposit(amount, f"Transfer from {self.name}")
            return True
        return False

    def check_funds(self, amount):
        return amount <= self.get_balance()


def create_spend_chart(categories):
    total_spent = 0
    category_spent = []

    # Calculate the total amount spent for each category
    for category in categories:
        spent = 0
        for item in category.ledger:
            if item['amount'] < 0:
                spent += abs(item['amount'])
        category_spent.append(spent)
        total_spent += spent

    # Calculate the percentage spent for each category
    category_percentages = [int((spent / total_spent) * 100) for spent in category_spent]

    # Create the spend chart
    chart = "Percentage spent by category\n"
    for percentage in range(100, -1, -10):
        chart += f"{percentage:3d}| "
        for category_percentage in category_percentages:
            if category_percentage >= percentage:
                chart += "o  "
            else:
                chart += "   "
        chart += "\n"

    # Add the horizontal line
    chart += "    " + "-" * (len(categories) * 3 + 1) + "\n"

    # Get the longest category name
    max_name_length = max(len(category.name) for category in categories)

    # Add the category names vertically below the bar
    for i in range(max_name_length):
        chart += "     "
        for category in categories:
            if i < len(category.name):
                chart += category.name[i] + "  "
            else:
                chart += "   "
        if i < max_name_length - 1:
            chart += "\n"

    return chart
