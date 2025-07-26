from django import forms
from django.forms import ModelForm
from django.contrib.auth.forms import UserCreationForm
from data.models import User


class UserForm(UserCreationForm):
    email = forms.EmailField(required=True)

    class Meta:
        model = User
        fields = ["name", "email", "password1", "password2"]
        labels = {
            "name": "Nome",
            "email": "E-mail",
        }
