import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import {
  CreateProductInput,
  GetProductInput,
  Product,
} from "../schema/product.schema";
import ProductService from "../service/product.service";
import Context from "../types/context";

@Resolver((_of) => Product)
export default class ProductResolver {
  constructor(private productService: ProductService) {
    this.productService = new ProductService();
  }

  @Authorized()
  @Mutation((_returns) => Product)
  createProduct(
    @Arg("input") input: CreateProductInput,
    @Ctx() context: Context
  ) {
    const user = context.user!;
    return this.productService.createProduct({ ...input, user: user?._id });
  }

  @Query((_returns) => [Product])
  products() {
    return this.productService.findProducts();
  }

  @Query((_returns) => Product)
  product(@Arg("input") input: GetProductInput) {
    return this.productService.findSingleProduct(input);
  }
}
