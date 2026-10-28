import { CreateListingDto } from './create-listing.dto';

function PartialType<TBase extends new (...args: any[]) => object>(
	Base: TBase,
): new () => Partial<InstanceType<TBase>> {
	return class extends Base {} as new () => Partial<InstanceType<TBase>>;
}

export class UpdateListingDto extends PartialType(CreateListingDto) {}