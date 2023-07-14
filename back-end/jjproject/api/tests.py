from django.test import TestCase
from django.core.files.uploadedfile import SimpleUploadedFile
from .models import User, Like, Pass, Match, Message
from .views import getUsers, getUser, signup, login, updateUser, updateUserPicture, getUnseenUsers, pass_user, like_user, getMatches
from rest_framework.test import APIRequestFactory, force_authenticate


class UserModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create(
            first_name="test",
            last_name="user",
            age=25,
            email="testuser@gmail.com",
            password="test123"
        )



