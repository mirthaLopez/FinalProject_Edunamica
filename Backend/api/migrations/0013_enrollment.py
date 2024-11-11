# Generated by Django 5.1.2 on 2024-11-11 19:29

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0012_course_status'),
    ]

    operations = [
        migrations.CreateModel(
            name='Enrollment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('enrollment_date', models.DateTimeField()),
                ('course_fk', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.courses')),
                ('course_status_fk', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.course_status')),
                ('student_fk', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.student')),
            ],
        ),
    ]
