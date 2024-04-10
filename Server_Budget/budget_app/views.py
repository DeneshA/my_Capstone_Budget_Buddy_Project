from rest_framework import generics
from .serializers import CategorySerializer,IncomeSerializer,UserSerializer,ExpenseSerializer
from .models import Category,Income,Expense
from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import viewsets
from rest_framework import permissions

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from .serializers import UserSerializer
from .models import User
import jwt
from datetime import datetime,timedelta,timezone

from django.contrib.auth import authenticate, login
from django.http import JsonResponse,HttpResponse
from django.views.decorators.csrf import csrf_exempt
import json

from rest_framework_simplejwt.tokens import RefreshToken

from rest_framework import status

# Create your views here.
class CategoryList(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    
class CategoryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    
class IncomeList(generics.ListCreateAPIView):
    queryset = Income.objects.all()
    serializer_class = IncomeSerializer
    
class IncomeDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Income.objects.all()
    serializer_class = IncomeSerializer

   
class ExpenseList(generics.ListCreateAPIView):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer
    
class ExpenseDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer
    
class UserViewSet (viewsets.ReadOnlyModelViewSet):
    # permission_classes = [permissions.IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = UserSerializer

class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)
        except Exception as e:
            print(e)
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
class LoginView(APIView):
    def post(self,request):
        username = request.data['username']
        password = request.data['password']
        
        user = User.objects.filter(username=username).first()
        # check if email not exist
        if user is None:
            raise AuthenticationFailed('User not found!')
        
        # check if incorrect password - password checked by hashing (encrypted)
        if not user.check_password(password):
            raise AuthenticationFailed('Incorrect password!')
        
        # create payload for JWT
        payload = {
            'id': user.id,
            'exp': datetime.now(timezone.utc) + timedelta(minutes=60), #adding 60 min expiaration time
            'iat': datetime.now(timezone.utc) #the time JWT get initiated
        }
        
        # token setup
        token = jwt.encode(payload,'secret',algorithm='HS256')
        
        # create respone in to a variable to set cookies parameter
        response = Response()
        
        # set the cookies and display token via cookies
        response.set_cookie(key='jwt', value=token, httponly=True)
        
        response.data = {
            'jwt':token
        }
        
        # if sucessful login responds the token via cookies
        # return response({'jwt': token})
        return response
    
class UserView(APIView):
    def get(self, request):
    #get the cooky and extract the User
        #get the cooky to extract user
        token = request.COOKIES.get('jwt')
        
       
        # if user not loged in 
        if not token:
            raise AuthenticationFailed("Unauthenticated user access !")
        try:
             # decode the token to extract user
            payload = jwt.decode(token,'secret',algorithms=['HS256'])
        
        except jwt.ExpiredSignatureError:
            # throw an exception if cookies get expired
            raise AuthenticationFailed('Unauthenticated !')
        
        # filter the payload to extract active user
        user = User.objects.filter(id=payload['id']).first()
        if not user:
            raise AuthenticationFailed('User not found!')

        # convert the user into JSON serializable format
        serializer = UserSerializer(user)
        
        return Response(serializer.data)

class LogoutView(APIView):
    def post(self,request):
        
        response = Response()
        
        # delect the cooky of the active user
        response.delete_cookie('jwt')
        response.data = {
            'message':'Sucessfull Logout User !'
        }
        return response

@csrf_exempt
def user_signup(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data['username']
        password = data['password']
        email = data['email_address']
        first_name = data['first_name']
        last_name=data['last_name']
        if User.objects.filter(username=username).exists():
            return JsonResponse({'message': 'Username already exists'}, status=400)
        else:
            user = User.objects.create_user(username=username, password=password , email = email,first_name=first_name,last_name=last_name)
            refresh = RefreshToken.for_user(user)
            return JsonResponse({
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                    'message': 'User created successfully'
                },status=201)
            # return JsonResponse({'message': 'User created successfully'}, status=201)

    else:
   
        return HttpResponse('This endpoint expects a POST request.', status=405)

    return HttpResponse('Unexpected error', status=500)

@csrf_exempt
def user_login(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data['username']
        password = data['password']
        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
            return JsonResponse({'message': 'Login successful'}, status=200)
        else:
            return JsonResponse({'message': 'Invalid credentials'}, status=401)

    else:
   
        return HttpResponse('This endpoint expects a POST request.', status=405)

    return HttpResponse('Unexpected error', status=500)