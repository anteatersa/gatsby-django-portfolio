from django.apps import AppConfig
from dynamic_preferences.signals import preference_updated


# Trigger rebuild after any saves to preferences
from dynamic_preferences.signals import preference_updated
def notify_on_preference_update(sender, section, name, old, new, **kwargs):
    print("pref updated")
    r = requests.post('http://gatsby:8000/__refresh', data = {'key':'value'}, headers={"authorization": "vaXahW5weiph8vah"})

class WorkConfig(AppConfig):
    name = 'work'

    def ready(self):
        preference_updated.connect(notify_on_preference_update)

