# Generated by Django 3.1.1 on 2020-10-22 21:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('work', '0012_work_active'),
    ]

    operations = [
        migrations.AddField(
            model_name='work',
            name='link',
            field=models.CharField(default='', max_length=256),
        ),
    ]
