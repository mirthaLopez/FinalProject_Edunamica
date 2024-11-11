from rest_framework import serializers
from .models import (Partners, Courses_Category, Courses, People_Interested, Provinces, Cantons, Districts, 
                     Neighborhoods, Addresses, Genre, Student_Status, Identifications, Form, Administrator, Student, Course_Status, Enrollment, Payment_Methods, Payment)


class PartnersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Partners
        fields = '__all__'
    
    def validate_partner_name(self, value):
        if not value:
            raise serializers.ValidationError("El nombre de la alianza no puede estar vacío.")
    def validate_partner_logo_url(self, value):
        if not value:
            raise serializers.ValidationError("El campo del logo no puede estar vacío.")
        return value

##############################################################################################  
class Courses_CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Courses_Category
        fields = '__all__'
    def validate_category_name(self, value):
        if not value:
            raise serializers.ValidationError("El nombre de la categoría no puede estar vacío.")
        
##############################################################################################      
class CoursesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Courses
        fields = '__all__'
        
    def validate_course_image_url(self, value):
        if not value:
            raise serializers.ValidationError(" El campo de la imagen de referencia no puede estar vacío.")
        return value
    def validate_course_name(self, value):
        if not value:
            raise serializers.ValidationError("El nombre del curso no puede estar vacío.")
    def validate_course_description(self, value):
        if not value:
            raise serializers.ValidationError("La descripción del curso no puede estar vacío.")
        if len(value) < 100:
            raise serializers.ValidationError("La descripción de la categoría debe contener al menos 100 carácteres.")
    def validate_course_price(self, value):
        if value < 0:
            raise serializers.ValidationError("El precio del curso no puede ser negativo.")
        return value
    def validate_course_schedule(self, value):
        if not value:
            raise serializers.ValidationError("El horario del curso no puede estar vacío.")
    
    def valid_begins_ends(self, begins, ends, value):
        if begins >= ends:
            raise serializers.ValidationError("La fecha de finalización del curso debe ser posterior a la fecha de inicio.")
        return value
    def validate_course_duration(self, value):
        if not value:
            raise serializers.ValidationError("La duración del curso no puede estar vacía.")
    
#############################################################################################
class People_InterestedSerializer(serializers.ModelSerializer):
    class Meta:
        model = People_Interested
        fields = '__all__'
    def validate_person_name(self, value):
        if not value:
            raise serializers.ValidationError("El campo nombre no puede estar vacío.")
    def validate_person_first_last_name(self, value):
        if not value:
            raise serializers.ValidationError("El campo apellido no puede estar vacío.")
    def validate_person_email(self, value):
        if '@' not in value:
            raise serializers.ValidationError("El correo electrónico debe contener el símbolo '@'.")
        return value
    def validate_course(self, value):
        if not value:
            raise serializers.ValidationError("El campo nombre del curso no puede estar vacío.")

########################################################################################################
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
    
    def validate_address(self, value):
        if not value:
            raise serializers.ValidationError("Debes escrbir tu dirección exacta.")

#############################################################################      
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

######################################################################
class FormSerializer(serializers.ModelSerializer):
    class Meta:
        model = Form
        fields = '__all__'
        
    def validate_name(self, value):
        if not value:
            raise serializers.ValidationError("El campo nombre no puede estar vacío.")
    def validate_first_last_name(self, value):
        if not value:
            raise serializers.ValidationError("El campo del primer apellido no puede estar vacío.")
    def validate_second_last_name(self, value):
        if not value:
            raise serializers.ValidationError("El campo del segundo apellido no puede estar vacío.")
    def validate_email(self, value):
        if '@' not in value:
            raise serializers.ValidationError("El correo electrónico debe contener el símbolo '@'.")
        return value
        
class AdministratorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Administrator
        fields = '__all__'
    def validate_admin_name(self, value):
        if not value:
            raise serializers.ValidationError("El campo nombre no puede estar vacío.")
    def validate_admin_first_last_name(self, value):
        if not value:
            raise serializers.ValidationError("El campo del primer apellido no puede estar vacío.")
    def validate_admin_second_last_name(self, value):
        if not value:
            raise serializers.ValidationError("El campo del segundo apellido no puede estar vacío.")
    def validate_admin_email(self, value):
        if '@' not in value:
            raise serializers.ValidationError("El correo electrónico debe contener el símbolo '@'.")
        return value
    
##################################################################################    
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
        
    def validate_payment_amount(self, value):
        if value < 0:
            raise serializers.ValidationError("El total del pago realizado no puede ser negativo.")
        return value
        
    
        








        










        


        

