from django.urls import reverse_lazy
from django.shortcuts import render, redirect
from django.views.generic import TemplateView, CreateView
from django.contrib.auth import login, authenticate
from django.contrib.auth.mixins import LoginRequiredMixin
from data.models import User
from .forms import UserForm


class IndexView(LoginRequiredMixin, TemplateView):
    template_name = "index.html"


class RegisterView(CreateView):
    model = User
    form_class = UserForm
    template_name = "client/register.html"
    success_url = reverse_lazy("index")

    def form_valid(self, form):
        user = form.save()
        email = form.cleaned_data["email"]
        password = form.cleaned_data["password1"]
        user = authenticate(username=email, password=password)
        if user is not None:
            login(self.request, user)
            return redirect("index")
        return super().form_valid(form)
