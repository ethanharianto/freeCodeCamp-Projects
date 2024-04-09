import copy
import random
# Consider using the modules imported above.

class Hat:
    def __init__(self, **balls):
        self.contents = []
        for ball, count in balls.items():
            self.contents.extend([ball] * count)

    def draw(self, num_balls):
        drawn_balls = random.sample(self.contents, min(num_balls, len(self.contents)))
        for ball in drawn_balls:
            self.contents.remove(ball)
        return drawn_balls



def experiment(hat, expected_balls, num_balls_drawn, num_experiments):
    success_count = 0

    for _ in range(num_experiments):
        hat_copy = copy.deepcopy(hat)  # Create a deep copy of the hat's contents
        hat_drawn_balls = hat_copy.draw(num_balls_drawn)
        success = True

        for ball, count in expected_balls.items():
            if hat_drawn_balls.count(ball) < count:
                success = False
                break

        if success:
            success_count += 1

    probability = success_count / num_experiments
    return probability
