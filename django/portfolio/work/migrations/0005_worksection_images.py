# Generated by Django 3.1.1 on 2020-09-15 08:59

from django.db import migrations
import sortedm2m.fields


class Migration(migrations.Migration):

    dependencies = [
        ('work', '0004_remove_worksection_images'),
    ]

    operations = [
        migrations.AddField(
            model_name='worksection',
            name='images',
            field=sortedm2m.fields.SortedManyToManyField(blank=True, help_text=None, null=True, to='work.WorkSectionImage'),
        ),
    ]
