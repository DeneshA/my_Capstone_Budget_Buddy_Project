from django.urls import path
from . import views
from .views import CategoryList,CategoryDetail,IncomeDetail,IncomeList
# from rest_framework.routers import DefaultRouter



urlpatterns = [    
    path('category/', views.CategoryList.as_view(), name='categoty-list'),
    path('category/<int:pk>/',views.CategoryDetail.as_view(),name='category-detail'),   
    path('income/',views.IncomeList.as_view(), name='income-list'),
    path('income/<int:pk>/',views.IncomeDetail.as_view(),name='income-detail'),
    # path('users/<int:pk>/', views.UserViewSet.as_view(), name='user-detail')
]