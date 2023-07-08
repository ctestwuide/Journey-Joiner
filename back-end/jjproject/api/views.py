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

@api_view(['POST'])
def signup(request):
    data = request.data
    user = User.objects.create(
        first_name = data['first_name'],
        last_name = data['last_name'],
        age = data['age'],
        email = data['email'],
        password = data['password'],
        )

    serializer = UserSerializer(user, many=False)

    return Response(serializer.data)


@api_view(['PUT'])
def updateUser(request, userEmail):
    print('update user test: ' + userEmail)
    data = request.data
    user = User.objects.get(email=userEmail)
    serializer = UserSerializer(instance=user, data=data)

    if serializer.is_valid():
        serializer.save()
        print('Serializer is valid:', serializer.data)
    else:
        print('Serializer errors:', serializer.errors)

    return Response(serializer.data)


