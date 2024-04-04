from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Category(models.Model):
    CAT_TYPES =[('Income','Income'),('Expense','Expense')]
    category_name =  models.CharField(max_length=100)
    category_type = models.CharField(max_length=100,choices=CAT_TYPES)
    description = models.CharField(max_length=250)
    is_active = models.BooleanField(default=True)
    
    def __str__(self):
        return self.category_name

class Income(models.Model):
    PAY_TERMS = [('Daily', 'Daily'), ('Weekly', 'Weekly'), ('Bi-Weekly', 'Bi-Weekly'), ('Monthly', 'Monthly'), ('Annually', 'Annually')]
    DURATION_TERM = [('Month', 'Month'), ('Year', 'Year')]
    # user_id = models.CharField(max_length=100)  # using Django's built-in User model
    user_id = models.ForeignKey('auth.User', on_delete=models.CASCADE)  # using Django's built-in User model
    # user_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name='incomes')  # using Django's built-in User model
    category_id = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='incomes')
    duration = models.IntegerField()
    duration_terms = models.CharField(max_length=20, choices=DURATION_TERM)
    start_date = models.DateField(null=True,blank=True)
    end_date = models.DateField(null=True,blank=True)
    bill_amount = models.FloatField()
    bill_cycle = models.CharField(max_length=20, choices=PAY_TERMS)
    notes = models.CharField(max_length=250,blank=True)
    
    def __str__(self):
        return f"{self.category_id.category_name} - {self.bill_amount} ({self.user_id.username})"