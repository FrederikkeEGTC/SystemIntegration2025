#import datetime
from datetime import datetime, timezone
#print(datetime.datetime.now()) module.class.method

current_date = datetime.now()
print(current_date)
print(datetime.now().strftime('%Y-%m-%d'))
print(datetime.now().strftime('%Y-%m-%d %H:%M:%S'))
print(datetime.now().strftime('%Y-%m-%dT%H:%M:%S'))
print(datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M:%S %Z'))

