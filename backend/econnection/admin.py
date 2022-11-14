from django.contrib import admin
from .models import Connection, Category


class ConnectionAdmin(admin.ModelAdmin):
    list_display = ['applicant_name', 'ownership', 'gov_id_type', 'date_of_application',
                    'category', 'load_applied', 'status']


class CategoryAdmin(admin.ModelAdmin):
    list_display = ['type']


admin.site.register(Connection, ConnectionAdmin)
admin.site.register(Category, CategoryAdmin)
