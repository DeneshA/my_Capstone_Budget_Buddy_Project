from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Category,Income

class CategorySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Category
        fields = ('id','category_name','category_type','description','is_active')

class IncomeSerializer(serializers.HyperlinkedModelSerializer):
    category = serializers.HyperlinkedRelatedField(
        view_name = 'category-detail',
        many =False,
        read_only = True
   )
        
    category_name = serializers.CharField(source='category_id.category_name', read_only=True)
    
      

    class Meta:
        model = Income
        # fields = '__all__'
        fields = ['id','user_id','category_id','duration','duration_terms','start_date','end_date','bill_amount','bill_cycle','notes','category','category_name']
    
class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['id','username','email','password']