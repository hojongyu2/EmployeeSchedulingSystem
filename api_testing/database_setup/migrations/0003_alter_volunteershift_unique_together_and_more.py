# Generated by Django 4.2 on 2023-05-14 17:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('database_setup', '0002_volunteer_duration_in_chicago_volunteer_email_and_more'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='volunteershift',
            unique_together=set(),
        ),
        migrations.AddField(
            model_name='volunteershift',
            name='confirmed',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterUniqueTogether(
            name='volunteershift',
            unique_together={('volunteer', 'event_activity', 'start_time', 'end_time', 'confirmed')},
        ),
    ]
