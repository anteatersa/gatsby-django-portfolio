# Generated by Django 3.1.1 on 2020-10-10 11:42

from django.db import migrations, models
import tinymce.models


class Migration(migrations.Migration):

    dependencies = [
        ('work', '0010_auto_20201001_2122'),
    ]

    operations = [
        migrations.AddField(
            model_name='work',
            name='hero_align',
            field=models.CharField(choices=[('l', 'Left'), ('r', 'Right'), ('c', 'Center')], default='l', max_length=1),
        ),
        migrations.AddField(
            model_name='work',
            name='hero_image',
            field=models.ImageField(blank=True, null=True, upload_to=''),
        ),
        migrations.AlterField(
            model_name='work',
            name='blurb',
            field=tinymce.models.HTMLField(),
        ),
        migrations.AlterField(
            model_name='worksection',
            name='text',
            field=tinymce.models.HTMLField(blank=True, null=True),
        ),
    ]
