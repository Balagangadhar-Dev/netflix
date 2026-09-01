# app/forms.py
from django import forms
from .models import Movie

class MovieForm(forms.ModelForm):
    class Meta:
        model = Movie
        fields = '__all__'














class MovieFormd(forms.Form):
    name = forms.CharField(max_length=200, label="Movie Name")
    genre = forms.CharField(max_length=100, label="Genre")
    releaseYear = forms.IntegerField(label="Release Year")
    rating = forms.CharField(max_length=20, label="Rating (e.g., 8.3/10)")
    duration = forms.CharField(max_length=50, label="Duration")
    director = forms.CharField(max_length=150, label="Director")
    cast = forms.CharField(max_length=255, label="Cast")
    
    # Use a Textarea widget for longer text
    description = forms.CharField(widget=forms.Textarea, label="Description")
    
    # Use URLField for automatic URL validation
    bannerUrl = forms.URLField(label="Banner Image URL")
    trailer = forms.URLField(label="Trailer URL")