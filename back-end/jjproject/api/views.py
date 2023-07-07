from django.shortcuts import render
# from django.http import JsonResponse
from .models import User
# from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import UserSerializer

# Create your views here.
@api_view(['GET'])
def test(request):
    return Response('test worked')


@api_view(['POST'])
def signup(request):

    # Extract the user data from the request
    first_name = request.POST.get('first_name')
    last_name = request.POST.get('last_name')
    age = request.POST.get('age')
    email = request.POST.get('email')
    password = request.POST.get('password')

    # Save the user to the database using your custom user model
    User.objects.create(
        first_name=first_name,
        last_name=last_name,
        age=age,
        email=email,
        password=password,
    )

    # Return a success response
    return Response('It worked', safe=False)


@api_view(['GET'])
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getUser(request, userEmail):
    users = User.objects.get(email=userEmail)
    serializer = UserSerializer(users, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
def updateUser(request, userEmail):
    data = request.data
    user = User.objects.get(email=userEmail)
    serializer = UserSerializer(instance=user, data=data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)