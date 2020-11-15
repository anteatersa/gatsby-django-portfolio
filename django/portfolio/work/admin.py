from django.contrib import admin
from work.models import Work, WorkSection, WorkSectionImage
import nested_admin



class ImageInline(nested_admin.NestedTabularInline):
    model = WorkSectionImage
    sortable_field_name = "sorting"
    #exclude = ('sorting',)
    extra = 0

class SectionInline(nested_admin.NestedTabularInline):
    model = WorkSection
    inlines = [ImageInline,]
    exclude = ('video',)
    sortable_field_name = "sorting"
    extra = 0
    #raw_id_fields = ("images",)

class WorkAdmin(nested_admin.NestedModelAdmin):
    inlines = [SectionInline,]
    list_display = ('title', 'active')
    class Media:   
        css = {
            'all': ('/static/admin-extra.css',)
        }
admin.site.register(Work, WorkAdmin)

class WorkSectionAdmin(admin.ModelAdmin):
    pass
admin.site.register(WorkSection, WorkSectionAdmin)

class WorkSectionImageAdmin(admin.ModelAdmin):
    pass
admin.site.register(WorkSectionImage, WorkSectionImageAdmin)

