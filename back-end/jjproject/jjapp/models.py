from django.db import models

class User(models.Model):
    UserID = models.AutoField(primary_key=True)
    FirstName = models.CharField(max_length=100)
    LastName = models.CharField(max_length=100)
    BirthDate = models.DateField()
    Password = models.CharField(max_length=100)
    Email = models.EmailField(unique=True)
    ProfilePicture = models.ImageField(upload_to='profile_pictures', blank=True)
    Bio = models.TextField(blank=True)
    Budget = models.DecimalField(max_digits=8, decimal_places=2)
    Interests = models.ManyToManyField('Interest')

class Match(models.Model):
    user1 = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user1_matches')
    user2 = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user2_matches')
    is_matched = models.BooleanField(default=False)

    class Meta:
        # Ensure uniqueness in the match between user1 and user2
        unique_together = ['user1', 'user2']
    # Add any additional fields you need for the Matches model

class Message(models.Model):
    MessageID = models.AutoField(primary_key=True)
    SenderID = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_messages')
    ReceiverID = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_messages')
    MessageContent = models.TextField()
    Timestamp = models.DateTimeField(auto_now_add=True)
    # Add any additional fields you need for the Messages model

class Interest(models.Model):
    name = models.CharField(max_length=100)
    # Add any additional fields you need for the Interests model
