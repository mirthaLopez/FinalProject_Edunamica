from django.shortcuts import render
from rest_framework import generics
from .models import (Partners, Courses_Category, Courses, People_Interested, Provinces, Cantons, Districts, 
                     Neighborhoods, Addresses, Genre, Student_Status, Identifications, Form, Administrator, Student, Course_Status, Enrollment, Payment_Methods, Payment)

from .serializers import (
    PartnersSerializer, Courses_CategorySerializer, CoursesSerializer, People_InterestedSerializer, 
    ProvincesSerializer, CantonsSerializer, DistrictsSerializer, NeighborhoodsSerializer, 
    AddressesSerializer, GenreSerializer, Student_StatusSerializer, IdentificationsSerializer, 
    FormSerializer, AdministratorSerializer, StudentSerializer, Course_StatusSerializer, 
    EnrollmentSerializer, Payment_MethodsSerializer, PaymentSerializer
)

class PartnersListCreate(generics.ListCreateAPIView):
    queryset = Partners.objects.all()
    serializer_class = PartnersSerializer
    
class PartnersDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Partners.objects.all()
    serializer_class = PartnersSerializer
    
class Courses_CategoryListCreate(generics.ListCreateAPIView):
    queryset = Courses_Category.objects.all()
    serializer_class = Courses_CategorySerializer

class Courses_CategoryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Courses_Category.objects.all()
    serializer_class = Courses_CategorySerializer
    
class CoursesListCreate(generics.ListCreateAPIView):
    queryset = Courses.objects.all()
    serializer_class = CoursesSerializer

class CoursesDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Courses.objects.all()
    serializer_class = CoursesSerializer
    
class People_InterestedListCreate(generics.ListCreateAPIView):
    queryset = People_Interested.objects.all()
    serializer_class = People_InterestedSerializer

class People_InterestedDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = People_Interested.objects.all()
    serializer_class = People_InterestedSerializer

class ProvincesListCreate(generics.ListCreateAPIView):
    queryset = Provinces.objects.all()
    serializer_class = ProvincesSerializer

class ProvincesDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Provinces.objects.all()
    serializer_class = ProvincesSerializer

class CantonsListCreate(generics.ListCreateAPIView):
    queryset = Cantons.objects.all()
    serializer_class = CantonsSerializer

class CantonsDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Cantons.objects.all()
    serializer_class = CantonsSerializer

class DistrictsListCreate(generics.ListCreateAPIView):
    queryset = Districts.objects.all()
    serializer_class = DistrictsSerializer

class DistrictsDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Districts.objects.all()
    serializer_class = DistrictsSerializer

class NeighborhoodsListCreate(generics.ListCreateAPIView):
    queryset = Neighborhoods.objects.all()
    serializer_class = NeighborhoodsSerializer

class NeighborhoodsDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Neighborhoods.objects.all()
    serializer_class = NeighborhoodsSerializer

class AddressesListCreate(generics.ListCreateAPIView):
    queryset = Addresses.objects.all()
    serializer_class = AddressesSerializer

class AddressesDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Addresses.objects.all()
    serializer_class = AddressesSerializer

class GenreListCreate(generics.ListCreateAPIView):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer

class GenreDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer

class Student_StatusListCreate(generics.ListCreateAPIView):
    queryset = Student_Status.objects.all()
    serializer_class = Student_StatusSerializer

class Student_StatusDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Student_Status.objects.all()
    serializer_class = Student_StatusSerializer

class IdentificationsListCreate(generics.ListCreateAPIView):
    queryset = Identifications.objects.all()
    serializer_class = IdentificationsSerializer

class IdentificationsDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Identifications.objects.all()
    serializer_class = IdentificationsSerializer

class FormListCreate(generics.ListCreateAPIView):
    queryset = Form.objects.all()
    serializer_class = FormSerializer

class FormDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Form.objects.all()
    serializer_class = FormSerializer

class AdministratorListCreate(generics.ListCreateAPIView):
    queryset = Administrator.objects.all()
    serializer_class = AdministratorSerializer

class AdministratorDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Administrator.objects.all()
    serializer_class = AdministratorSerializer

class StudentListCreate(generics.ListCreateAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

class StudentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

class Course_StatusListCreate(generics.ListCreateAPIView):
    queryset = Course_Status.objects.all()
    serializer_class = Course_StatusSerializer

class Course_StatusDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Course_Status.objects.all()
    serializer_class = Course_StatusSerializer

class EnrollmentListCreate(generics.ListCreateAPIView):
    queryset = Enrollment.objects.all()
    serializer_class = EnrollmentSerializer

class EnrollmentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Enrollment.objects.all()
    serializer_class = EnrollmentSerializer

class Payment_MethodsListCreate(generics.ListCreateAPIView):
    queryset = Payment_Methods.objects.all()
    serializer_class = Payment_MethodsSerializer

class Payment_MethodsDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Payment_Methods.objects.all()
    serializer_class = Payment_MethodsSerializer

class PaymentListCreate(generics.ListCreateAPIView):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer

class PaymentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer


