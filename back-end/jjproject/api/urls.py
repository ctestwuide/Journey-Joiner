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
    path('getUnseenUsers/<int:userId>/', views.getUnseenUsers, name='getUnseenUsers'),
    path('passUser/<int:user_id>/<int:target_id>', views.pass_user, name='pass_user'),
    path('likeUser/<int:user_id>/<int:target_id>', views.like_user, name='like_user'),
    path('getMatches/<str:userEmail>/', views.getMatches, name='getMatches'),
]