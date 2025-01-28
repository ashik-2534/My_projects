from django.shortcuts import render, get_object_or_404, redirect
from .models import Book, Review
from .forms import BookForm, ReviewForm
def book_list(request):
    genre = request.GET.get("genre")
    rating = request.GET.get("rating")
    books = Book.objects.prefetch_related("reviews").all()
    if genre:
        books = books.filter(genre__icontains=genre)
    if rating:
        books = books.filter(reviews__rating=rating)
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