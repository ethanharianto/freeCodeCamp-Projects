def arithmetic_arranger(problems, show_answers=False):
    if len(problems) > 5:
        return "Error: Too many problems."

    line1 = ""
    line2 = ""
    dashes = ""
    answers = ""

    for problem in problems:
        num1, operator, num2 = problem.split()

        if operator not in ['+', '-']:
            return "Error: Operator must be '+' or '-'."

        if not (num1.isdigit() and num2.isdigit()):
            return "Error: Numbers must only contain digits."

        if len(num1) > 4 or len(num2) > 4:
            return "Error: Numbers cannot be more than four digits."

        width = max(len(num1), len(num2)) + 2
        line1 += num1.rjust(width) + "    "
        line2 += operator + " " + num2.rjust(width - 2) + "    "
        dashes += "-" * width + "    "

        if show_answers:
            if operator == '+':
                ans = str(int(num1) + int(num2))
            else:
                ans = str(int(num1) - int(num2))
            answers += ans.rjust(width) + "    "

    arranged_problems = line1.rstrip() + "\n" + line2.rstrip() + "\n" + dashes.rstrip()
    if show_answers:
        arranged_problems += "\n" + answers.rstrip()

    return arranged_problems
