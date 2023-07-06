from django.urls import path
from . import views

app_name = 'jjapp'

urlpatterns = [
    path('', views.index, name='index'),  # Example URL pattern
    # Add more URL patterns for your app views
]
