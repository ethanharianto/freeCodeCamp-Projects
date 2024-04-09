def add_time(start, duration, starting_day=None):
    # Parse the start time and duration
    start_time, period = start.split()
    start_hour, start_minute = map(int, start_time.split(':'))
    duration_hour, duration_minute = map(int, duration.split(':'))

    # Convert start time to 24-hour format
    if period == 'PM':
        start_hour += 12

    # Calculate the total minutes
    total_minutes = start_hour * 60 + start_minute + duration_hour * 60 + duration_minute

    # Calculate the new time
    new_hour, new_minute = divmod(total_minutes, 60)
    new_hour %= 24

    # Determine the period (AM/PM)
    new_period = 'AM' if new_hour < 12 else 'PM'

    # Convert new hour to 12-hour format
    if new_hour == 0:
        new_hour = 12
    elif new_hour > 12:
        new_hour -= 12

    # Calculate the number of days later
    days_later = total_minutes // (24 * 60)

    # Get the starting day of the week in lowercase for case-insensitive comparison
    if starting_day:
        starting_day = starting_day.lower()

    # Calculate the day of the week for the new time
    days_of_week = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]
    if starting_day in days_of_week:
        starting_day_index = days_of_week.index(starting_day)
        new_day_index = (starting_day_index + days_later) % 7
        new_day = ", " + days_of_week[new_day_index].capitalize()
    else:
        new_day = ""

    # Construct the final output
    if days_later == 0:
        result = f"{new_hour:02d}:{new_minute:02d} {new_period}{new_day}"
    elif days_later == 1:
        result = f"{new_hour:02d}:{new_minute:02d} {new_period}{new_day} (next day)"
    else:
        result = f"{new_hour:02d}:{new_minute:02d} {new_period}{new_day} ({days_later} days later)"

    return result[1:] if result[0] == "0" else result
