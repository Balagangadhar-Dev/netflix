from django.shortcuts import render
from .models import Movie



# Create your views here.

def home(request):
    movies = Movie.objects.all()
    print(len(movies))
    context = {
        'movies':movies
    }
    return render(request, 'home.html', context)