from django.urls import path 
from . import views

app_name = 'api'

urlpatterns = [
    path('', views.test, name="test"),
    path('signup/', views.signup, name='signup'),
    path('login/', views.login, name='login'),
    path('getUsers/', views.getUsers, name='getUsers'),
    path('getUser/<str:userEmail>/', views.getUser, name='getUser'),
    path('updateUser/<str:userEmail>/', views.updateUser, name='updateUser'),
    path('updateUserPicture/<str:userEmail>/', views.updateUserPicture, name='updateUserPicture'),
]