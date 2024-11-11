from rest_framework import serializers
from .models import (Partners, Courses_Category, Courses, People_Interested, Provinces, Cantons, Districts, 
                     Neighborhoods, Addresses, Genre, Student_Status, Identifications, Form, Administrator, Student, Course_Status, Enrollment, Payment_Methods, Payment)


class PartnersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Partners
        fields = '__all__'
    

class Courses_CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Courses_Category
        fields = '__all__'
    
           
class CoursesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Courses
        fields = '__all__'
        
    
class People_InterestedSerializer(serializers.ModelSerializer):
    class Meta:
        model = People_Interested
        fields = '__all__'

class ProvincesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Provinces
        fields = '__all__'
        
class CantonsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cantons
        fields = '__all__'
        
class DistrictsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Districts
        fields = '__all__'
        
class NeighborhoodsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Neighborhoods
        fields = '__all__'
        
class AddressesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Addresses
        fields = '__all__'
        
class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = '__all__'
        
class Student_StatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student_Status
        fields = '__all__'
        
class IdentificationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Identifications
        fields = '__all__'
     
class FormSerializer(serializers.ModelSerializer):
    class Meta:
        model = Form
        fields = '__all__'
        
class AdministratorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Administrator
        fields = '__all__'
        
class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'
        
class Course_StatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course_Status
        fields = '__all__'
        
class EnrollmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Enrollment
        fields = '__all__'


class Payment_MethodsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment_Methods
        fields = '__all__'

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = '__all__'
        








        










        


        

