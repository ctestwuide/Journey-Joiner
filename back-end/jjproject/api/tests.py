from django.test import TestCase
from django.core.files.uploadedfile import SimpleUploadedFile
from .models import User, Like, Pass, Match, Message
from .views import getUsers, getUser, signup, login, updateUser, updateUserPicture, getUnseenUsers, pass_user, like_user, getMatches
from rest_framework.test import APIRequestFactory, force_authenticate
from .serializers import *

class UserModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create(
            first_name="test",
            last_name="user",
            age=25,
            email="testuser@gmail.com",
            password="test123"
        )

    def test_user_creation(self):
        user = User.objects.get(email="testuser@gmail.com")
        self.assertEqual(user.first_name, "test")
        self.assertEqual(user.last_name, "user")
        self.assertEqual(user.age, 25)
        self.assertEqual(user.email, "testuser@gmail.com")
        self.assertEqual(user.password, "test123")

class UserViewTest(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.user = User.objects.create(
            first_name="test",
            last_name="user",
            age=25,
            email="testuser@gmail.com",
            password="test123"
        )

    def test_getUsers(self):
        request = self.factory.get('/getUsers/')
        response = getUsers(request)
        self.assertEqual(response.status_code, 200)

    def test_getUser(self):
        request = self.factory.get(f'/getUser/{self.user.email}/')
        response = getUser(request, userEmail=self.user.email)
        self.assertEqual(response.status_code, 200)

    def test_signup(self):
        data = {
            'first_name': 'test2',
            'last_name': 'user2',
            'age': 24,
            'email': 'testuser2@gmail.com',
            'password': 'test1234'
        }
        request = self.factory.post('/signup/', data)
        response = signup(request)
        self.assertEqual(response.status_code, 200)

    def test_login(self):
        data = {
            'email': 'testuser@gmail.com',
            'password': 'test123'
        }
        request = self.factory.post('/login/', data)
        response = login(request)
        self.assertEqual(response.status_code, 200)

    def test_updateUser(self):
        data = {
            'first_name': 'test_update',
            'last_name': 'user_update',
            'age': 26,
            'email': 'testuser_update@gmail.com',
            'password': 'test123_update'
        }
        request = self.factory.put(f'/updateUser/{self.user.email}/', data)
        response = updateUser(request, userEmail=self.user.email)
        self.assertEqual(response.status_code, 200)

    def test_updateUserPicture(self):
        image = SimpleUploadedFile("file.jpg", b"file_content", content_type="image/jpeg")
        request = self.factory.put(f'/updateUserPicture/{self.user.email}/', {'profile_picture': image})
        response = updateUserPicture(request, userEmail=self.user.email)
        self.assertEqual(response.status_code, 200)

class UserActionTest(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.user1 = User.objects.create(
            first_name="test1",
            last_name="user1",
            age=25,
            email="testuser1@gmail.com",
            password="test123"
        )
        self.user2 = User.objects.create(
            first_name="test2",
            last_name="user2",
            age=26,
            email="testuser2@gmail.com",
            password="test123"
        )

    def test_getUnseenUsers(self):
        Like.objects.create(sender=self.user1, receiver=self.user2)
        request = self.factory.get(f'/getUnseenUsers/{self.user1.user_id}/')
        response = getUnseenUsers(request, userId=self.user1.user_id)
        self.assertEqual(response.status_code, 200)
        # The response should not contain the user who has already been liked
        self.assertNotIn(UserSerializer(self.user2).data, response.data)

    def test_pass_user(self):
        request = self.factory.post(f'/pass_user/{self.user1.user_id}/{self.user2.user_id}/')
        response = pass_user(request, user_id=self.user1.user_id, target_id=self.user2.user_id)
        self.assertEqual(response.status_code, 200)
        # The pass should be recorded in the database
        self.assertTrue(Pass.objects.filter(sender=self.user1, receiver=self.user2).exists())

    def test_like_user_without_match(self):
        request = self.factory.post(f'/like_user/{self.user1.user_id}/{self.user2.user_id}/')
        response = like_user(request, user_id=self.user1.user_id, target_id=self.user2.user_id)
        self.assertEqual(response.status_code, 200)
        # The like should be recorded in the database
        self.assertTrue(Like.objects.filter(sender=self.user1, receiver=self.user2).exists())
        # But a match should not be created if the like is not mutual
        self.assertFalse(Match.objects.filter(user1=self.user1, user2=self.user2).exists())

    def test_like_user_with_match(self):
        Like.objects.create(sender=self.user2, receiver=self.user1)
        request = self.factory.post(f'/like_user/{self.user1.user_id}/{self.user2.user_id}/')
        response = like_user(request, user_id=self.user1.user_id, target_id=self.user2.user_id)
        self.assertEqual(response.status_code, 200)
        # Now that the like is mutual, a match should be created
        self.assertTrue(Match.objects.filter(user1=self.user1, user2=self.user2).exists() or Match.objects.filter(user1=self.user2, user2=self.user1).exists())
