import csv


class Historical_Event():

    def __init__(self, data, event):
        self._data = data
        self._event = event
    @property
    def data(self):
        return self._data
    @data.setter
    def data(self, value):
        self._data = value

    @property
    def event(self):
        return self._event
    @event.setter
    def event(self, value):
        self.event = value
class Century_Info(Historical_Event):
    def __init__(self, data, event):
        super().__init__(data, event)
        self._century = data
    @property
    def century(self):
        return self._data
    @century.setter
    def century(self, value):
        self.century = value

    def get_info(self):
        print('Century:', self.data)
        print('Event:', self.event)
        print('----------------------')
    @staticmethod
    def sort_by_century(centuries):
        centuries.sort(key=lambda x: x.data)
def write_in_csv(history):
    with open('history.csv', 'w') as file:
        historical_fact = csv.writer(file)
        historical_fact.writerow(['Date', 'Event'])
        historical_fact.writerows(history)