from rest_framework import serializers
from data.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "name", "email", "inclusion_date"]
