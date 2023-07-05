from django.db import models

class User(models.Model):
    UserID = models.AutoField(primary_key=True)
    FirstName = models.CharField(max_length=100)
    LastName = models.CharField(max_length=100)
    BirthDate = models.DateField()
    Password = models.CharField(max_length=100)
    Email = models.EmailField()
    ProfilePicture = models.ImageField(upload_to='profile_pics/')
    Bio = models.TextField()
    Budget = models.DecimalField(max_digits=8, decimal_places=2)
    Interests = models.TextField()

class Match(models.Model):
    user1 = models.ForeignKey(User, related_name='user1_matches', on_delete=models.CASCADE)
    user2 = models.ForeignKey(User, related_name='user2_matches', on_delete=models.CASCADE)
    is_matched = models.BooleanField(default=False)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['user1', 'user2'], name='unique_match')
        ]

class Message(models.Model):
    MessageID = models.AutoField(primary_key=True)
    Sender = models.ForeignKey(User, related_name='sent_messages', on_delete=models.CASCADE)
    Receiver = models.ForeignKey(User, related_name='received_messages', on_delete=models.CASCADE)
    MessageContent = models.TextField()
    Timestamp = models.DateTimeField(auto_now_add=True)
