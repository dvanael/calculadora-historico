from django.db import models
from .user import User


class Operation(models.Model):
    id = models.BigAutoField(
        primary_key=True, auto_created=True, serialize=False, verbose_name="ID"
    )
    id_user = models.ForeignKey(User, on_delete=models.CASCADE)
    parameters = models.CharField(max_length=255)
    result = models.CharField(max_length=255)
    inclusion_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-inclusion_date"]
