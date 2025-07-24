from rest_framework import viewsets
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
        id_user = self.kwargs.get("id_user")
        if id_user:
            return super().get_queryset().filter(id_user=id_user)
        return super().get_queryset()
