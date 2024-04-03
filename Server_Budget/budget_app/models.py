from django.db import models

# Create your models here.
class Category(models.Model):
    CAT_TYPES =[('Income','Income'),('Expense','Expense')]
    category_name =  models.CharField(max_length=100)
    category_type = models.CharField(max_length=100,choices=CAT_TYPES)
    description = models.CharField(max_length=250)
    is_active = models.BooleanField(default=True)
    
    def __str__(self):
        return self.category_name

