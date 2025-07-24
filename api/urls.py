from django.urls import path, include
from rest_framework_nested import routers
from . import views

router = routers.DefaultRouter()
router.register(r"users", views.UserViewSet, basename="users")
router.register(r"operations", views.OperationViewSet, basename="operations")

user_router = routers.NestedDefaultRouter(router, r"users", lookup="user")
user_router.register(r"operations", views.OperationViewSet, basename="user-operations")

urlpatterns = [
    path(r"", include(router.urls)),
    path(r"", include(user_router.urls)),
]
