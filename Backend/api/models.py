from django.db import models
from django.contrib.auth.models import User
#Primera migracion
class Partners(models.Model):
    partner_name = models.CharField(max_length=100)
    partner_logo_url = models.URLField()

# Segunda migracion
class Courses_Category(models.Model):
    category_name = models.CharField(max_length=100)

#Tercera migracion 
class Courses(models.Model):
    course_image_url = models.URLField()
    course_name = models.CharField(max_length=100)
    course_description = models.TextField()
    course_price = models.DecimalField(max_digits=10, decimal_places=2)
    course_schedule = models.CharField(max_length=40)
    begins = models.DateField()
    ends = models.DateField()
    course_duration =  models.CharField(max_length=30)
    course_category_fk = models.ForeignKey(Courses_Category, on_delete=models.CASCADE)

#Cuarta migracion 
class People_Interested(models.Model):
    person_name = models.CharField(max_length=50)
    person_first_last_name = models.CharField(max_length=50)
    person_email = models.EmailField()
    person_phone_number = models.CharField(max_length=20)
    person_notes = models.TextField(max_length=255)
    course = models.TextField(max_length=50)
    
#Quinta migracion 
class Provinces(models.Model):
    province_name = models.CharField(max_length=50)


class Cantons(models.Model):
    canton_name = models.CharField(max_length=100)
    province_fk = models.ForeignKey(Provinces, on_delete=models.CASCADE)
   
class Districts(models.Model):
    district_name = models.CharField(max_length=100)
    canton_fk = models.ForeignKey(Cantons, on_delete=models.CASCADE)
   
class Neighborhoods(models.Model):
    neighborhood_name = models.CharField(max_length=100)
    district_fk =  models.ForeignKey(Districts, on_delete=models.CASCADE)


class Addresses(models.Model):
    address = models.TextField()
    neighborhood_fk = models.ForeignKey(Neighborhoods, on_delete=models.CASCADE)


#Sexta migracion 
class Genre(models.Model):
    genre_name = models.CharField(max_length=50)

#Sétima migración 
class Student_Status(models.Model):
    status_name = models.CharField(max_length=50)

#Octava migración 
class Identifications(models.Model):
    identification_type = models.CharField(max_length=50)
    
#Novena migración 
class Form(models.Model):
    identification_number = models.CharField(max_length=50, unique=True)
    name = models.CharField(max_length=50)
    first_last_name = models.CharField(max_length=50)
    second_last_name = models.CharField(max_length=50)
    birth_date = models.DateField()
    phone_number = models.CharField(max_length=20)
    email = models.EmailField()
    identification_fk = models.ForeignKey(Identifications, on_delete=models.CASCADE)
    genre_fk =  models.ForeignKey(Genre, on_delete=models.CASCADE)
    address_fk = models.ForeignKey(Addresses, on_delete=models.CASCADE)
    course_fk = models.ForeignKey(Courses, on_delete=models.CASCADE)
    student_status_fk = models.ForeignKey(Student_Status, on_delete=models.CASCADE)

#Decima migración 
class Administrator(models.Model):  
    admin_name = models.CharField(max_length=50)
    admin_first_last_name = models.CharField(max_length=50)
    admin_second_last_name = models.CharField(max_length=50)
    admin_phone_number = models.CharField(max_length=20)
    admin_email = models.EmailField()
    admin_address_fk = models.ForeignKey(Addresses, on_delete=models.CASCADE)
    admin_auth_user_fk = models.ForeignKey(User, on_delete=models.CASCADE)
    
#Undecima migración 
class Student(models.Model):
    student_name = models.CharField(max_length=50)
    student_first_last_name = models.CharField(max_length=50)
    student_second_last_name = models.CharField(max_length=50)
    student_birth_date = models.DateField()
    student_phone_number = models.CharField(max_length=20)
    student_email = models.EmailField()
    student_address_fk = models.ForeignKey(Addresses, on_delete=models.CASCADE)
    student_auth_user_fk = models.ForeignKey(User, on_delete=models.CASCADE)

#Doceava migración 
class Course_Status(models.Model):
    status_name = models.CharField(max_length=50)

#Treceava migración 
class Enrollment(models.Model):
    enrollment_date = models.DateTimeField()
    student_fk = models.ForeignKey(Student, on_delete=models.CASCADE)
    course_fk = models.ForeignKey(Courses, on_delete=models.CASCADE)
    course_status_fk  = models.ForeignKey(Course_Status, on_delete=models.CASCADE)
    
#Catorceava migración 
class Payment_Methods(models.Model):
    payment_method_name = models.CharField(max_length=50)

#Quincea migración 
class Payment(models.Model):
    payment_date = models.DateTimeField()
    payment_amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_receipt_url = models.URLField()
    paypal_receipt_url = models.URLField()
    payment_method_fk = models.ForeignKey(Payment_Methods, on_delete=models.CASCADE)
