from django.shortcuts import render
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django.db.models import Q
from .models import *
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
    
    # Exclude the current user, the users they have liked, and the users they have passed
    unseen_users = User.objects.exclude(user_id=userId).exclude(user_id__in=liked_users).exclude(user_id__in=passed_users)

    serializer = UserSerializer(unseen_users, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def pass_user(request, user_id, target_id):
    # Get the user and the target user objects
    user = get_object_or_404(User, user_id=user_id)
    target_user = get_object_or_404(User, user_id=target_id)

    # Create a new Pass instance
    new_pass = Pass(sender=user, receiver=target_user)
    new_pass.save()

    return JsonResponse({"message": f"User {user_id} passed User {target_id}"})

@api_view(['POST'])
def like_user(request, user_id, target_id):
    # Get the user and the target user objects
    user = get_object_or_404(User, user_id=user_id)
    target_user = get_object_or_404(User, user_id=target_id)

    # Create a new Like instance
    new_like = Like(sender=user, receiver=target_user)
    new_like.save()

    # Check if there is a mutual like (a match)
    if Like.objects.filter(sender=target_user, receiver=user).exists():
        new_match = Match(user1=user, user2=target_user)
        new_match.save()

    return JsonResponse({"message": f"User {user_id} liked User {target_id}"})


@api_view(['GET'])
def getMatches(request, userEmail):
    user = User.objects.get(email=userEmail)
    matches = Match.objects.filter(Q(user1=user) | Q(user2=user))
    matched_users = []
    for match in matches:
        if match.user1.email == userEmail:
            matched_users.append(match.user2)
        else:
            matched_users.append(match.user1)

    serializer = UserSerializer(matched_users, many=True)
    return Response(serializer.data)
