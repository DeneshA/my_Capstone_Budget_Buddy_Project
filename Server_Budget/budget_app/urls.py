from django.urls import path
from . import views
from .views import CategoryList,CategoryDetail
from rest_framework.routers import DefaultRouter



urlpatterns = [
    path('category/', views.CategoryList.as_view(), name='categoty_list'),
    path('category/<int:pk>/',views.CategoryDetail.as_view(),name='category_detail'),
]