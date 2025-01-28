Here’s a detailed step-by-step guide to create a Django CRUD application for managing books and reviews in a library:

---

### **Step 1: Create a Django Project**
1. **Install Django**:
   ```bash
   pip install django
   ```

2. **Start a new Django project**:
   ```bash
   django-admin startproject library_manager
   cd library_manager
   ```

3. **Create a new app**:
   ```bash
   python manage.py startapp library
   ```

4. **Add the app to installed apps**:
   In `library_manager/settings.py`, add `'library'` to the `INSTALLED_APPS` list:
   ```python
   INSTALLED_APPS = [
       ...
       'library',
   ]
   ```

---

### **Step 2: Define Models**
1. **Edit `library/models.py`** to define `Book` and `Review` models:
   ```python
   from django.db import models

   class Book(models.Model):
       title = models.CharField(max_length=255)
       author = models.CharField(max_length=255)
       publication_date = models.DateField()
       genre = models.CharField(max_length=100)

       def __str__(self):
           return self.title

   class Review(models.Model):
       book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name="reviews")
       reviewer_name = models.CharField(max_length=255)
       rating = models.IntegerField(choices=[(i, i) for i in range(1, 6)])
       review_text = models.TextField()

       def __str__(self):
           return f"{self.reviewer_name} - {self.book.title}"
   ```

2. **Apply migrations**:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

---

### **Step 3: Register Models in Admin Panel**
1. **Edit `library/admin.py`**:
   ```python
   from django.contrib import admin
   from .models import Book, Review

   admin.site.register(Book)
   admin.site.register(Review)
   ```

2. **Run the server** and verify models in the admin panel:
   ```bash
   python manage.py runserver
   ```

---

### **Step 4: Create Forms**
1. **Create forms for `Book` and `Review` in `library/forms.py`**:
   ```python
   from django import forms
   from .models import Book, Review

   class BookForm(forms.ModelForm):
       class Meta:
           model = Book
           fields = '__all__'

   class ReviewForm(forms.ModelForm):
       class Meta:
           model = Review
           fields = '__all__'
   ```

---

### **Step 5: Create Views**
1. **Edit `library/views.py` to add CRUD views**:
   ```python
   from django.shortcuts import render, get_object_or_404, redirect
   from .models import Book, Review
   from .forms import BookForm, ReviewForm

   def book_list(request):
       books = Book.objects.prefetch_related("reviews").all()
       return render(request, "library/book_list.html", {"books": books})

   def add_book(request):
       if request.method == "POST":
           book_form = BookForm(request.POST)
           review_form = ReviewForm(request.POST)
           if book_form.is_valid() and review_form.is_valid():
               book = book_form.save()
               review = review_form.save(commit=False)
               review.book = book
               review.save()
               return redirect("book_list")
       else:
           book_form = BookForm()
           review_form = ReviewForm()
       return render(request, "library/add_book.html", {"book_form": book_form, "review_form": review_form})

   def edit_book(request, book_id):
       book = get_object_or_404(Book, id=book_id)
       if request.method == "POST":
           book_form = BookForm(request.POST, instance=book)
           if book_form.is_valid():
               book_form.save()
               return redirect("book_list")
       else:
           book_form = BookForm(instance=book)
       return render(request, "library/edit_book.html", {"book_form": book_form, "book": book})

   def delete_book(request, book_id):
       book = get_object_or_404(Book, id=book_id)
       book.delete()
       return redirect("book_list")
   ```

---

### **Step 6: Configure URLs**
1. **Edit `library/urls.py`**:
   ```python
   from django.urls import path
   from . import views

   urlpatterns = [
       path("", views.book_list, name="book_list"),
       path("add/", views.add_book, name="add_book"),
       path("edit/<int:book_id>/", views.edit_book, name="edit_book"),
       path("delete/<int:book_id>/", views.delete_book, name="delete_book"),
   ]
   ```

2. **Include the app’s URLs in `library_manager/urls.py`**:
   ```python
   from django.contrib import admin
   from django.urls import path, include

   urlpatterns = [
       path("admin/", admin.site.urls),
       path("", include("library.urls")),
   ]
   ```

---

### **Step 7: Create Templates**
1. **Add a folder `library/templates/library` and create these templates**:

   **`book_list.html`**:
   ```html
   <h1>Library</h1>
   <a href="{% url 'add_book' %}">Add New Book</a>
   <ul>
       {% for book in books %}
           <li>
               <strong>{{ book.title }}</strong> by {{ book.author }}
               <a href="{% url 'edit_book' book.id %}">Edit</a>
               <a href="{% url 'delete_book' book.id %}">Delete</a>
               <ul>
                   {% for review in book.reviews.all %}
                       <li>{{ review.reviewer_name }} ({{ review.rating }}/5): {{ review.review_text }}</li>
                   {% endfor %}
               </ul>
           </li>
       {% endfor %}
   </ul>
   ```

   **`add_book.html`**:
   ```html
   <h1>Add Book</h1>
   <form method="post">
       {% csrf_token %}
       {{ book_form.as_p }}
       {{ review_form.as_p }}
       <button type="submit">Save</button>
   </form>
   ```

   **`edit_book.html`**:
   ```html
   <h1>Edit Book</h1>
   <form method="post">
       {% csrf_token %}
       {{ book_form.as_p }}
       <button type="submit">Update</button>
   </form>
   ```

---

### **Step 8: Add Genre and Rating Filter (Optional)**
1. Update `book_list` view to filter books:
   ```python
   def book_list(request):
       genre = request.GET.get("genre")
       rating = request.GET.get("rating")
       books = Book.objects.prefetch_related("reviews").all()
       if genre:
           books = books.filter(genre__icontains=genre)
       if rating:
           books = books.filter(reviews__rating=rating)
       return render(request, "library/book_list.html", {"books": books})
   ```

2. Update `book_list.html` to include filters:
   ```html
   <form method="get">
       <input type="text" name="genre" placeholder="Filter by Genre">
       <input type="number" name="rating" placeholder="Filter by Rating" min="1" max="5">
       <button type="submit">Filter</button>
   </form>
   ```

---

### **Step 9: Test the Application**
Run the development server and test the app:
```bash
python manage.py runserver
```

You should now have a fully functional CRUD application for managing books and their reviews. Let me know if you want additional features or enhancements!