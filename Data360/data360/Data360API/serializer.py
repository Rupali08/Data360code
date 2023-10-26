from rest_framework import serializers 
from .models import Scripts
class ScriptsSerializer(serializers.ModelSerializer):
    class Meta:
        model=Scripts
        fields="__all__"