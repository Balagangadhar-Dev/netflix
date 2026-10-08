from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api_views import MovieViewSet

# DefaultRouter automatically registers all CRUD routes:
# /api/movies/       (GET, POST)
# /api/movies/<id>/  (GET, PUT, PATCH, DELETE)
router = DefaultRouter()
router.register(r'movies', MovieViewSet, basename='movie')

urlpatterns = [
    path('', include(router.urls)),
]
