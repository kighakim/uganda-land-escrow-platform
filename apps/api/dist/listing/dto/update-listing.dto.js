"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateListingDto = void 0;
const create_listing_dto_1 = require("./create-listing.dto");
function PartialType(Base) {
    return class extends Base {
    };
}
class UpdateListingDto extends PartialType(create_listing_dto_1.CreateListingDto) {
}
exports.UpdateListingDto = UpdateListingDto;
//# sourceMappingURL=update-listing.dto.js.map