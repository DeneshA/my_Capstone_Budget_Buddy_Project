# Generated by Django 3.2.12 on 2024-04-08 19:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('budget_app', '0010_expense'),
    ]

    operations = [
        migrations.AlterField(
            model_name='expense',
            name='end_date',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='expense',
            name='start_date',
            field=models.DateField(blank=True, null=True),
        ),
    ]