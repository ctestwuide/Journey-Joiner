# Generated by Django 4.2.3 on 2023-07-08 20:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='interests',
        ),
        migrations.AddField(
            model_name='user',
            name='interest_adventurer',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='user',
            name='interest_beach_bum',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='user',
            name='interest_foodie',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='user',
            name='interest_museum_magnet',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='user',
            name='profile_picture',
            field=models.ImageField(blank=True, null=True, upload_to='profile_pictures/'),
        ),
    ]
