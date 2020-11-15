# Generated by Django 3.1.1 on 2020-09-29 20:08

import colorfield.fields
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('work', '0007_auto_20200920_2241'),
    ]

    operations = [
        migrations.AlterField(
            model_name='work',
            name='body_colour',
            field=colorfield.fields.ColorField(default='#FFFFFF', max_length=18),
        ),
        migrations.AlterField(
            model_name='work',
            name='text_colour',
            field=colorfield.fields.ColorField(default='#333333', max_length=18),
        ),
    ]