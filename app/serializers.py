from rest_framework import serializers
from .models import Movie

# ==========================================
# DRF CONCEPT: SERIALIZER
# A Serializer converts complex Django Model instances
# into native Python datatypes that can be easily rendered into JSON.
# It also handles deserialization (validating incoming JSON data
# and converting it back into complex types to save to the database).
# ==========================================

class MovieSerializer(serializers.ModelSerializer):
    """
    ModelSerializer automatically creates fields based on the Movie model
    and provides default implementations for create() and update().
    """
    class Meta:
        model = Movie
        fields = [
            'id',
            'name',
            'genre',
            'releaseYear',
            'rating',
            'duration',
            'director',
            'cast',
            'description',
            'bannerUrl',
            'trailer'
        ]

    # Optional validation example to teach students field validation:
    def validate_releaseYear(self, value):
        if value < 1888:
            raise serializers.ValidationError("Release year cannot be earlier than 1888 (the year the first film was made).")
        return value
