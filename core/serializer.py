from rest_framework import serializers
from .models import Stackapi

class StackSearchapi(serializers.ModelSerializer):
    class Meta:
        model = Stackapi