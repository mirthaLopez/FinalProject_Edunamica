from django.urls import path
from . import views
from rest_framework_simplejwt.views import (TokenObtainPairView,TokenRefreshView,)


urlpatterns = [
   
   # Urls simplejwt token
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  # Para obtener token de acceso y refresco
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # Para refrescar el token de acceso
]