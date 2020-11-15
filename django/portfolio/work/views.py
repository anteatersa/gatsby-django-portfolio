from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from work.models import Work, WorkSection, WorkSectionImage
from work.serializers import WorkSerializer, WorkSectionSerializer, WorkSectionImageSerializer
from dynamic_preferences.registries import global_preferences_registry
import requests

def DeploySite(request):
    # Gatsby plugin deploy
    r = requests.post('http://gatsby:8000/deploy', data = {'key':'value'}, headers={"secret_key": "vaXahW5weiph8vah"})
    return HttpResponse("Build signal sent to Gatsby. Wait for build to complete then look in the public folder for your static site and copy to your hosting provider public html folder.")

@api_view(['GET'])
def SettingsView(request):
    """
    API endpoint to fetch site settings for Gatsby
    """

    # We instantiate a manager for our global preferences
    global_preferences = global_preferences_registry.manager()
    data = {
        "title": global_preferences['general__title'],
        "intro": global_preferences['general__intro_text'],
        "home_body_colour": global_preferences['general__home_body_colour'],
        "home_body_shade": global_preferences['general__home_light_or_dark'],
        "home_light_or_dark": global_preferences['general__home_light_or_dark'],
        "home_text_colour": global_preferences['general__home_text_colour'],
        "home_header_text_colour": global_preferences['general__home_header_text_colour'],
    }
    logo_light = global_preferences['general__logo_light']
    if logo_light:
        data['logo_light'] = logo_light.url
    else:
        data['logo_light'] = None
    logo_dark = global_preferences['general__logo_dark']
    if logo_dark:
        data['logo_dark'] = logo_dark.url
    else:
        data['logo_dark'] = None
    svg_logo = global_preferences['general__svg_logo']
    if svg_logo:
        data['svg_logo'] = svg_logo
    else:
        data['svg_logo'] = None
    return Response(data)
    #permission_classes = [permissions.IsAuthenticatedOrReadOnly] # Allow editing for authenticated users and readonly for unauthenticated

    #def get(self, request, format=None):
    #    s = type('request', (), {})()  # Create request object on the fly
    #    s.title = "test title"
    #    results = SettingsSerializer(s, many=False).data
    #    return Response(results)

class WorkViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Work.objects.all().order_by('-date')
    serializer_class = WorkSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly] # Allow editing for authenticated users and readonly for unauthenticated

class WorkSectionViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = WorkSection.objects.all().order_by('-id')
    serializer_class = WorkSectionSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly] # Allow editing for authenticated users and readonly for unauthenticated

class WorkSectionImageViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = WorkSectionImage.objects.all().order_by('-id')
    serializer_class = WorkSectionImageSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly] # Allow editing for authenticated users and readonly for unauthenticated
