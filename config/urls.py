from django.contrib import admin
from django.urls import path, include
from config import settings

urlpatterns = [
    path("api/", include("api.urls")),
]

if settings.DEBUG:
    urlpatterns += [path("admin/", admin.site.urls)]
