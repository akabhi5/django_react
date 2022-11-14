from rest_framework import serializers
from .models import Connection, Category


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'type']


class ConnectionSerializer(serializers.ModelSerializer):
    # category = CategorySerializer(read_only=True)
    gender = serializers.CharField(source='get_gender_display')
    ownership = serializers.CharField(source='get_ownership_display')
    gov_id_type = serializers.CharField(source='get_gov_id_type_display')
    status = serializers.CharField(source='get_status_display')

    class Meta:
        model = Connection
        fields = ['id', 'applicant_name', 'gender', 'district', 'state', 'pincode', 'ownership', 'gov_id_type',
                  'id_number', 'category', 'load_applied', 'date_of_application', 'date_of_approval', 'modified_date', 'status', 'reviewer_id', 'reviewer_name', 'reviewer_comments']

    def to_representation(self, instance):
        self.fields['category'] = CategorySerializer(read_only=True)
        return super(ConnectionSerializer, self).to_representation(instance)


class ConnectionSerializerPost(serializers.ModelSerializer):
    class Meta:
        model = Connection
        fields = ['id', 'applicant_name', 'gender', 'district', 'state', 'pincode', 'ownership', 'gov_id_type',
                  'id_number', 'category', 'load_applied', 'date_of_application', 'date_of_approval', 'modified_date', 'status', 'reviewer_id', 'reviewer_name', 'reviewer_comments']
