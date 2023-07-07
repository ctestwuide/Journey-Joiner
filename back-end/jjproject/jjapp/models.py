from django.db import models

# Custom User model
class User(models.Model):
    user_id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    age = models.IntegerField()
    email = models.EmailField()  # Add this line for the email field
    profile_picture = models.ImageField(upload_to='profile_pictures/')
    bio = models.TextField()
    budget = models.CharField(max_length=50)
    interests = models.ManyToManyField('Interest')

    def __str__(self):
        return f'{self.first_name} {self.last_name}'

# Model to represent user interests
class Interest(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

# Model to represent user likes
class Like(models.Model):
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sender_likes')
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='receiver_likes')

    def __str__(self):
        return f'{self.sender} likes {self.receiver}'

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

