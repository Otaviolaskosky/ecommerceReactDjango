from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Product
from .products import products
from .serailizers import ProductSerializer

# Create your views here.

@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/products/',
        '/api/products/create/',

        '/api/products/upload/',

        '/api/products/<id>/reviews/',

        '/api/products/top/',
        '/api/products/<id>/',

        '/api/products/delete/<id>/',
        '/api/products/<update>/<id>/',
        
    ]
    return Response(routes)

@api_view(['GET'])
def getProducts(request):
    products = Product.objects.all()
    serailizer = ProductSerializer(products, many=True)
    return Response(serailizer.data)

@api_view(['GET'])
def getProduct(request, pk):
    # product = None
    # for i in products:
    #     if i['_id'] == pk:
    #         product = i
    #         break
    product = Product.objects.get(_id=pk)
    serailizer = ProductSerializer(product, many=False)
    return Response(serailizer.data)

    # return Response(product)




@require_http_methods(["OPTIONS", "GET"])
def your_view(request):
    # Your view logic here
    response_data = {'message': 'Success'}
    
    # If it's a preflight OPTIONS request, return an empty response
    if request.method == 'OPTIONS':
        return JsonResponse({}, status=200)

    return JsonResponse(response_data)
