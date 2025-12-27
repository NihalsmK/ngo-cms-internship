from django.contrib import admin
from .models import User

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('id', 'email', 'full_name', 'role', 'status', 'created_at')
    search_fields = ('email', 'full_name')
    list_filter = ('role', 'status', 'created_at')
    ordering = ('-created_at',)
