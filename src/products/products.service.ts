import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "./products.modle";
@Injectable()
export class ProductsService {
    private products: Product[]= [];

    insertProduct(title: string, desc: string, price: number){
        const prodId=Math.random().toString();
        const newProduct= new Product(new Date().toString(), title, desc, price)
        this.products.push(newProduct);
        return prodId;
    }

    getProducts() {
        return [...this.products];
    }    

    getSingleProduct(productId: string){
       const product= this.findProduct(productId)[0];
        return { ...product }; 
    }

    updateProduct(productId:string, title: string, desc: string, price: number) {
         const [product,index]= this.findProduct(productId);
         this.products[index]={...product,}
    }
    private findProduct(id: string): [Product, number] {
        const productIndex= this.products.findIndex((prod)=>prod.id=id);
        const product= this.products[productIndex];
        if(!product){
            throw new NotFoundException;
        }
        return [product, productIndex];
    }
}