from django.urls import path
from . import views

app_name = 'jjapp'

urlpatterns = [
    path('signup/', views.signup, name='signup'),
]
