from django.urls import path
from . import views
from .views import CategoryList,CategoryDetail,IncomeDetail,IncomeList,user_signup,user_login,RegisterView,LoginView,UserView,LogoutView
# from .views import user_signup,user_login
from .views import RegisterView,LoginView,UserView,LogoutView
# from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)


urlpatterns = [    
    path('category/', views.CategoryList.as_view(), name='categoty-list'),
    path('category/<int:pk>/',views.CategoryDetail.as_view(),name='category-detail'),   
    path('income/',views.IncomeList.as_view(), name='income-list'),
    path('income/<int:pk>/',views.IncomeDetail.as_view(),name='income-detail'),
    path('expense/',views.ExpenseList.as_view(),name='expense-list'),
    path('expense/<int:pk>/',views.ExpenseDetail.as_view(),name='expense-detail'),
    # path('signup/', user_signup, name='signup'),
    # path('signin/', user_login, name='login'),
    # path('users/<int:pk>/', views.UserViewSet.as_view(), name='user-detail')
    # path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('signup/',RegisterView.as_view(),name='signup'),
    path('signin/',LoginView.as_view(),name='signin'),
    path('user/',UserView.as_view(),name='user'),
    path('signout/',LogoutView.as_view(),name='signout')
]