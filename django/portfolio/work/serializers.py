from work.models import Work, WorkSection, WorkSectionImage
from rest_framework import serializers

class WorkSectionImageSerializer(serializers.HyperlinkedModelSerializer):
    pk = serializers.IntegerField(source='id')
    class Meta:
        model = WorkSectionImage
        fields = [
            'pk',
            'title',
            'image',
            'sorting'
        ]

class WorkSectionSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.CharField()
    pk = serializers.IntegerField(source='id')
    work = serializers.PrimaryKeyRelatedField(many=False, read_only=True)
    worksectionimage_set = WorkSectionImageSerializer(many=True, read_only=True)
    class Meta:
        model = WorkSection
        fields = [
            'id',
            'pk',
            'work',
            'text',
            'layout',
            'align',
            'align_vertical',
            'wide',
            'full',
            'worksectionimage_set',
            'video',
            'sorting'
        ]

#class WorkSerializer(serializers.HyperlinkedModelSerializer):
class WorkSerializer(serializers.ModelSerializer):
    id = serializers.CharField()
    worksection_set = WorkSectionSerializer(many=True, read_only=True)
    pk = serializers.IntegerField(source='id')
    class Meta:
        model = Work
        fields = [
            'id',
            'link',
            'active',
            'pk', # Hack required for gatsby graphql query
            'title',
            'image',
            'header_image',
            'hero_image',
            'hero_align',
            'slug',
            'blurb',
            'date',
            'body_colour',
            'text_colour',
            'header_text_colour',
            'worksection_set',
        ]

    def get_alternate_name(self, obj):
        return "pk"

