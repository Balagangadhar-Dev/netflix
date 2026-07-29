from django.db import models

class Movie(models.Model):
    name = models.CharField(max_length=200)
    genre = models.CharField(max_length=100)
    releaseYear = models.IntegerField()
    rating = models.CharField(max_length=20)
    duration = models.CharField(max_length=20)
    director = models.CharField(max_length=100)
    cast = models.TextField()
    description = models.TextField()
    bannerUrl = models.URLField()
    trailer = models.URLField()
