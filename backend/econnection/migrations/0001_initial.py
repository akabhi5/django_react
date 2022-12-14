# Generated by Django 4.1.3 on 2022-11-12 19:15

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.CharField(max_length=64)),
            ],
        ),
        migrations.CreateModel(
            name='Connection',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('applicant_name', models.CharField(max_length=64)),
                ('gender', models.CharField(choices=[('M', 'Male'), ('F', 'Female')], max_length=2)),
                ('district', models.CharField(max_length=256)),
                ('state', models.CharField(max_length=256)),
                ('ownership', models.CharField(choices=[('JO', 'Joint'), ('IN', 'Individual')], max_length=10)),
                ('gov_id_type', models.CharField(choices=[('AA', 'Aadhar'), ('VO', 'VOTER'), ('PAN', 'PAN'), ('PASS', 'Passport')], max_length=10)),
                ('id_number', models.CharField(max_length=264)),
                ('load_applied', models.IntegerField(validators=[django.core.validators.MaxValueValidator(200)])),
                ('date_of_application', models.DateTimeField(auto_now_add=True)),
                ('date_of_approval', models.DateTimeField()),
                ('modified_date', models.DateTimeField()),
                ('status', models.CharField(choices=[('APR', 'Approved'), ('PE', 'Pending'), ('CONR', 'Connection Released'), ('RE', 'Rejected')], max_length=10)),
                ('reviewer_id', models.IntegerField()),
                ('reviewer_name', models.CharField(max_length=256)),
                ('reviewer_comments', models.TextField()),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='econnection.category')),
            ],
            options={
                'verbose_name': 'Connection',
                'verbose_name_plural': 'Connections',
            },
        ),
    ]
