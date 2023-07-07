from django.shortcuts import render
from .models import User  

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def signup(request):
    if request.method == 'POST':
        # Extract the user data from the request
        first_name = request.POST.get('firstName')
        last_name = request.POST.get('lastName')
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
        return JsonResponse({'message': 'User created successfully'})
    else:
        # Return an error response for unsupported methods
        return JsonResponse({'error': 'Method not allowed'}, status=405)
