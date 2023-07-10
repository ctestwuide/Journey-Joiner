from django.shortcuts import render
from django.http import JsonResponse
from .models import User
# from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import UserSerializer
# from django.contrib.auth import authenticate

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


@api_view(['POST'])
def login(request):
    email = request.data.get('email')
    password = request.data.get('password')

    try:
        user = User.objects.get(email=email)
        if user.password == password:
            serializer = UserSerializer(user)
            return Response(serializer.data)
        else:
            return JsonResponse({'error': 'Invalid Login Credentials'})

    except User.DoesNotExist:
        return JsonResponse({'error': 'Invalid Login Credentials'})



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

@api_view(['PUT'])
def updateUserPicture(request, userEmail):
    user = User.objects.get(email=userEmail)
    user.profile_picture = request.FILES['profile_picture'] if 'profile_picture' in request.FILES else user.profile_picture
    user.save()
    serializer = UserSerializer(user)
    return Response(serializer.data)


@api_view(['GET'])
def getUnseenUsers(request, userId):
    # Fetch the users who the logged-in user has not liked or passed yet
    liked_users = Like.objects.filter(sender=userId).values_list('receiver', flat=True)
    passed_users = Pass.objects.filter(sender=userId).values_list('receiver', flat=True)
    unseen_users = User.objects.exclude(user_id__in=liked_users).exclude(user_id__in=passed_users)
    serializer = UserSerializer(unseen_users, many=True)
    return Response(serializer.data)

