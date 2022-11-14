from .models import Category, Connection
import csv

from datetime import datetime

from faker import Faker
fake = Faker()


path = 'E:\Django\electricity.csv'
with open(path) as f:
    reader = csv.reader(f)
    for row in reader:
        Connection.objects.create(
            applicant_name=row[1],
            gender=row[2],
            district=row[3],
            state=row[4],
            pincode=row[5],
            ownership=row[6],
            gov_id_type=row[7],
            id_number=row[8],
            category=Category.objects.get(id=int(row[9])),
            load_applied=int(row[10]),
            date_of_application=fake.date_time_between(
                start_date='-30y', end_date='now'),
            date_of_approval=fake.date_time_between(
                start_date='-30y', end_date='now'),
            modified_date=fake.date_time_between(
                start_date='-30y', end_date='now'),
            status=row[14],
            reviewer_id=row[15],
            reviewer_name=row[16],
            reviewer_comments=row[17],
        )
        # for row in reader:
        #     print(row[1])
        #     break
