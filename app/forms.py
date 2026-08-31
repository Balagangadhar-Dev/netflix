# app/forms.py
from django import forms
from .models import Movie

class MovieForm(forms.ModelForm):
    class Meta:
        model = Movie
        fields = '__all__'














# class MovieForm1(forms.Form):
#     title = forms.CharField()
#     director = forms.CharField()
#     year = forms.IntegerField()