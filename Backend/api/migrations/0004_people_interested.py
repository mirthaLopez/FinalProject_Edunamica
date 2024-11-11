# Generated by Django 5.1.2 on 2024-11-11 17:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_courses'),
    ]

    operations = [
        migrations.CreateModel(
            name='People_Interested',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('person_name', models.CharField(max_length=50)),
                ('person_first_last_name', models.CharField(max_length=50)),
                ('person_email', models.EmailField(max_length=254)),
                ('person_phone_number', models.CharField(max_length=20)),
                ('person_notes', models.TextField(max_length=255)),
                ('course', models.TextField(max_length=50)),
            ],
        ),
    ]