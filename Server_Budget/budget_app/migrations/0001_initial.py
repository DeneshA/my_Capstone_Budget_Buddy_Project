# Generated by Django 5.0.3 on 2024-04-03 03:35

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('category_name', models.CharField(max_length=100)),
                ('category_type', models.CharField(max_length=100)),
                ('description', models.CharField(max_length=250)),
                ('is_active', models.BooleanField(default=True)),
            ],
        ),
    ]