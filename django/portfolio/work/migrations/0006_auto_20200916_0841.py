# Generated by Django 3.1.1 on 2020-09-16 08:41

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('work', '0005_worksection_images'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='worksection',
            name='images',
        ),
        migrations.AddField(
            model_name='worksection',
            name='sorting',
            field=models.IntegerField(default=0, editable=False),
        ),
        migrations.AddField(
            model_name='worksectionimage',
            name='section',
            field=models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, to='work.worksection'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='worksectionimage',
            name='sorting',
            field=models.IntegerField(default=0, editable=False),
        ),
    ]
