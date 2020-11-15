from django.db import models
from sortedm2m.fields import SortedManyToManyField
from colorfield.fields import ColorField
from tinymce.models import HTMLField
from django.db.models.signals import post_save
from django import forms
import requests

class Work(models.Model):
    active = models.BooleanField(default = False)
    title = models.CharField(max_length=256)
    link = models.CharField(default = "", max_length=256, null = True, blank = True)
    image = models.ImageField()
    header_image = models.ImageField(null = True, blank = True)
    hero_image = models.ImageField(null = True, blank = True)
    hero_align = models.CharField(max_length = 1, choices = [('l','Left'),('r','Right'),('c','Center')], default = "l")
    hide_header_text = models.BooleanField(help_text = "Hide the header text if your header image contains the header text", default = False)
    slug = models.CharField(max_length=100)
    #blurb = models.TextField()
    blurb = HTMLField()
    date = models.DateField()
    #body_colour = models.CharField(max_length=6)
    #text_colour = models.CharField(max_length=6)
    body_colour = ColorField(default='#FFFFFF')
    text_colour = ColorField(default='#333333')
    header_text_colour = ColorField(default='#333333')

    def __str__(self):
        return self.title

    class Meta:
        ordering = ("-date","title")

SECTION_TYPE_CHOICES = [
    ('text','Text'),
    ('text_image','Text Image'),
    ('image','Image'),
    ('video','Video'),
    ('image_2_1_1','Image 2 + 1 + 1'),
    ('image_gallery','Image Gallery'),
]


class WorkSection(models.Model):
    work = models.ForeignKey(Work, on_delete=models.CASCADE)
    #text = models.TextField(null = True, blank = True)
    text = HTMLField(null = True, blank = True)
    layout = models.CharField(max_length = 32, choices = SECTION_TYPE_CHOICES, default = "text")
    align = models.CharField(max_length = 1, choices = [('l','Left'),('r','Right'),('c','Center')], default = "l")
    align_vertical = models.CharField(max_length = 1, choices = [('t','Top'),('b','Bottom'),('m','Middle')], default = "t")
    wide = models.BooleanField(default = False)
    full = models.BooleanField(default = False)
    sorting = models.IntegerField(default = 0)
    #images = models.ManyToManyField(WorkSectionImage, null = True, blank = True)
    #images = SortedManyToManyField(WorkSectionImage, null = True, blank = True)
    video = models.FileField(null = True, blank = True)
     
class WorkSectionImage(models.Model):
    section = models.ForeignKey(WorkSection, on_delete=models.CASCADE)
    title = models.CharField(max_length = 512, null = True, blank = True)
    image = models.ImageField()
    sorting = models.IntegerField(default = 0)

#################
#### SIGNALS ####
#################

# Trigger rebuild after any saves to work
def save_work(sender, instance, **kwargs):
    # Gatsby plugin deploy
    #r = requests.post('http://gatsby:8000/deploy', data = {'key':'value'}, headers={"secret_key": "vaXahW5weiph8vah"})
    # Built in refresh: https://www.gatsbyjs.com/docs/environment-variables/#reserved-environment-variables
    try:
        r = requests.post('http://gatsby:8000/__refresh', data = {'key':'value'}, headers={"authorization": "vaXahW5weiph8vah"})
    except:
        print("error sending signal to gatsby")
post_save.connect(save_work, sender=Work)


