import { UseGuards } from '@nestjs/common';
import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { CustomersService } from '../../../services/customers.service';
import { PurchasesService } from '../../../services/purchases.service';
import { AuthorizationGuard } from '../../auth/authorization.guard';
import { AuthUser, CurrentUser } from '../../auth/currentUser';
import { Customer } from '../models/Customer';

@Resolver(() => Customer)
export class CustomersResolver {
  constructor(
    private customersService: CustomersService,
    private purchasesService: PurchasesService,
  ) {}

  @Query(() => Customer)
  @UseGuards(AuthorizationGuard)
  me(@CurrentUser() user: AuthUser) {
    return this.customersService.findCustomerByAuthUserId(user.sub);
  }

  @ResolveField()
  purchases(@Parent() customer: Customer) {
    return this.purchasesService.findAllPurchasesByCustomerId(customer.id);
  }
}
