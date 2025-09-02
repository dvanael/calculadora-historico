from rest_framework import serializers
from data.models import Operation


class OperationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Operation
        fields = ["id", "id_user", "parameters", "result", "inclusion_date"]
