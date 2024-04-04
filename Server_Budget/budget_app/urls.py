from django.urls import path
from . import views
from .views import CategoryList,CategoryDetail,IncomeDetail,IncomeList
from rest_framework.routers import DefaultRouter



urlpatterns = [    
    path('category/', views.CategoryList.as_view(), name='categoty_list'),
    path('category/<int:pk>/',views.CategoryDetail.as_view(),name='category_detail'),   
    path('income/',views.IncomeList.as_view(), name='income-list'),
    path('income/<int:pk>/',views.IncomeDetail.as_view(),name='income_detail')
]