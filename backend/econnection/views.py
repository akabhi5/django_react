from rest_framework import generics
from .models import Connection
from .serializers import ConnectionSerializer, ConnectionSerializerPost
from .pagination import ConnectionPagination


class ConnectionList(generics.ListCreateAPIView):
    pagination_class = ConnectionPagination

    def get_queryset(self):
        app_id = self.request.query_params.get('id')
        if app_id is None or app_id == '':
            return Connection.objects.all()
        else:
            return Connection.objects.filter(id=app_id)

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return ConnectionSerializer
        elif self.request.method == 'POST':
            return ConnectionSerializerPost


class ConnectionDetail(generics.RetrieveUpdateAPIView):
    queryset = Connection.objects.all()
    serializer_class = ConnectionSerializerPost


class ConnectionGraph(generics.ListAPIView):
    serializer_class = ConnectionSerializer

    def get_queryset(self):
        start_date = self.request.query_params.get('start_date')
        end_date = self.request.query_params.get('end_date')
        status = self.request.query_params.get('status')
        if status is None:
            return Connection.objects.filter(date_of_application__range=[start_date, end_date])
        else:
            return Connection.objects.filter(status=status, date_of_application__range=[start_date, end_date])
