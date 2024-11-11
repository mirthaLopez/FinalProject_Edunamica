from django.urls import path
from rest_framework_simplejwt.views import (TokenObtainPairView,TokenRefreshView,)
from . import views

urlpatterns = [
    path('partners/', views.PartnersListCreate.as_view(), name='partners-list-create'),
    path('partners/<int:pk>/', views.PartnersDetail.as_view(), name='partners-detail'),
    path('courses_category/', views.Courses_CategoryListCreate.as_view(), name='courses_category-list-create'),
    path('courses_category/<int:pk>/', views.Courses_CategoryDetail.as_view(), name='courses_category-detail'),
    path('courses/', views.CoursesListCreate.as_view(), name='courses-list-create'),
    path('courses/<int:pk>/', views.CoursesDetail.as_view(), name='courses-detail'),
    path('people_interested/', views.People_InterestedListCreate.as_view(), name='people_interested-list-create'),
    path('people_interested/<int:pk>/', views.People_InterestedDetail.as_view(), name='people_interested-detail'),
    path('provinces/', views.ProvincesListCreate.as_view(), name='provinces-list-create'),
    path('provinces/<int:pk>/', views.ProvincesDetail.as_view(), name='provinces-detail'),
    path('cantons/', views.CantonsListCreate.as_view(), name='cantons-list-create'),
    path('cantons/<int:pk>/', views.CantonsDetail.as_view(), name='cantons-detail'),
    path('districts/', views.DistrictsListCreate.as_view(), name='districts-list-create'),
    path('districts/<int:pk>/', views.DistrictsDetail.as_view(), name='districts-detail'),
    path('neighborhoods/', views.NeighborhoodsListCreate.as_view(), name='neighborhoods-list-create'),
    path('neighborhoods/<int:pk>/', views.NeighborhoodsDetail.as_view(), name='neighborhoods-detail'),
    path('addresses/', views.AddressesListCreate.as_view(), name='addresses-list-create'),
    path('addresses/<int:pk>/', views.AddressesDetail.as_view(), name='addresses-detail'),
    path('genre/', views.GenreListCreate.as_view(), name='genre-list-create'),
    path('genre/<int:pk>/', views.GenreDetail.as_view(), name='genre-detail'),
    path('student_status/', views.Student_StatusListCreate.as_view(), name='student_status-list-create'),
    path('student_status/<int:pk>/', views.Student_StatusDetail.as_view(), name='student_status-detail'),
    path('identifications/', views.IdentificationsListCreate.as_view(), name='identifications-list-create'),
    path('identifications/<int:pk>/', views.IdentificationsDetail.as_view(), name='identifications-detail'),
    path('form/', views.FormListCreate.as_view(), name='form-list-create'),
    path('form/<int:pk>/', views.FormDetail.as_view(), name='form-detail'),
    path('administrator/', views.AdministratorListCreate.as_view(), name='administrator-list-create'),
    path('administrator/<int:pk>/', views.AdministratorDetail.as_view(), name='administrator-detail'),
    path('student/', views.StudentListCreate.as_view(), name='student-list-create'),
    path('student/<int:pk>/', views.StudentDetail.as_view(), name='student-detail'),
    path('course_status/', views.Course_StatusListCreate.as_view(), name='course_status-list-create'),
    path('course_status/<int:pk>/', views.Course_StatusDetail.as_view(), name='course_status-detail'),
    path('enrollment/', views.EnrollmentListCreate.as_view(), name='enrollment-list-create'),
    path('enrollment/<int:pk>/', views.EnrollmentDetail.as_view(), name='enrollment-detail'),
    path('payment_methods/', views.Payment_MethodsListCreate.as_view(), name='payment_methods-list-create'),
    path('payment_methods/<int:pk>/', views.Payment_MethodsDetail.as_view(), name='payment_methods-detail'),
    path('payment/', views.PaymentListCreate.as_view(), name='payment-list-create'),
    path('payment/<int:pk>/', views.PaymentDetail.as_view(), name='payment-detail'),
   # Urls simplejwt token
    #path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  # Para obtener token de acceso y refresco
    #path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # Para refrescar el token de acceso
]