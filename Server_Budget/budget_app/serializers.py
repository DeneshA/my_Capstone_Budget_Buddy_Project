from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Category,Income,Expense

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
    
class ExpenseSerializer(serializers.HyperlinkedModelSerializer):
    category = serializers.HyperlinkedRelatedField(
        view_name = 'category-detail',
        many =False,
        read_only = True
   )
        
    category_name = serializers.CharField(source='category_id.category_name', read_only=True)    
    
    class Meta:
        model = Expense
        fields = ['id','user_id','category_id','duration','duration_terms','start_date','end_date','bill_date','bill_amount','bill_cycle','notes','category','category_name']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username','first_name','last_name','email','password']
        # extract the property of fields and set a rule
        extra_kwargs = {
            'password': {'write_only':True}
        }
    def create(self, validated_data):
        # extract the password
        password = validated_data.pop('password',None)
        # create an instatce
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance