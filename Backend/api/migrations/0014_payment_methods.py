# Generated by Django 5.1.2 on 2024-11-11 19:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0013_enrollment'),
    ]

    operations = [
        migrations.CreateModel(
            name='Payment_Methods',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('payment_method_name', models.CharField(max_length=50)),
            ],
        ),
    ]
