# app/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path("add/", views.addMovie, name="add_movie"),
    path("manage/", views.manageMovies, name="manage_movies"),
    path("edit/<int:pk>/", views.editMovie, name="edit_movie"),
    path("delete/<int:pk>/", views.deleteMovie, name="delete_movie"),
]