switch = {}

def player(prev_play, opponent_history=[]):
    global switch

    n = 5

    if prev_play in ["R", "P", "S"]:
        opponent_history.append(prev_play)

    guess = "R"  # default, until statistic kicks in

    if len(opponent_history) > n:
        inp = "".join(opponent_history[-n:])

        if "".join(opponent_history[-(n + 1):]) in switch.keys():
            switch["".join(opponent_history[-(n + 1):])] += 1
        else:
            switch["".join(opponent_history[-(n + 1):])] = 1

        possible = [inp + "R", inp + "P", inp + "S"]

        for i in possible:
            if not i in switch.keys():
                switch[i] = 0

        predict = max(possible, key=lambda key: switch[key])

        if predict[-1] == "P":
            guess = "S"
        if predict[-1] == "R":
            guess = "P"
        if predict[-1] == "S":
            guess = "R"

    # Defeat Abbey by disrupting pattern prediction
    if len(opponent_history) >= 3 and opponent_history[-3:] == ["R", "P", "S"]:
        guess = "P"
    elif len(opponent_history) >= 3 and opponent_history[-3:] == ["P", "S", "R"]:
        guess = "S"
    elif len(opponent_history) >= 3 and opponent_history[-3:] == ["S", "R", "P"]:
        guess = "R"

    return guess
