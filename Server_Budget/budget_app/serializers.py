from rest_framework import serializers
from .models import Category

class CategorySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Category
        fields = ('id','category_name','category_type','description','is_active')