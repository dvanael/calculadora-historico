from rest_framework import viewsets, views
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializers import UserSerializer, OperationSerializer
from data.models import User, Operation

# Create your views here.


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    http_method_names = ["get"]


class OperationViewSet(viewsets.ModelViewSet):
    queryset = Operation.objects.all()
    serializer_class = OperationSerializer
    http_method_names = ["get", "post", "delete", "put"]

    def get_queryset(self):
        id_user = self.kwargs.get("user_pk")
        if id_user:
            return super().get_queryset().filter(id_user=id_user)
        return super().get_queryset()


class UserMeViewSet(views.APIView):
    permission_classes = [IsAuthenticated]
    http_method_names = ["get"]

    def get(self, request, format=None):
        data = {
            "id": request.user.id,
            "name": request.user.name,
            "email": request.user.email,
            "auth": request.user.is_authenticated,
        }
        return Response(data)
