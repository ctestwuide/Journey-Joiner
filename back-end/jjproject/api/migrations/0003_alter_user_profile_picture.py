# Generated by Django 4.2.3 on 2023-07-09 00:13

import api.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_remove_user_interests_user_interest_adventurer_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='profile_picture',
            field=models.ImageField(blank=True, null=True, upload_to=api.models.path_and_rename),
        ),
    ]
