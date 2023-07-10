from django.db import models
import os
from uuid import uuid4

def path_and_rename(instance, filename):
    upload_to = 'profile_pictures'
    ext = filename.split('.')[-1]  # get file extension
    # check whether the instance has an id
    if instance.user_id:
        # remove extension in original file name
        filename_no_ext = os.path.splitext(filename)[0]
        # add a timestamp to filename to avoid duplicate filenames
        filename = '{}_{}.{}'.format(filename_no_ext, uuid4().hex, ext)
    else:
        filename = '{}.{}'.format(uuid4().hex, ext)
    return os.path.join(upload_to, str(instance.user_id), filename)

# Create your models here.

class User(models.Model):
    user_id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    age = models.IntegerField()
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)
    profile_picture = models.ImageField(upload_to=path_and_rename, blank=True, null=True)
    bio = models.TextField(blank=True)
    budget = models.CharField(max_length=50, blank=True)
    interest_beach_bum = models.BooleanField(default=False)
    interest_foodie = models.BooleanField(default=False)
    interest_adventurer = models.BooleanField(default=False)
    interest_museum_magnet = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.first_name} {self.last_name}'
    


# Model to represent user likes
class Like(models.Model):
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sender_likes')
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='receiver_likes')

    def __str__(self):
        return f'{self.sender} likes {self.receiver}'
    

class Pass(models.Model):
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sender_passes')
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='receiver_passes')

    def __str__(self):
        return f'{self.sender} passes {self.receiver}'


# Model to represent matches
class Match(models.Model):
    user1 = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user1_matches')
    user2 = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user2_matches')

    def __str__(self):
        return f'{self.user1} matched with {self.user2}'

# Model to represent messages
class Message(models.Model):
    message_id = models.AutoField(primary_key=True)
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_messages')
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_messages')
    message_content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.sender} to {self.receiver}: {self.message_content}'