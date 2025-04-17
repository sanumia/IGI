"""Lab 4 Gorodetskaya Diana 353501"""
from history_info import Historical_Event, write_in_csv
import pickle


history = [ Historical_Event(1939, "Start WWII"), Historical_Event(1861, 'Cancel Slavery'), Historical_Event(1991,'raspad USSR')]
write_in_csv(history)