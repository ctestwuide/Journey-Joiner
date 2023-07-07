from django.urls import path 
from . import views

app_name = 'api'

urlpatterns = [
    path('', views.test, name="test"),
    path('signup/', views.signup, name='signup'),
    path('getUsers/', views.getUsers, name='getUsers'),
    path('getUser/<str:userEmail>/', views.getUser, name='getUser'),
]